import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

const BASE_LAYER_Z_INDEX = 1000;
const DEFAULT_STEP = 5;

const layerStack: number[] = [];
const layerHandles = new Map<symbol, number>();

interface LayerHandle {
  id: symbol;
  value: number;
}

function pushLayer(): LayerHandle {
  const id = Symbol('layer');
  const lastValue = layerStack.length
    ? layerStack[layerStack.length - 1]
    : BASE_LAYER_Z_INDEX;
  const value = lastValue + DEFAULT_STEP;
  layerStack.push(value);
  layerHandles.set(id, value);
  return { id, value };
}

function popLayer(id: symbol) {
  const value = layerHandles.get(id);
  if (value === undefined) {
    return;
  }

  layerHandles.delete(id);
  const index = layerStack.indexOf(value);
  if (index !== -1) {
    layerStack.splice(index, 1);
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
    const handle = pushLayer();
    allocationId = handle.id;
    zIndex.value = handle.value + offset;
  };

  onMounted(allocate);

  onBeforeUnmount(() => {
    if (allocationId) {
      popLayer(allocationId);
      allocationId = null;
    }
  });

  return zIndex;
}
