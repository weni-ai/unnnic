<template>
  <section :class="['unnnic-sidebar', `unnnic-sidebar--${props.position}`]">
    <slot name="top" />
    <ul class="unnnic-sidebar__items">
      <li
        v-for="item of items"
        :key="item"
      >
        <p>{{ item.label }}</p>
        <Icon :icon="item.icon" />
      </li>
    </ul>

    <!-- TODO Lista de items -->
    <slot name="footer" />
  </section>
</template>

<script>
export default {
  name: 'UnnnicSidebarNext',
};
</script>

<script setup>
import Icon from '../Icon.vue';
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
    default: () => [
      { label: 'Item 1', icon: 'abc', children: [] },
      { label: 'Item 2', icon: 'add' },
    ],
  },
});
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
  background-color: red;
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

  &__items {
    display: flex;
    flex-direction: column;
    list-style: none;
  }
}
</style>
