<template>
  <div v-show="true" class="unnnic-table">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div>
      <div class="item-spacer"></div>
    </div>

    <div class="scroll">
      <template v-for="(item, index) in items">
        <div class="item" :key="index">
          <slot name="item" :item="item"></slot>
        </div>

        <div
          v-show="index + 1 !== items.length"
          class="item-spacer"
          :key="`item-spacer-${index}`"
        ></div>
      </template>

      <div v-show="loading" class="footer">
        <div class="item-spacer"></div>

        <div class="item loading">
          {{ loadingText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unnnicTable',

  components: {},

  props: {
    items: {
      type: Array,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    loadingText: {
      type: String,
      default: 'Carregando...',
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
@import "../../assets/scss/unnnic.scss";

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
    background: $unnnic-color-neutral-clean;
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

  .header,
  .item {
    padding: $unnnic-squish-xs;
    border-radius: $unnnic-border-radius-sm;

    ::v-deep .divider {
      width: $unnnic-border-width-thinner;
      margin: 0 $unnnic-inline-sm;
      align-self: stretch;
    }
  }

  .header {
    background-color: $unnnic-color-background-carpet;

    ::v-deep .divider {
      background-color: $unnnic-color-neutral-soft;
    }
  }

  .item {
    background-color: $unnnic-color-background-snow;

    &.loading {
      font-family: $unnnic-font-family-secondary;
      color: $unnnic-color-neutral-cleanest;
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
