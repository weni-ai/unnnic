<template>
  <div>
    <tool-tip :enabled="enableTooltip" :text="text" side="right">
      <div
        :class="{ 'unnnic-side-bar-item': true,
                  'unnnic-side-bar-item--active': active,
                  'unnnic--clickable': true,
                }"
        @click="onClick">
        <u-icon
          :class="{'unnnic-side-bar-item__icon': true,
                  'unnnic-side-bar-item__icon--active': active,
                  }"
          size="ant"
          :icon="icon"/>
        <span class="unnnic-side-bar-item__label"> {{ text }}
          <slot />
          </span>
      </div>
    </tool-tip>

    <div class="spacer"></div>
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

        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;

        background-color: $unnnic-color-background-sky;
        font-weight: $unnnic-font-weight-regular;
        color: $unnnic-color-neutral-dark;

        padding: $unnnic-inset-nano;
        border-radius: $unnnic-border-radius-sm;

        &--active {
          color: $unnnic-color-neutral-darkest;
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
