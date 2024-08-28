<template>
  <nav :class="['unnnic-sidebar', `unnnic-sidebar--${position}`]">
    <slot
      class="unnnic-sidebar-top"
      name="top"
    />
    <ul class="unnnic-sidebar-items">
      <li
        v-for="(item, itemIndex) of items"
        :key="item"
      >
        <SidebarItem
          :item="item"
          :active="{
            item: active.itemIndex === itemIndex,
            childIndex: active.childIndex,
          }"
          @navigate="handleNavigate($event)"
          :autoNavigateSingleChild="autoNavigateSingleChild"
        />
      </li>
    </ul>
    <slot
      class="unnnic-sidebar-bottom"
      name="bottom"
    />
  </nav>
</template>

<script>
export default {
  name: 'UnnnicSidebar',
};
</script>

<script setup>
import { validateItems } from './propsValidator';
import SidebarItem from './SidebarItem.vue';

const props = defineProps({
  position: {
    type: String,
    default: 'left',
    validator(value) {
      return ['left', 'right'].includes(value);
    },
  },
  width: {
    type: String,
    default: '200px',
    validator(value) {
      const pxPattern = /^\d+(\.\d+)?px$/; // numbers + px
      const percentPattern = /^\d+(\.\d+)?%$/; // numbers + %
      return pxPattern.test(value) || percentPattern.test(value);
    },
  },
  items: {
    type: Array,
    required: true,
    validator: validateItems,
  },
  active: {
    type: Object,
    default: () => ({ itemIndex: null, childIndex: null }),
  },
  autoNavigateSingleChild: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['navigate']);

const handleNavigate = ({ item, child }) => {
  emit('navigate', { item, child });
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
.unnnic-sidebar {
  position: fixed;

  width: v-bind('props.width');
 
  height: 100%;

  &--left {
    border-top-left-radius: $unnnic-border-radius-md;
  }
  &--right {
    right: 0;
    border-top-right-radius: $unnnic-border-radius-md;
  }

  &-items {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: $unnnic-spacing-xs;
    overflow-y: auto;
    height: 100%;

    &::-webkit-scrollbar {
        width: $unnnic-spacing-inline-nano;
      }

      &::-webkit-scrollbar-thumb {
        background: $unnnic-color-neutral-cleanest;
        border-radius: $unnnic-border-radius-pill;
      }

      &::-webkit-scrollbar-track {
        background: $unnnic-color-neutral-soft;
        border-radius: $unnnic-border-radius-pill;
      }
  }
}
</style>
