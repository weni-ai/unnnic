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

const activeValues: Record<LayerToken, number[]> = {
  hide: [],
  base: [],
  drawer: [],
  modal: [],
  popover: [],
  tooltip: [],
  toast: [],
};

interface Allocation {
  id: symbol;
  type: LayerToken;
  value: number;
}

const allocations = new Map<symbol, Allocation>();

function acquire(type: LayerToken): Allocation {
  const id = Symbol('layer');
  const list = activeValues[type];
  const lastValue = list.length ? list[list.length - 1] : layerScale[type];
  const value = lastValue + DEFAULT_STEP;
  const allocation: Allocation = { id, type, value };

  list.push(value);
  allocations.set(id, allocation);

  return allocation;
}

function release(id: symbol) {
  const allocation = allocations.get(id);
  if (!allocation) {
    return;
  }

  allocations.delete(id);
  const list = activeValues[allocation.type];
  const index = list.indexOf(allocation.value);

  if (index !== -1) {
    list.splice(index, 1);
  }
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
