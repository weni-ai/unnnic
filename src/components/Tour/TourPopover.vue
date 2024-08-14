<template>
  <section
    ref="popover"
    :class="['unnnic-tour__popover', step.popoverPosition]"
    :style="style"
  >
    <header class="popover__header">
      <h1 class="header__title">{{ step.title }}</h1>
      <p
        class="header__close-tour"
        @click="$emit('end')"
      >
        {{ i18n('close_tour') }}
      </p>
    </header>
    <p class="popover__description">{{ step.description }}</p>
    <UnnnicButton
      type="primary"
      @click="$emit('nextStep')"
    >
      {{ i18n('understood') }} {{ currentStep }}/{{ stepsLength }}
    </UnnnicButton>
  </section>
</template>

<script>
import UnnnicI18n from '@/mixins/i18n';

import UnnnicButton from '@/components/Button/Button.vue';

export default {
  name: 'UnnnicTourPopover',

  components: {
    UnnnicButton,
  },

  mixins: [UnnnicI18n],

  props: {
    step: {
      type: Object,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
    stepsLength: {
      type: Number,
      required: true,
    },
    attachedElement: {
      type: Element,
      required: true,
    },
  },

  emits: ['end', 'nextStep'],

  data() {
    return {
      style: {},
      defaultTranslations: {
        close_tour: {
          'pt-br': 'Fechar tour',
          en: 'Close tour',
          es: 'Cerrar recorrido',
        },
        understood: {
          'pt-br': 'Entendi',
          en: 'I understood',
          es: 'Entendí',
        },
      },
    };
  },

  watch: {
    attachedElement: {
      immediate: true,
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.updatePopoverStyle();
        });
      },
    },
  },

  methods: {
    updatePopoverStyle() {
      const { attachedElement, step } = this;

      const popoverElement = this.$refs.popover;

      if (!attachedElement || !popoverElement) {
        return;
      }

      const {
        top: attachedTop,
        left: attachedLeft,
        width: attachedWidth,
        height: attachedHeight,
      } = attachedElement.getBoundingClientRect();
      const popoverArrowSize = 12;
      const popoverArrowMargin = 2;
      const popoverArrowSpacing = popoverArrowSize + popoverArrowMargin;
      const popoverWidth = popoverElement?.offsetWidth;
      const popoverHeight = popoverElement?.offsetHeight;

      const translateXMap = {
        top: attachedLeft - (popoverWidth - attachedWidth) / 2,
        bottom: attachedLeft - (popoverWidth - attachedWidth) / 2,
        right: attachedLeft + attachedWidth + popoverArrowSpacing,
        left: attachedLeft - popoverWidth - popoverArrowSpacing,
      };
      const translateYMap = {
        top: attachedTop - popoverHeight - popoverArrowSpacing,
        bottom: attachedTop + attachedHeight + popoverArrowSpacing,
        right: attachedTop - popoverHeight / 2 + attachedHeight / 2,
        left: attachedTop - popoverHeight / 2 + attachedHeight / 2,
      };

      let style = {
        transform: `translate(${translateXMap[step.popoverPosition]}px, ${translateYMap[step.popoverPosition]}px)`,
        transition: 'transform .3s ease',
      };

      this.style = style;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-tour__popover {
  display: flex;
  flex-direction: column;
  gap: $unnnic-spacing-ant;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 1001;

  border-radius: $unnnic-border-radius-sm;
  box-shadow: $unnnic-shadow-level-near;
  background: $unnnic-color-background-white;
  padding: $unnnic-spacing-ant;

  width: max-content;
  max-width: 30vw;

  color: $unnnic-color-neutral-darkest;
  font-family: $unnnic-font-family-secondary;
  font-size: $unnnic-font-size-body-gt;
  font-weight: $unnnic-font-weight-regular;

  $arrowSize: $unnnic-icon-size-xs;
  $arrowHalfSize: calc($arrowSize / 2);

  &::before {
    content: '';
    position: absolute;

    width: $unnnic-icon-size-xs;
    height: $unnnic-icon-size-xs;

    border-radius: calc($unnnic-border-radius-sm / 2);

    background: linear-gradient(
      -45deg,
      $unnnic-color-background-white 50%,
      transparent 50%
    );
  }

  &.top::before {
    left: 50%;
    bottom: -$arrowHalfSize;
    transform: translateX(-50%) rotate(45deg);
  }

  &.bottom::before {
    top: -$arrowHalfSize;
    left: 50%;
    transform: translateX(-50%) rotate(225deg);
  }

  &.left::before {
    right: -$arrowHalfSize;
    top: 50%;
    transform: translateY(-50%) rotate(315deg);
  }

  &.right::before {
    left: -$arrowHalfSize;
    top: 50%;
    transform: translateY(-50%) rotate(135deg);
  }

  .popover__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $unnnic-spacing-nano;

    .header__title {
      font-weight: $unnnic-font-weight-bold;
      font-size: $unnnic-font-size-body-gt;
    }
    .header__close-tour {
      cursor: pointer;

      font-size: $unnnic-font-size-body-md;
      text-decoration-line: underline;
    }
  }
}
</style>
