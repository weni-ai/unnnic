<template>
  <div :class="['unnnic-chart-bar', { condensed }]">
    <div
      v-if="title || description || $attrs.update || $attrs.previous || $attrs.next"
      class="header"
    >
      <div v-if="title || description" class="content">
        <div
          v-if="title"
          @click="$emit('update')"
          class="title unnnic-font bold title-sm color-neutral-darkest"
        >
          {{ title }}
        </div>

        <div
          v-if="description"
          class="description unnnic-font secondary body-gt color-neutral-cloudy"
        >
          {{ description }}
        </div>
      </div>

      <div v-if="$attrs.update || $attrs.previous || $attrs.next" class="actions">
        <div v-if="$attrs.update" class="update-button" @click="$emit('update')">
          <unnnic-icon icon="button-refresh-arrow-1" size="sm" scheme="neutral-darkest" />

          <span v-if="updateText" class="unnnic-font secondary body-md color-neutral-dark">
            {{ updateText }}
          </span>
        </div>

        <div v-if="$attrs.previous || $attrs.next" class="navigation-container">
          <unnnic-button
            v-if="$attrs.previous"
            @click="$emit('previous')"
            size="small"
            type="terciary"
            icon-center="arrow-left-1-1"
            :disabled="previousDisabled"
          ></unnnic-button>

          <unnnic-button
            v-if="$attrs.next"
            @click="$emit('next')"
            size="small"
            type="terciary"
            icon-center="arrow-right-1-1"
            :disabled="nextDisabled"
          ></unnnic-button>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="reference">
        <div class="values">
          <div
            v-for="(value, index) in [value(maxValue), value(maxValue / 2), value(0)]"
            :key="index"
            class="value unnnic-font secondary body-md color-neutral-cleanest"
          >
            {{ value }}
          </div>
        </div>

        <div class="unnnic-font secondary body-md color-neutral-cleanest">&nbsp;</div>
      </div>

      <div class="groups">
        <div v-for="(group, index) in groups" :key="index" class="group">
          <div class="bars">
            <unnnic-tool-tip
              enabled
              v-for="({ legend, index }) in legends
                .map((legend, index) => ({ legend, index }))
                .filter(({ legend }) => group.values[legend])"
              :key="index"
              :text="`${group.title}: ${group.values[legend]}\n${legend}`"
              side="top"
              :style="{ height: `${(group.values[legend] / maxValue) * 100}%` }"
            >
              <div
                :class="['bar', `color-${index}`]"

              ></div>
            </unnnic-tool-tip>
          </div>

          <div class="title unnnic-font secondary body-md color-neutral-cleanest">
            {{ group.title }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="showFooterLegend" class="footer">
      <div v-for="(legend, index) in legends" :key="index" class="legend">
        <unnnic-icon icon="indicator" :scheme="colors[index]" />
        <div class="unnnic-font secondary body-gt color-neutral-cloudy">{{ legend }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicButton from '../Button/Button.vue';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';

export default {
  components: {
    UnnnicIcon,
    UnnnicButton,
    UnnnicToolTip,
  },

  props: {
    condensed: Boolean,
    groups: Array,
    fixedMaxValue: Number,
    title: String,
    description: String,
    updateText: String,
    previousDisabled: Boolean,
    nextDisabled: Boolean,
    showFooterLegend: Boolean,
  },

  data() {
    return {
      colors: [
        'aux-blue',
        'aux-purple',
        'aux-orange',
        'aux-lemon',
        'aux-pink',
        'aux-baby-blue',
        'aux-baby-yellow',
        'aux-baby-red',
        'aux-baby-green',
        'aux-baby-pink',
      ],
    };
  },

  computed: {
    legends() {
      return this.groups
        .map(({ values }) => Object.keys(values))
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index);
    },

    maxValue() {
      return this.fixedMaxValue || Math.max(
        ...this.groups
          .map(({ values }) => Object.values(values))
          .flat(),
      );
    },
  },

  methods: {
    value(value) {
      if (this.maxValue <= 1) {
        return value.toFixed(1);
      }

      return String(Math.ceil(value));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-chart-bar {
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-spacing-inset-md;
  min-width: 15.5625 * $unnnic-font-size;
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  row-gap: $unnnic-spacing-stack-lg;
  outline-style: solid;
  outline-color: $unnnic-color-neutral-soft;
  outline-width: $unnnic-border-width-thinner;
  outline-offset: -$unnnic-border-width-thinner;

  &.condensed {
    padding: $unnnic-spacing-inset-sm;
    row-gap: $unnnic-spacing-stack-sm;

    .main .groups {
      column-gap: $unnnic-spacing-inline-nano;
    }

    .main .reference {
      margin-right: $unnnic-spacing-inline-sm;
    }
  }

  .header {
    display: flex;
    column-gap: $unnnic-spacing-inline-xs;
    align-items: center;

    .content {
      display: flex;
      flex-direction: column;
      row-gap: $unnnic-spacing-stack-nano;
      flex: 1;
    }

    .actions {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      .update-button {
        padding: $unnnic-spacing-inset-nano;
        cursor: pointer;
        user-select: none;
        display: flex;
        column-gap: $unnnic-spacing-inline-nano;
        justify-content: center;

        .unnnic-icon {
          width: $unnnic-icon-size-ant;
          height: $unnnic-icon-size-ant;
        }
      }

      .navigation-container {
        display: flex;
        column-gap: $unnnic-spacing-inline-nano;
        width: 100%;

        > * {
          flex: 1;
        }
      }
    }
  }

  .main {
    height: 16 * $unnnic-font-size;
    display: flex;
    justify-content: center;

    .groups {
      display: flex;
      column-gap: $unnnic-spacing-inline-lg;

      .group {
        min-width: 4 * $unnnic-font-size;
        display: flex;
        flex-direction: column;
        row-gap: $unnnic-spacing-stack-sm;

        .bars {
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          column-gap: $unnnic-spacing-inline-xs;

          .bar {
            width: 1 * $unnnic-font-size;
            height: 100%;
            border-radius: $unnnic-border-radius-sm;

            $colors:
              "0" $unnnic-color-aux-blue,
              "1" $unnnic-color-aux-purple,
              "2" $unnnic-color-aux-orange,
              "3" $unnnic-color-aux-lemon,
              "4" $unnnic-color-aux-pink,

              "5" $unnnic-color-aux-baby-blue,
              "6" $unnnic-color-aux-baby-yellow,
              "7" $unnnic-color-aux-baby-red,
              "8" $unnnic-color-aux-baby-green,
              "9" $unnnic-color-aux-baby-pink;

            @each $name, $color in $colors {
              &.color-#{$name} {
                background-color: $color;

                &:hover {
                  outline-style: solid;
                  outline-color: rgba($color, $unnnic-opacity-level-clear);
                  outline-width: $unnnic-border-width-thick;
                }
              }
            }
          }
        }

        .title {
          text-align: center;
        }
      }
    }

    .reference {
      display: flex;
      flex-direction: column;
      row-gap: $unnnic-spacing-stack-sm;
      margin-right: $unnnic-spacing-inline-md;

      .values {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
      }
    }
  }

  .footer {
    display: flex;
    column-gap: $unnnic-spacing-inline-sm;

    .legend {
      flex: 1;
      display: flex;
      column-gap: $unnnic-spacing-inline-nano;
      align-items: center;
      justify-content: center;
    }
  }
}

@each $name, $color in $scheme-colors {
  .color-#{$name} {
    color: $color;
  }

  .bg-#{$name} {
    background-color: $color;
  }
}

.unnnic-font {
  font-weight: $unnnic-font-weight-regular;
  font-family: $unnnic-font-family-primary;

  $font-sizes:
    "body-sm" $unnnic-font-size-body-sm,
    "body-md" $unnnic-font-size-body-md,
    "body-gt" $unnnic-font-size-body-gt,
    "body-lg" $unnnic-font-size-body-lg,

    "title-sm" $unnnic-font-size-title-sm,
    "title-md" $unnnic-font-size-title-md,
    "title-lg" $unnnic-font-size-title-lg,

    "h4" $unnnic-font-size-h4,
    "h3" $unnnic-font-size-h3,
    "h2" $unnnic-font-size-h2,
    "h1" $unnnic-font-size-h1;

  $font-weights:
    "black" $unnnic-font-weight-black,
    "bold" $unnnic-font-weight-bold,
    "light" $unnnic-font-weight-light;

  &.secondary {
    font-family: $unnnic-font-family-secondary;
  }

  @each $name, $size in $font-sizes {
    &.#{$name} {
      font-size: $size;
      line-height: $size + $unnnic-line-height-md;
    }
  }

  @each $name, $weight in $font-weights {
    &.#{$name} {
      font-weight: $weight;
    }
  }
}
</style>
