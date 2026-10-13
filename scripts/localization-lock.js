const fs = require('node:fs')
const path = require('node:path')
const { execSync } = require('node:child_process')
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
// differs from MERGE_HEAD were changed on both sides (or edited during the merge), so
// they are still checked.
let mergeInProgress = false
try {
  execSync('git rev-parse -q --verify MERGE_HEAD', { stdio: 'ignore' })
  mergeInProgress = true
} catch (_) {
  // Not a merge commit.
}

if (mergeInProgress) {
  const differsFromMergeHead = new Set(gitLines('git diff --name-only --cached MERGE_HEAD'))
  stagedFiles = stagedFiles.filter(file => differsFromMergeHead.has(file))
}

// §3 — Check paths
let blocked
try {
  blocked = checkPaths(stagedFiles, crowdinYmlPath)
} catch (err) {
  process.stdout.write(`localization-lock: unexpected error — ${err.message}\n`)
  process.exit(1)
}

if (blocked.length > 0) {
  let msg = 'localization-lock: commit blocked.\n\n'
  if (mergeInProgress) {
    msg +=
      'The following translation files differ from both sides of this merge, so the\n' +
      'staged content is not what the Localization team delivered:\n\n'
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
