<template>
  <div :class="{
    'unnnic-form': true,
    'unnnic-form--error': type === 'error',
    'has-icon': iconLeft || iconRight,
    }">
      <base-input
        v-model="val"
        v-bind="attributes"
        :hasIconLeft="iconLeft != null"
        :hasIconRight="iconRight != null"
        :type="type"
        :size="size"
        v-on="inputListeners"
        @focus="focus"
        @blur="blur"
      />

      <unnnic-icon-svg
        v-if="showSvgIconLeft"
        :scheme="iconScheme"
        :icon="iconLeft"
        :size="iconSize"
        class="icon-left"
      />

      <u-icon
        v-else-if="iconLeft"
        :icon="iconLeft"
        :clickable="iconLeftClickable"
        class="icon-left"
        :size="iconSize"
        @click="iconRightClicked" />

      <tool-tip
        v-if="tooltipIconRight"
        :enabled="true"
        :text="tooltipIconRight"
        :side="tooltipSideIconRight"
        :force-open="tooltipForceOpenIconRight"
        class="icon-right"
      >
        <u-icon
          v-if="iconRight"
          :icon="iconRight"
          :clickable="iconRightClickable"
          :size="iconSize"
          @click="iconRightClicked"
        />
      </tool-tip>

      <u-icon
        v-else-if="iconRight"
        :icon="iconRight"
        :clickable="iconRightClickable"
        class="icon-right"
        :size="iconSize"
        @click="iconRightClicked" />
  </div>
</template>

<script>
import UIcon from '../Icon.vue';
import ToolTip from '../ToolTip/ToolTip.vue';
import BaseInput from './BaseInput.vue';
import UnnnicIconSvg from '../Icon-svg.vue';

export default {
  name: 'unnnic-input',
  components: {
    UIcon,
    ToolTip,
    BaseInput,
    UnnnicIconSvg,
  },
  data() {
    return {
      val: null,
      isFocused: false,
    };
  },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
    value: {
      type: String,
      default: '',
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    tooltipIconRight: {
      type: String,
      default: null,
    },
    tooltipSideIconRight: {
      type: String,
      default: 'right',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].indexOf(value) !== -1;
      },
    },
    tooltipForceOpenIconRight: {
      type: Boolean,
      default: false,
    },
    iconLeftClickable: {
      type: Boolean,
      default: null,
    },
    iconRightClickable: {
      type: Boolean,
      default: null,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  mounted() {
    this.val = this.value;
  },
  computed: {
    showSvgIconLeft() {
      return this.iconLeft
        && [
          'button-play-1',
          'search-1',
        ].includes(this.iconLeft);
    },

    iconScheme() {
      if (this.isFocused) {
        return 'brand-weni';
      }

      if (this.type === 'error') {
        return 'feedback-red';
      }

      return 'neutral-clean';
    },

    inputListeners() {
      return {
        ...this.$listeners,
        input: () => {},
      };
    },
    attributes() {
      return { ...this.$attrs, ...this.$attrs['v-bind'] };
    },
    iconSize() {
      if (this.size === 'md') return 'sm';
      if (this.size === 'sm') return 'xs';
      return 'sm';
    },
  },
  methods: {
    focus() {
      this.isFocused = true;
    },

    blur() {
      this.isFocused = false;
    },

    iconRightClicked() {
      if (!this.iconRightClickable) return;
      this.$emit('icon-right-click');
    },
    iconLeftClicked() {
      if (!this.iconLeftClickable) return;
      this.$emit('icon-left-click');
    },
  },
  watch: {
    val() {
      this.$emit('input', this.val);
    },
    value() {
      this.val = this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-form {

  &:focus-within .icon, &:focus-within .unnnic-icon {
    color: $unnnic-color-brand-weni;
  }

  &--error {
    color: $unnnic-color-feedback-red;

    .unnnic-icon {
      color: $unnnic-color-feedback-red !important;
    }
  }
}

.unnnic-icon {
  color: $unnnic-color-neutral-clean;
}

.icon {

  &-left {
    position: absolute;
    transform: translateY(100%);
    left: $unnnic-inline-sm;
  }

  &-right {
    position: absolute;
    transform: translateY(100%);
    right: $unnnic-inline-sm;
    top: 0;
  }
}

</style>
