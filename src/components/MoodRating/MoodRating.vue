<template>
  <div class="unnnic-mood-rating">
    <div class="title">{{ title }}</div>

    <div :class="['moods', { selected: modelValue !== null }]">
      <div
        v-for="(mood, index) in moods"
        :key="index"
        class="mood"
      >
        <UnnnicToolTip
          side="bottom"
          :text="titlesMoods[index]"
          enabled
        >
          <img
            :src="mood.image"
            @click="
              modelValue && index === modelValue - 1
                ? $emit('update:model-value', null)
                : $emit('update:model-value', index + 1)
            "
            :class="{
              active: modelValue && index === modelValue - 1,
            }"
          />
        </UnnnicToolTip>
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicToolTip from '../ToolTip/ToolTip.vue';

import mood1 from '../../assets/emoji/u1F625.png';
import mood2 from '../../assets/emoji/u1F641.png';
import mood3 from '../../assets/emoji/u1F610.png';
import mood4 from '../../assets/emoji/u1F645.png';
import mood5 from '../../assets/emoji/u1F601.png';

export default {
  components: {
    UnnnicToolTip,
  },

  props: {
    modelValue: {
      type: Number,
    },

    title: {
      type: String,
    },

    titlesMoods: {
      type: Array,
      default() {
        return ['Decepcionado', 'Insatisfeito', 'Neutro', 'Feliz', 'Produtivo'];
      },
    },
  },

  data() {
    return {
      moods: [
        {
          image: mood1,
        },
        {
          image: mood2,
        },
        {
          image: mood3,
        },
        {
          image: mood4,
        },
        {
          image: mood5,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-mood-rating {
  text-align: center;

  .title {
    margin-bottom: $unnnic-spacing-stack-xs;
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-bold;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    color: $unnnic-color-neutral-cloudy;
  }

  .moods {
    display: flex;
    justify-content: center;
    column-gap: $unnnic-spacing-inline-sm;
    height: 2.5 * $unnnic-font-size;

    &.selected .mood img {
      opacity: $unnnic-opacity-level-overlay;
    }

    .mood {
      padding-top: $unnnic-spacing-stack-nano;

      img {
        cursor: pointer;
        width: $unnnic-icon-size-lg;
        transition: all 300ms;

        &:hover,
        &.active {
          opacity: 1;
          width: $unnnic-icon-size-xl;
        }
      }
    }
  }
}
</style>
