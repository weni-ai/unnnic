<template>
  <div
    :class="{ 'unnnic-side-bar-item': true,
              'unnnic-side-bar-item--active': active,
              'unnnic--clickable': true,
            }"
    @click="onClick">
    <tool-tip :enabled="enableTooltip" :text="text" side="right">
    <u-icon
      :class="{'unnnic-side-bar-item__icon': true,
               'unnnic-side-bar-item__icon--active': active,
              }"
      size="sm"
      :icon="icon"/>
    <span class="unnnic-side-bar-item__label"> {{ text }}
      <slot v-show="expanded"/>
      </span>
    </tool-tip>
  </div>
</template>

<script>
import UIcon from '../Icon.vue';
import ToolTip from '../ToolTip/ToolTip.vue';

export default {
  name: 'SidebarItem',
  components: { UIcon, ToolTip },
  data() {
    return {
      ToolTip,
    };
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    enableTooltip: {
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" >
@import '../../assets/scss/unnnic.scss';

    .unnnic-side-bar-item {
        display: flex;
        align-items: center;
        color: $unnnic-color-neutral-darkest;
        margin-bottom: $unnnic-spacing-stack-xs;
        padding: $unnnic-inset-nano;
        font-size: $unnnic-font-size-body-md;
        font-family: $unnnic-font-family-secondary;
        border-radius: $unnnic-border-radius-sm;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;

        &--active {
            background-color: rgba($unnnic-color-brand-weni, $unnnic-opacity-level-light);
            font-weight: $unnnic-font-weight-bold;
        }

        &__icon {
           margin-right: $unnnic-inline-xs;
           color: $unnnic-color-neutral-cloudy;

           &--active {
               color: $unnnic-color-brand-weni;
           }
        }
    }
</style>
