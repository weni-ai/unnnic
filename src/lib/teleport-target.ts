import { computed, shallowRef, toValue, type MaybeRefOrGetter } from 'vue';

export type TeleportTarget = string | HTMLElement;

const teleportTargetRef = shallowRef<TeleportTarget | null>(null);

export function setTeleportTarget(target?: TeleportTarget | null) {
  teleportTargetRef.value = target ?? null;
}

export function getTeleportTarget() {
  return teleportTargetRef.value ?? undefined;
}

export function useTeleportTarget(
  override?: MaybeRefOrGetter<TeleportTarget | null | undefined>,
) {
  // Composable version, ideal for `<Teleport :to="...">` bindings because the
  // returned ref stays reactive to both global and local overrides.
  return computed(() => {
    const localTarget = override ? toValue(override) : undefined;
    return localTarget ?? teleportTargetRef.value ?? undefined;
  });
}

function resolveTargetElement(target?: TeleportTarget | null) {
  if (typeof document === 'undefined') {
    return null;
  }

  if (!target) {
    return document.body;
  }

  if (typeof target === 'string') {
    return document.querySelector(target) ?? document.body;
  }

  return target;
}

export function getTeleportContainer() {
  // Immediate DOM resolver for imperative consumers (e.g., Toast manager)
  // that simply need the concrete HTMLElement to append to right away.
  return resolveTargetElement(teleportTargetRef.value);
}
