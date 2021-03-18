<template>
<div :class="{ 'unnnic-tooltip': enabled }">
  <slot />
  <span
    v-if="enabled"
    :class="[
            'unnnic-tooltip-label',
            `unnnic-tooltip-label-${side}`,
            ]">
            {{text}}
    </span>
</div>
</template>

<script>

export default {
  name: 'unnnic-tooltip',
  props: {
    text: {
      type: String,
      default: null,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    side: {
      type: String,
      default: 'right',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
 @import '../../assets/scss/unnnic.scss';

.unnnic-tooltip {
  position: relative;
  display: inline-block;
  overflow-wrap: break-word;
}

.unnnic-tooltip-label{
  z-index: 1;
  visibility: hidden;
  text-align: center;
  position: absolute;

  background-color: $unnnic-color-neutral-black;
  color: $unnnic-color-neutral-snow;
  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-inset-nano;
  box-shadow: $unnnic-shadow-level-near;
  font-size: $unnnic-font-size-body-md;
  font-family: $unnnic-font-family-secondary;
  font-weight: $unnnic-font-weight-regular;
  line-height: ($unnnic-font-size-body-md + $unnnic-line-height-medium);

  max-width: 15.625rem;
  word-wrap: break-word;

  &::after {
    content: "";
    position: absolute;
    border-width: 5px;
    border-style: solid;
  }

    &-top{
      top: auto;
      right: auto;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);

      &::after {
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-color: $unnnic-color-neutral-black transparent transparent transparent;
      }
    }

    &-bottom{
      top: calc(100% + 8px);
      right: auto;
      bottom: auto;
      left: 50%;
      transform: translateX(-50%);

      &::after {
          bottom: 100%;
          left: 50%;
          margin-left: -5px;
          border-color: transparent transparent $unnnic-color-neutral-black transparent;
      }
    }
    &-right{
      top: 50%;
      right: auto;
      bottom: auto;
      left: calc(100% + 8px);
      transform: translateY(-50%);

      &::after {
        top: 50%;
        right: 100%;
        margin-top: -5px;
        border-color: transparent $unnnic-color-neutral-black transparent transparent;
      }
    }
    &-left{
      top: 50%;
      right: calc(100% + 8px);
      bottom: auto;
      left: auto;
      transform: translateY(-50%);

      &::after {
        top: 50%;
        left: 100%;
        margin-top: -5px;
        border-color: transparent transparent transparent $unnnic-color-neutral-black;
      }
    }
}

.unnnic-tooltip:hover {
  .unnnic-tooltip-label{
      visibility: visible;
    }
}

</style>
