import { describe, it, expect, beforeEach } from 'vitest';
import { ref } from 'vue';
import {
  getTeleportContainer,
  getTeleportTarget,
  setTeleportTarget,
  useTeleportTarget,
} from '@/lib/teleport-target';

describe('teleport-target helpers', () => {
  beforeEach(() => {
    setTeleportTarget(null);
    document.body.innerHTML = '';
  });

  it('stores and returns the raw teleport target', () => {
    expect(getTeleportTarget()).toBeUndefined();

    setTeleportTarget('#micro');
    expect(getTeleportTarget()).toBe('#micro');

    const element = document.createElement('section');
    setTeleportTarget(element);
    expect(getTeleportTarget()).toBe(element);
  });

  it('keeps the composable value in sync with global updates', () => {
    const targetRef = useTeleportTarget();
    expect(targetRef.value).toBeUndefined();

    setTeleportTarget('#first');
    expect(targetRef.value).toBe('#first');

    setTeleportTarget('#second');
    expect(targetRef.value).toBe('#second');
  });

  it('prefers local overrides over the shared teleport target', () => {
    setTeleportTarget('#global');

    const override = ref('#local-1');
    const targetRef = useTeleportTarget(override);
    expect(targetRef.value).toBe('#local-1');

    override.value = '#local-2';
    expect(targetRef.value).toBe('#local-2');
  });

  it('resolves DOM elements for selector targets', () => {
    const host = document.createElement('div');
    host.id = 'micro-root';
    document.body.appendChild(host);

    setTeleportTarget('#micro-root');
    expect(getTeleportContainer()).toBe(host);
  });

  it('falls back to document.body when selector is missing or unset', () => {
    setTeleportTarget('#missing');
    expect(getTeleportContainer()).toBe(document.body);

    setTeleportTarget(null);
    expect(getTeleportContainer()).toBe(document.body);
  });

  it('returns the element itself when the target is an HTMLElement', () => {
    const host = document.createElement('section');
    document.body.appendChild(host);

    setTeleportTarget(host);
    expect(getTeleportContainer()).toBe(host);
  });
});
