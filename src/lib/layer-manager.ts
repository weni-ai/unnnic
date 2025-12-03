import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

export const layerScale = {
  hide: -1,
  base: 0,
  drawer: 1000,
  modal: 1100,
  popover: 1200,
  tooltip: 1300,
  toast: 1400,
} as const;

export type LayerToken = keyof typeof layerScale;

const DEFAULT_STEP = 5;

const counters: Record<LayerToken, number> = {
  hide: 0,
  base: 0,
  drawer: 0,
  modal: 0,
  popover: 0,
  tooltip: 0,
  toast: 0,
};

interface Allocation {
  id: symbol;
  type: LayerToken;
  value: number;
}

const allocations = new Map<symbol, Allocation>();

function acquire(type: LayerToken): Allocation {
  const id = Symbol('layer');
  counters[type] = (counters[type] ?? 0) + 1;
  const value = layerScale[type] + counters[type] * DEFAULT_STEP;
  const allocation: Allocation = { id, type, value };
  allocations.set(id, allocation);
  return allocation;
}

function release(id: symbol) {
  const allocation = allocations.get(id);
  if (!allocation) {
    return;
  }

  allocations.delete(id);
  const current = Math.max((counters[allocation.type] ?? 1) - 1, 0);
  counters[allocation.type] = current;
}

export interface LayerZIndexOptions {
  offset?: number;
}

export function useLayerZIndex(
  type: LayerToken = 'base',
  options?: LayerZIndexOptions,
): Ref<number> {
  const initialValue = layerScale[type] + (options?.offset ?? 0);
  const zIndex = ref(initialValue);

  let allocationId: symbol | null = null;

  const allocate = () => {
    const allocation = acquire(type);
    allocationId = allocation.id;
    zIndex.value = allocation.value + (options?.offset ?? 0);
  };

  onMounted(allocate);

  onBeforeUnmount(() => {
    if (allocationId) {
      release(allocationId);
      allocationId = null;
    }
  });

  return zIndex;
}
