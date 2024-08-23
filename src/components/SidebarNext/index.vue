<template>
  <nav :class="['unnnic-sidebar', `unnnic-sidebar--${props.position}`]">
    <slot
      class="unnnic-sidebar-top"
      name="top"
    />
    <ul class="unnnic-sidebar-items">
      <li
        v-for="(item, index) of items"
        :key="item"
      >
        <SidebarItem
          :item="item"
          :active="{
            item: props.active.itemIndex === index,
            childIndex: props.active.childIndex,
          }"
          @navigate="handleClick($event)"
        />
      </li>
    </ul>
    <slot
      class="unnnic-sidebar-footer"
      name="footer"
    />
  </nav>
</template>

<script>
export default {
  name: 'UnnnicSidebarNext',
};
</script>

<script setup>
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
  },
  active: {
    type: Object,
    default: () => ({ itemIndex: null, childIndex: null }),
  },
});

const emit = defineEmits(['navigate']);

const handleClick = ({ item, child }) => {
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
  background-color: $unnnic-color-neutral-soft;
  width: v-bind('props.width');
  height: 100vh;
  padding: $unnnic-spacing-sm;

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
  }
}
</style>
