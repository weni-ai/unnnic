<template>
  <div
    :class="[
      'unnnic-sidebar-primary',
      { 'unnnic-sidebar-primary-expanded': expanded },
    ]"
  >
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div>
      <slot name="search"></slot>
    </div>

    <div class="unnnic-sidebar-primary-content">
      <div
        ref="sidebar-modal"
        class="hover"
        :style="{ top: `${hoverTop}px` }"
      >
        <slot :name="'block-' + blockActiveId"></slot>
      </div>

      <div
        v-for="(category, index) in items"
        :key="index"
        class="category"
      >
        <div class="category-label">{{ category.label }}</div>

        <div class="options">
          <div
            v-for="(option, index) in category.items"
            :key="index"
            class="option-container"
          >
            <ToolTip
              :enabled="!expanded"
              :text="option.label"
              side="right"
              @mouseenter="hover($event, option.id)"
              @mouseleave="mouseout"
            >
              <a
                :href="option.viewUrl"
                :class="[
                  'option',
                  {
                    selected: option.active,
                    disabled: $slots[`block-${option.id}`],
                  },
                ]"
                @click.prevent="
                  () => {
                    if ($slots[`block-${option.id}`]) {
                      return;
                    }

                    clickOption(option);
                  }
                "
              >
                <IconSvg
                  :icon="option.icon"
                  :scheme="option.active ? 'brand-weni-soft' : 'neutral-cloudy'"
                  :size="!expanded ? 'md' : 'ant'"
                  :filled="option.active"
                />

                <span class="label">{{ option.label }}</span>
                <span
                  :class="option.notify && !expanded ? 'notify' : ''"
                  v-if="option.notify"
                >
                  <IconSvg
                    icon="indicator"
                    scheme="brand-weni-soft"
                    size="ant"
                  />
                </span>
              </a>
            </ToolTip>
          </div>
        </div>

        <div class="divider"></div>
      </div>
    </div>

    <div class="footer">
      <div class="category">
        <div class="options">
          <div class="option-container">
            <LanguageSelect
              class="language-select"
              :contracted="!expanded"
              :value="language"
              :supportedLanguages="languages"
              @input="$emit('change-language', $event)"
            />
          </div>

          <div
            v-show="!hideExpandButton"
            class="option-container"
          >
            <ToolTip
              :enabled="!expanded"
              :text="hideText"
              side="right"
            >
              <div
                class="option"
                @click="toggleExpanded"
              >
                <IconSvg
                  :icon="expanded ? 'close_fullscreen' : 'open_in_full'"
                  :scheme="'neutral-cloudy'"
                  :size="!expanded ? 'md' : 'ant'"
                />

                <span class="label">{{ hideText }}</span>
              </div>
            </ToolTip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolTip from '../ToolTip/ToolTip.vue';
import languageSelect from '../Dropdown/LanguageSelect.vue';
import iconSvg from '../Icon.vue';

