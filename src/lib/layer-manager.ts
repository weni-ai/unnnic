import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

const BASE_LAYER_Z_INDEX = 1000;
const DEFAULT_STEP = 5;

const activeValues: number[] = [];
const allocations = new Map<symbol, number>();

interface Allocation {
  id: symbol;
  value: number;
}

function acquire(): Allocation {
  const id = Symbol('layer');
  const lastValue = activeValues.length
    ? activeValues[activeValues.length - 1]
    : BASE_LAYER_Z_INDEX;
  const value = lastValue + DEFAULT_STEP;
  activeValues.push(value);
  allocations.set(id, value);
  return { id, value };
}

function release(id: symbol) {
  const value = allocations.get(id);
  if (value === undefined) {
    return;
  }

  allocations.delete(id);
  const index = activeValues.indexOf(value);
  if (index !== -1) {
    activeValues.splice(index, 1);
  }
}

export interface LayerZIndexOptions {
  offset?: number;
}

export function useLayerZIndex(options?: LayerZIndexOptions): Ref<number> {
  const offset = options?.offset ?? 0;
  const zIndex = ref(BASE_LAYER_Z_INDEX + offset);

  let allocationId: symbol | null = null;

  const allocate = () => {
    const allocation = acquire();
    allocationId = allocation.id;
    zIndex.value = allocation.value + offset;
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
