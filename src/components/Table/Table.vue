<template>
  <div
    v-show="true"
    class="unnnic-table"
  >
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div>
      <div class="item-spacer"></div>
    </div>

    <div class="scroll">
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="item">
          <slot
            name="item"
            :item="item"
          ></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnnnicTable',

  components: {},

  props: {
    items: {
      type: Array,
    },
  },

  data() {
    return {
      value: false,
    };
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

$scroll-size: 4px;

.scroll {
  padding-right: calc(#{$unnnic-inline-nano} + #{$scroll-size});
  width: 100%;
  flex: 1;
  overflow: overlay;

  &::-webkit-scrollbar {
    width: $scroll-size;
  }

  &::-webkit-scrollbar-thumb {
    background: $unnnic-color-neutral-cleanest;
    border-radius: $unnnic-border-radius-pill;
  }

  &::-webkit-scrollbar-track {
    background: $unnnic-color-neutral-soft;
    border-radius: $unnnic-border-radius-pill;
    // background-color: blue;
  }
}

.unnnic-table {
  display: flex;
  flex-direction: column;
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-sm;

  .header,
  .item {
    padding: $unnnic-squish-xs;
    border-radius: $unnnic-border-radius-sm;
  }

  .header {
    background-color: $unnnic-color-background-carpet;

    :deep(.col) {
      font-family: $unnnic-font-family-secondary;
      color: $unnnic-color-neutral-cloudy;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    }
  }

  .item {
    background-color: $unnnic-color-background-snow;

    &:hover {
      background-color: $unnnic-color-background-carpet;
    }

    &.loading {
      font-family: $unnnic-font-family-secondary;
      color: $unnnic-color-neutral-clean;
      font-size: $unnnic-font-size-body-gt;
      font-weight: $unnnic-font-weight-regular;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      text-align: center;
    }
  }

  .item-spacer {
    height: $unnnic-spacing-stack-nano;
  }
}
</style>