export default {
  components: {
    ToolTip,
    iconSvg,
    languageSelect,
  },

  props: {
    hideExpandButton: {
      type: Boolean,
      default: false,
    },

    expanded: {
      type: Boolean,
      default: true,
    },

    items: {
      type: Array,
    },

    languages: {
      type: Array,
      default: () => ['pt-br', 'en'],
    },

    language: {
      type: String,
    },

    hideText: {
      type: String,
    },
  },
  data() {
    return {
      hoverTop: 0,
      call: null,
      blockActiveId: '',
    };
  },

  methods: {
    clickOption(option) {
      if (option.click) {
        option.click(option);
      }
    },

    toggleExpanded() {
      this.$emit('toggle-expanded', !this.expanded);
    },

    hover(event, id) {
      if (!this.$slots[`block-${id}`]) {
        return;
      }

      this.hoverTop = event.srcElement.offsetTop;

      this.blockActiveId = id;

      clearTimeout(this.call);

      setTimeout(() => {
        this.$refs['sidebar-modal'].classList.add('active', 'move-transition');
      }, 0);
    },

    mouseout() {
      this.$refs['sidebar-modal'].classList.remove('active');

      this.call = setTimeout(() => {
        this.$refs['sidebar-modal'].classList.remove('move-transition');
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

$transition-time: 0.4s;

.unnnic-sidebar-primary {
  position: relative;
  width: 5.5 * $unnnic-font-size;
  background-color: $unnnic-color-background-sky;
  padding: $unnnic-spacing-inset-md;
  box-sizing: border-box;
  transition: width $transition-time;

  display: flex;
  flex-direction: column;

  .hover {
    width: 16.875 * $unnnic-font-size;
    z-index: 2;
    position: absolute;
    top: 0;
    pointer-events: none;
    left: 100%;
    margin-left: -2 * $unnnic-font-size;
    opacity: 0;
    transition: opacity 10ms;
    margin-top: -9.375 * $unnnic-font-size;

    &:hover {
      pointer-events: all;
      opacity: 1;
    }

    &.active {
      pointer-events: all;
      opacity: 1;
    }

    &.move-transition {
      transition:
        opacity 100ms,
        top 100ms;
    }
  }

  &-expanded .hover {
    margin-left: -2.625 * $unnnic-font-size;
  }

  &-content {
    flex: 1;
  }

  .header {
    text-align: center;
    margin-bottom: $unnnic-spacing-stack-md;
  }

  .footer {
    .category {
      padding-bottom: 0;

      .option-container {
        padding-bottom: $unnnic-spacing-stack-sm;
      }
    }
  }

  .category {
    padding-bottom: $unnnic-spacing-stack-md;

    &-label {
      overflow: hidden;
      font-family: $unnnic-font-family-secondary;
      color: $unnnic-color-neutral-cloudy;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-dark;
      font-size: $unnnic-font-size-body-md;
      line-height: ($unnnic-font-size-body-md + $unnnic-line-height-md);
      width: 0;
      height: 0;
      margin-bottom: 0;
      white-space: nowrap;
      transition: all $transition-time;
    }

    &:not(:last-child) .divider {
      width: 100%;
      height: $unnnic-border-width-thinner;
      background: $unnnic-color-neutral-soft;
      margin-top: $unnnic-spacing-stack-md;
      transition: all $transition-time;
    }
  }

  .option-container {
    &:not(:last-child) {
      padding-bottom: $unnnic-spacing-stack-xs;
    }

    :deep(.unnnic-tooltip) {
      width: 100%;
      display: block;
    }

    .option {
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      // position: relative;
      text-decoration: none;

      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-dark;

      border-radius: $unnnic-border-radius-sm;
      padding: $unnnic-spacing-inset-nano;

      height: 2.375 * $unnnic-font-size;
      box-sizing: border-box;

      display: flex;
      align-items: center;

      :deep(.unnnic-icon) {
        transition: all $transition-time;
        float: left;
        margin-right: 0;
      }

      .label {
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-gt;
        line-height: ($unnnic-font-size-body-gt + $unnnic-line-height-md);
        float: left;
        flex: 1;
        white-space: nowrap;
        width: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
        margin-left: $unnnic-spacing-xs;
      }

      &:hover:not(.disabled) {
        background-color: rgba(
          $unnnic-color-brand-weni,
          $unnnic-opacity-level-light
        );
      }

      &.selected {
        background-color: rgba(
          $unnnic-color-brand-weni,
          $unnnic-opacity-level-light
        );

        font-weight: $unnnic-font-weight-bold;
        color: $unnnic-color-neutral-darkest;
      }

      &.disabled {
        cursor: not-allowed;

        .unnnic-icon :deep(.primary) {
          fill: $unnnic-color-neutral-clean;
        }

        .label {
          color: $unnnic-color-neutral-clean;
        }
      }

      .notify {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }

  &-expanded {
    width: 15.375 * $unnnic-font-size;

    .category {
      &-label {
        width: 100%;
        height: ($unnnic-font-size-body-md + $unnnic-line-height-md);
        margin-bottom: $unnnic-spacing-stack-xs;
      }

      &:not(:last-child) .divider {
        width: 0;
        height: 0;
        margin-top: 0;
      }
    }
  }
}
</style>
