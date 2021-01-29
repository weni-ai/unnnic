<template>
<div class="unnic-tooltip">
  <slot />
  <span :class="[
            'unnic-tooltip-label',
            `unnic-tooltip-label-${side}`,
            ]">{{text}}</span>
</div>
</template>

<script>

export default {
  name: 'unnic-tooltip',
  props: {
    text: {
      type: String,
      default: null,
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
 @import '../../assets/scss/unnic.scss';

.unnic-tooltip {
  position: relative;
  display: inline-block;
  overflow-wrap: break-word;
}

.unnic-tooltip-label{
  z-index: 1;
  white-space: nowrap;
  visibility: hidden;
  text-align: center;
  position: absolute;

  background-color: $unnic-color-neutral-black;
  color: $unnic-color-neutral-snow;
  border-radius: $unnic-border-radius-sm;
  padding: $unnic-inset-nano;
  box-shadow: $unnic-shadow-level-near;
  font-size: $unnic-font-size-body-md;
  font-family: $unnic-font-family-secondary;
  font-weight: $unnic-font-weight-regular;
  line-height: ($unnic-font-size-body-md + $unnic-line-height-medium);

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
        border-color: $unnic-color-neutral-black transparent transparent transparent;
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
          border-color: transparent transparent $unnic-color-neutral-black transparent;
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
        border-color: transparent $unnic-color-neutral-black transparent transparent;
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
        border-color: transparent transparent transparent $unnic-color-neutral-black;
      }
    }
}

.unnic-tooltip:hover {
  .unnic-tooltip-label{
      visibility: visible;
    }
}

</style>
