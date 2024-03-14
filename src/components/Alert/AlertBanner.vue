<template>
    <div :class="['banner-alert', {
        'banner-alert--banner-danger': type === 'danger',
        'banner-alert--banner-warning': type === 'warning',
      }]">
        <div v-show="text" class="banner-alert__container-text">
          <unnnic-icon class="banner-alert__textIcon" v-show="isShowTextIcon(type)" :icon="getIconType(type)" size="sm" scheme="neutral-white" />
          <span class="text" >{{ text }}</span>
          <a v-if="linkHref" class="banner-alert__link" :href="linkHref" :target="linkTarget">
            {{ linkText }}
          </a>
        </div>
  
        <div
          v-show="showCloseButton"
          class="banner-alert__close"
          @click="emitClose"
        >
          <unnnic-icon icon="close" size="sm" scheme="neutral-white" />
        </div>
      </div>
  </template>
  
  <script>
  import UnnnicIcon from '../Icon.vue';
  
  export default {
    components: {
      UnnnicIcon,
    },
    methods: {
      getIconType(type) {
        if (type === 'danger') return 'block';
        if (!type.trim()) return 'info'; //check if type is empty or whitespace
        return type;
      },
      isShowTextIcon(type) {
        return ['danger', 'warning', 'info', ''].includes(type)
      },
      emitClose() {
        this.onClose();

        this.$emit('close');
      }
    },
    props: {
      version: {
        type: String,
        default: '1.0',
      },
      text: {
        type: String,
        default: null,
      }, 
      onClose: {
        type: Function,
        default: () => {}
      },
      showCloseButton: {
        type: Boolean,
        default: false
      },
      linkHref: {
        type: String,
        default: '',
      },
      linkTarget: {
        type: String,
        default: '_blank',
      },
      linkText: {
        type: String,
        default: 'Learn more',
      },
      type: {
        type: String,
        default: 'info',
      },
    }
  };
  </script>
  
  <style lang="scss" scoped>
  @import '../../assets/scss/unnnic.scss';
  
  .banner-alert {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    margin-bottom: $unnnic-spacing-sm;
  
    color: $unnnic-color-neutral-white;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    font-weight: $unnnic-font-weight-regular;
    background-color: $unnnic-color-aux-blue-500;

    &__container-text {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: $unnnic-spacing-xs $unnnic-spacing-sm;
      flex-grow: 1;

      .text {
        margin-right: $unnnic-spacing-nano;
      }
    }

    &__textIcon {
      margin-right: $unnnic-spacing-ant * 0.9;
    }
  
    &__link {
      color: inherit;
      display: block;
      font-weight: $unnnic-font-weight-bold;
      text-decoration: underline;
      text-underline-position: under;
    }
  
    &__close {
      display: flex;
      padding: ($unnnic-spacing-xs*1.375) $unnnic-spacing-sm;
      cursor: pointer;
      user-select: none;
      border-left: $unnnic-border-width-thinner solid $unnnic-color-aux-blue-300;
      &:hover {
          background-color: $unnnic-color-aux-blue-300;
        }
    }
  
    &--banner-warning {
      background-color: $unnnic-color-aux-orange-500;
  
      .banner-alert__close {
        border-left: $unnnic-border-width-thinner solid $unnnic-color-aux-orange-300;
  
        &:hover {
          background-color: $unnnic-color-aux-orange-300;
        }
      }
    }
  
    &--banner-danger {
      background-color: $unnnic-color-aux-red-500;
  
      .banner-alert__close {
        border-left: $unnnic-border-width-thinner solid $unnnic-color-aux-red-300;
  
        &:hover {
          background-color: $unnnic-color-aux-red-300;
        }
      }
    }
  }
  </style>
  