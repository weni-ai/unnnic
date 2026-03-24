<template>
  <section
    class="user-avatar"
    :class="{
      active,
      clickable,
      disabled,
      [`user-avatar--${size}`]: true,
      [`user-avatar--${scheme}`]: true,
    }"
    @click="$emit('click')"
    @keypress.enter="$emit('click')"
  >
    <slot name="content">
      <UnnnicIcon
        v-if="username === 'Agent'"
        icon="single-neutral-actions-1"
        size="sm"
        :scheme="disabled ? 'neutral-snow' : ''"
      />
      <UnnnicIcon
        v-else-if="username === 'Bot'"
        icon="science-fiction-robot-2"
        size="sm"
        :scheme="disabled ? 'neutral-snow' : ''"
      />
      <img
        v-else-if="!!photoUrl"
        :src="photoUrl"
        alt=""
      />
      <span v-else :class="`text-${textColor}`">
        {{ getUsernameFirstCharacter }}
      </span>
    </slot>
  </section>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UserAvatar',
  components: {
    UnnnicIcon,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'xl',
      validator: (value) =>
        ['xs', 'sm', 'ant', 'md', 'lg', 'xl', '2xl'].indexOf(value) !== -1,
    },
    username: {
      type: String,
      default: '',
    },
    photoUrl: {
      type: String,
      default: '',
    },
    scheme: {
      type: String,
      default: 'gray-200',
    },
    textColor: {
      type: String,
      default: 'gray-900',
    },
  },
  emits: ['click'],

  computed: {
    getUsernameFirstCharacter() {
      const cleanUsername = this.username.replace(/[^a-zA-Z0-9]+/g, '');

      const firstCodePoint = (cleanUsername || this.username).codePointAt(0);
      if (firstCodePoint) {
        return String.fromCodePoint(firstCodePoint);
      }
      return '-';
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

$avatar-sizes:
  '2xl' 3rem,
  'xl' $unnnic-icon-size-xl,
  'lg' $unnnic-icon-size-lg,
  'md' $unnnic-icon-size-md,
  'ant' $unnnic-icon-size-ant,
  'sm' $unnnic-icon-size-sm,
  'xs' $unnnic-icon-size-xs;

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $unnnic-radius-full;

  &.disabled {
    background: $unnnic-color-neutral-cleanest;
    color: $unnnic-color-neutral-snow;
  }

  &.clickable {
    cursor: pointer;
  }

  @each $name, $color in $unnnic-scheme-colors {
    &.text-#{$name} {
      color: $color;
    }

    &--#{$name} {
      background-color: $color;
    }
  }

  @each $name, $size in $avatar-sizes {
    &--#{$name} {
      min-width: $size;
      max-height: $size;
      width: $size;
      height: $size;

      font-size: calc($size / 2);
      font-family: $unnnic-font-family-secondary;

      overflow: hidden;

      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
