const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execSync, spawnSync } = require('node:child_process')
const { checkPaths } = require(path.join(__dirname, 'localization-lock-core'))

const GOLDEN_PATH_URL =
  'https://darkkitchen.vtex.com/docs/default/domain/engineering/engineering-golden-path/localization-lock'

const MSG_MISSING_CROWDIN = `localization-lock: crowdin.yml not found at repo root.

This file is required for localization-lock to identify translation files.
The hook cannot operate without it — this commit is blocked.

To resolve:
  1. Add crowdin.yml to the repo root (see the Crowdin configuration guide).
  2. Re-run the localization-lock adoption procedure for this repo.

Setup guide: ${GOLDEN_PATH_URL}
`

// §1 — Resolve crowdin.yml
const crowdinYmlPath = path.join(process.cwd(), 'crowdin.yml')
if (!fs.existsSync(crowdinYmlPath)) {
  process.stdout.write(MSG_MISSING_CROWDIN)
  process.exit(1)
}

// §2 — Get staged files
function gitLines(command) {
  const raw = execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  return raw.split('\n').filter(line => line.length > 0)
}

let stagedFiles = gitLines('git diff --name-only --cached')

// §2b — Merge commits: ignore translation files that arrive from the other branch.
//
// When a developer merges the default branch into a feature branch (or pulls with
// merge) and has to resolve a conflict, the merge is concluded with `git commit`, which
// runs this hook. At that point `git diff --cached` (against HEAD = the feature branch)
// lists every file the merged branch changed — including translation files delivered
// to the default branch by Crowdin or by the Localization Agent. Those are not the
// developer's edits and must not block the merge. Files whose staged content also
// differs from MERGE_HEAD were changed on both sides; for those, the staged content is
// compared with what git's own three-way merge produces (`git merge-file`): identical
// means nobody touched the file during this merge (e.g. a long-lived branch such as
// `staging` carrying translation commits that `main` does not have yet), so it passes.
// A file that git could not merge cleanly, or whose staged content differs from the
// automatic merge, was resolved or edited by hand and is still checked.
let mergeInProgress = false
try {
  execSync('git rev-parse -q --verify MERGE_HEAD', { stdio: 'ignore' })
  mergeInProgress = true
} catch (_) {
  // Not a merge commit.
}

function gitShow(spec) {
  return execSync(`git show ${spec}`, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    maxBuffer: 64 * 1024 * 1024,
  })
}

function isCleanAutoMerge(file, mergeBase) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'localization-lock-'))
  try {
    const ours = path.join(tmpDir, 'ours')
    const base = path.join(tmpDir, 'base')
    const theirs = path.join(tmpDir, 'theirs')
    fs.writeFileSync(ours, gitShow(`HEAD:${file}`))
    fs.writeFileSync(base, gitShow(`${mergeBase}:${file}`))
    fs.writeFileSync(theirs, gitShow(`MERGE_HEAD:${file}`))
    const result = spawnSync('git', ['merge-file', '-p', ours, base, theirs], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    })
    // Exit status is the number of conflicts (0 = clean), 255 on error.
    if (result.status !== 0) return false
    return result.stdout === gitShow(`:${file}`)
  } catch (_) {
    // Missing on one side (added/deleted) or unreadable: keep it under review.
    return false
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

if (mergeInProgress) {
  const differsFromMergeHead = new Set(gitLines('git diff --name-only --cached MERGE_HEAD'))
  stagedFiles = stagedFiles.filter(file => differsFromMergeHead.has(file))
}

// §3 — Check paths
let blocked
try {
  blocked = checkPaths(stagedFiles, crowdinYmlPath)
  if (mergeInProgress && blocked.length > 0) {
    let mergeBase = null
    try {
      mergeBase = gitLines('git merge-base HEAD MERGE_HEAD')[0] || null
    } catch (_) {
      // Unrelated histories: review every translation file changed on both sides.
    }
    if (mergeBase) {
      blocked = blocked.filter(entry => !isCleanAutoMerge(entry.path, mergeBase))
    }
  }
} catch (err) {
  process.stdout.write(`localization-lock: unexpected error — ${err.message}\n`)
  process.exit(1)
}

if (blocked.length > 0) {
  let msg = 'localization-lock: commit blocked.\n\n'
  if (mergeInProgress) {
    msg +=
      'The following translation files were changed by hand during this merge (their\n' +
      "staged content differs from both sides and from git's automatic merge):\n\n"
  } else {
    msg +=
      'The following staged files are translation files managed by the Localization team:\n\n'
  }
  for (const entry of blocked) {
    msg += `  ${entry.path}  (matched: ${entry.matchedGlob})\n`
  }
  msg +=
    '\nTranslation files are managed via Crowdin. Do not commit them directly.\n'
  if (mergeInProgress) {
    msg +=
      'To finish the merge, keep the incoming version of each file listed above:\n' +
      '  git checkout MERGE_HEAD -- <file>   (then `git add <file>` and commit again)\n'
  }
  msg += `\nSetup guide: ${GOLDEN_PATH_URL}\n`
  process.stdout.write(msg)
  process.exit(1)
}

process.exit(0)
