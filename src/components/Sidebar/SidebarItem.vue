<template>
  <section
    :class="{ 'unnnic-sidebar-item': true, active: active.item }"
    @click.stop="hasChildren ? handleShowChildrenList() : handleEmitNavigate()"
  >
    <Icon
      v-if="item.icon"
      class="unnnic-sidebar-item__icon"
      :icon="item.icon"
      size="ant"
      :scheme="active.item ? 'weni-600' : 'neutral-cloudy'"
    />
    <p
      :class="{ 'unnnic-sidebar-item__label': true, active: active.item }"
      :title="item.label"
    >
      {{ item.label }}
    </p>
    <Icon
      v-if="item.children?.length"
      class="unnnic-sidebar-item__arrow"
      :icon="showChildrenList ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
      size="ant"
      scheme="neutral-cloudy"
    />
  </section>
  <Transition name="slide-fade">
    <ul
      v-if="showChildrenList"
      class="unnnic-sidebar-item-children"
    >
      <li
        v-for="(child, childIndex) in item.children"
        :key="child"
        :class="{
          'unnnic-sidebar-item-child': true,
          active: isActive(childIndex),
        }"
        @click.stop="!isActive(childIndex) && emit('navigate', { item, child })"
      >
        <Icon
          v-if="child.icon"
          class="unnnic-sidebar-item-child__icon"
          :icon="child.icon"
          size="ant"
          :scheme="isActive(childIndex) ? 'weni-600' : 'neutral-cloudy'"
        />
        <p
          :class="{
            'unnnic-sidebar-item-child__label': true,
            active: isActive(childIndex),
          }"
          :title="child.label"
        >
          {{ child.label }}
        </p>
      </li>
    </ul>
  </Transition>
</template>

<script>
export default {
  name: 'UnnnicSidebarItem',
};
</script>

<script setup>
import { computed, onMounted, ref } from 'vue';
import Icon from '../Icon.vue';
import { validateItem } from './propsValidator';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator: validateItem,
  },
  active: {
    type: Object,
    default: () => ({ item: false, childIndex: null }),
  },
  autoNavigateFirstChild: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  const { childIndex, item } = props.active;
  if (typeof childIndex === 'number' && childIndex >= 0 && item) {
    handleShowChildrenList();
  }
});

const hasChildren = computed(() => {
  return props.item.children?.length;
});

const showChildrenList = ref(false);

const handleShowChildrenList = () => {
  showChildrenList.value = !showChildrenList.value;

  const isOpening = showChildrenList.value;
  if (isOpening && props.autoNavigateFirstChild) {
    emit('navigate', { item: props.item, child: props.item.children[0] });
  }
};

const isActive = (paramChildIndex = null) => {
  const { item, childIndex } = props.active;
  if (!(typeof childIndex === 'number')) {
    return item;
  }

  return item && childIndex === paramChildIndex;
};

const handleEmitNavigate = () => {
  if (!props.active.item) {
    emit('navigate', { item: props.item, child: null });
  }
};

const emit = defineEmits(['navigate']);
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-$unnnic-font-size);
}

*:is(.active) {
  > :is(.unnnic-sidebar-item__label, .unnnic-sidebar-item-child__label) {
    color: $unnnic-color-neutral-dark;
    font-weight: $unnnic-font-weight-bold;
  }
  border-radius: $unnnic-border-radius-sm;
  background-color: $unnnic-color-neutral-light;
  color: $unnnic-color-neutral-dark;
  font-weight: $unnnic-font-weight-bold;
}

.unnnic-sidebar-item {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: $unnnic-spacing-xs;
  padding: $unnnic-spacing-xs;
  cursor: pointer;

  &__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-line-height-large * 1.375;

    color: $unnnic-color-neutral-cloudy;
  }

  &__arrow {
    display: flex;
    margin-left: auto;
  }

  &-children {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-left: $unnnic-spacing-ant;
    margin-top: $unnnic-spacing-nano;
    gap: $unnnic-spacing-xs;
  }

  &-child {
    padding: $unnnic-spacing-nano $unnnic-spacing-xs;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: $unnnic-spacing-xs;

    &__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
      font-weight: $unnnic-font-weight-regular;
      line-height: $unnnic-line-height-large * 1.375;

      color: $unnnic-color-neutral-cloudy;
    }
  }
}
</style>
