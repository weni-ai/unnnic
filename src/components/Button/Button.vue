<template>
  <div class="unnic-button-field">
         <component
        :is="currentComponent"
        :v-bind="$attrs"
        :type="type" />
  </div>
</template>

<script>

import ButtonNormal from './ButtonNormal.vue';
import ButtonWithIconLeft from './ButtonWithIconLeft.vue';
import ButtonWithIconRight from './ButtonWithIconRight.vue';
import ButtonWithIconCenter from './ButtonWithIconCenter.vue';
import ButtonNormalTertiary from './ButtonNormalTertiary.vue';
import ButtonTertiaryWithIconLeft from './ButtonTertiaryWithIconLeft.vue';
import ButtonTertiaryWithIconRight from './ButtonTertiaryWithIconRight.vue';
import ButtonTertiaryWithIconCenter from './ButtonTertiaryWithIconCenter.vue';
import ButtonNormalSmall from './ButtonNormalSmall.vue';
import ButtonTertiaryWithIconLeftSmall from './ButtonTertiaryWithIconLeftSmall.vue';
import ButtonTertiaryWithIconRightSmall from './ButtonTertiaryWithIconRightSmall.vue';
import ButtonNormalTertiarySmall from './ButtonNormalTertiarySmall.vue';
import ButtonTertiaryWithIconCenterSmall from './ButtonTertiaryWithIconCenterSmall.vue';
import ButtonWithIconCenterSmall from './ButtonWithIconCenterSmall.vue';
import ButtonWithIconLeftSmall from './ButtonWithIconLeftSmall.vue';
import ButtonWithIconRightSmall from './ButtonWithIconRightSmall.vue';

export default {
  name: 'unnic-input',
  components: {
    ButtonWithIconLeft,
    ButtonNormal,
    ButtonWithIconRight,
    ButtonWithIconCenter,
    ButtonNormalTertiary,
    ButtonTertiaryWithIconLeft,
    ButtonTertiaryWithIconRight,
    ButtonTertiaryWithIconCenter,
    ButtonNormalSmall,
    ButtonTertiaryWithIconLeftSmall,
    ButtonTertiaryWithIconRightSmall,
    ButtonNormalTertiarySmall,
    ButtonTertiaryWithIconCenterSmall,
    ButtonWithIconCenterSmall,
    ButtonWithIconLeftSmall,
    ButtonWithIconRightSmall,
  },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'disabled', 'hover'].indexOf(value) !== -1;
      },
    },
    nativeType: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
  },
  computed: {
    currentComponent() {
      return this.nativeType;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

.unnic-button-field{

}

</style>
