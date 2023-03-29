<template>
  <div :class="['unnnic-card-flow', { error }]">
    <div class="header">
      <unnnic-icon v-if="error" icon="alert-circle-1" size="sm" scheme="neutral-snow" />
      <span class="u font secondary body-md bold">{{ title }}</span>
    </div>

    <main
      v-if="description instanceof Array || description"
      :class="[
        'u font secondary body-md color-neutral-dark',
        { 'text-center': description instanceof Array || options.length },
      ]"
    >
      <template v-if="description instanceof Array">
        <div class="line" v-for="(d, index) in description" :key="index">{{ d }}</div>
      </template>

      <template v-else>
        {{ description }}
      </template>
    </main>

    <div v-if="options.length" class="options">
      <div
        :class="[
          'option u font secondary body-md color-neutral-dark',
          description instanceof Array || description ? 'bg-background-sky' : 'bg-background-snow',
        ]"
        v-for="(option, index) in options"
        :key="index"
      >
        {{ option.name }}

        <div
          :class="[
            'ball u font secondary body-sm color-neutral-dark',
            { 'has-content': option.value !== undefined },
          ]"
        >
          {{ option.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },

  props: {
    error: Boolean,
    title: String,
    description: {
      type: [String, Array],
      default: '',
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-card-flow {
  display: flex;
  flex-direction: column;
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-md;
  border: $unnnic-border-width-thin solid $unnnic-color-neutral-cleanest;
  width: min-content;
  min-width: 13.75rem;

  .text-center {
    text-align: center;
  }

  &.error {
    border-color: $unnnic-color-feedback-red;

    .header {
      background-color: $unnnic-color-feedback-red;
      color: $unnnic-color-neutral-snow;
    }
  }

  .header {
    display: flex;
    align-items: center;
    column-gap: $unnnic-spacing-inline-nano;
    padding: $unnnic-spacing-inset-xs;
    justify-content: center;
    background-color: $unnnic-color-background-sky;
    color: $unnnic-color-neutral-darkest;
    border-radius: 0.3125rem 0.3125rem 0 0;
  }

  main {
    padding: $unnnic-spacing-inset-xs;

    .line {
      padding: $unnnic-spacing-inset-xs;
      margin: 0 (-$unnnic-spacing-inset-xs);

      &:first-child {
        margin-top: -$unnnic-spacing-inset-xs;
      }

      &:last-child {
        margin-bottom: -$unnnic-spacing-inset-xs;
      }

      &:not(:first-child) {
        border-top: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
        margin-top: -$unnnic-border-width-thinner;
      }
    }
  }

  .options {
    display: flex;

    .option {
      flex: 1;
      text-align: center;
      min-width: 6.875rem;
      padding: $unnnic-spacing-inset-xs;
      box-sizing: border-box;
      position: relative;

      &:first-child {
        border-radius: 0 0 0 0.3125rem;
      }

      &:last-child {
        border-radius: 0 0 0.3125rem 0;
      }

      .ball {
        width: $unnnic-icon-size-sm;
        height: $unnnic-icon-size-sm;
        border-radius: $unnnic-border-radius-md;
        background-color: $unnnic-color-aux-orange;
        position: absolute;
        bottom: -$unnnic-icon-size-sm / 2;
        left: 50%;
        margin-left: -$unnnic-icon-size-sm / 2;
        user-select: none;
        box-sizing: border-box;
        text-align: center;

        &.has-content {
          background-color: $unnnic-color-neutral-snow;
          border: $unnnic-border-width-thinner solid $unnnic-color-neutral-cleanest;

          &.u.font {
            line-height: 0.875rem;
          }
        }
      }
    }
  }
}
</style>
