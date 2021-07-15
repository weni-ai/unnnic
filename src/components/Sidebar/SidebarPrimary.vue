<template>
  <div
    :class="['unnnic-sidebar-primary', { 'unnnic-sidebar-primary-expanded': expanded, }]"
  >
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div class="unnnic-sidebar-primary-content">
      <div v-for="(category, index) in items" :key="index" class="category">
        <div class="category-label">{{ category.label }}</div>

        <div class="options">
          <div  v-for="(option, index) in category.items" :key="index" class="option-container">
            <tool-tip :enabled="!expanded" :text="option.label" side="right">
              <a :href="option.viewUrl"
                :class="['option', { selected: option.active, }]"
                @click.prevent="clickOption(option)"
              >
                <icon-svg
                  :icon="option.icon"
                  :scheme="option.active ? 'brand-weni-soft' : 'neutral-cloudy'"
                  :size="!expanded ? 'md' : 'ant'"
                />

                <span class="label">{{ option.label }}</span>
                <span :class="
                  option.notify && !expanded ? 'notify':''"
                  v-if="option.notify">
                  <icon-svg
                    icon="indicator"
                    scheme="brand-weni-soft"
                    size="ant"
                  />
                </span>
              </a>
            </tool-tip>
          </div>
        </div>

        <div class="divider"></div>
      </div>
    </div>

    <div class="footer">
      <div class="category">
        <div class="options">
          <div class="option-container">
            <language-select
              class="language-select"
              :contracted="!expanded"
              :value="language"
              @input="$emit('change-language', $event)"
            />
          </div>

          <div v-show="!hideExpandButton" class="option-container">
            <tool-tip :enabled="!expanded" :text="hideText" side="right">
              <div class="option" @click="toggleExpanded">
                <icon-svg
                  :icon="expanded ? 'expand-8-1' : 'expand-full-1'"
                  :scheme="'neutral-cloudy'"
                  :size="!expanded ? 'md' : 'ant'"
                />

                <span class="label">{{ hideText }}</span>
              </div>
            </tool-tip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolTip from '../ToolTip/ToolTip.vue';
import languageSelect from '../Dropdown/LanguageSelect.vue';
import iconSvg from '../Icon-svg.vue';

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

    language: {
      type: String,
    },

    hideText: {
      type: String,
    },
  },
  data() {
    return {};
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
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

$transition-time: 0.4s;

.unnnic-sidebar-primary {
  width: 5.5rem;
  background-color: $unnnic-color-background-sky;
  padding: $unnnic-spacing-inset-md;
  box-sizing: border-box;
  transition: width $transition-time;

  display: flex;
  flex-direction: column;

  &-content {
    flex: 1;
  }

  .header {
    text-align: center;
    margin-bottom: $unnnic-spacing-stack-md;
  }

  .footer {
    .language-select ::v-deep .unnnic-language-select {
      padding: $unnnic-inset-xs;
    }

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

    ::v-deep > .unnnic-tooltip {
      width: 100%;
      display: block;
    }

    .option {
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      text-decoration: none;

      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-dark;

      border-radius: $unnnic-border-radius-sm;
      padding: $unnnic-spacing-inset-nano;

      height: 2.375rem;
      box-sizing: border-box;

      display: flex;
      align-items: center;

      ::v-deep .unnnic-icon {
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
      }

      &:hover {
        background-color: rgba($unnnic-color-brand-weni, $unnnic-opacity-level-light);
      }

      &.selected {
        background-color: rgba($unnnic-color-brand-weni, $unnnic-opacity-level-light);

        font-weight: $unnnic-font-weight-bold;
        color: $unnnic-color-neutral-darkest;
      }
      .notify{
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }

  &-expanded {
    width: 15.375rem;

    .category {
      &-label {
        width: 100%;
        height: ($unnnic-font-size-body-md + $unnnic-line-height-md);
        margin-bottom: $unnnic-spacing-stack-xs;
      }

      .option ::v-deep .unnnic-icon {
        margin-right: $unnnic-spacing-inline-xs;
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
