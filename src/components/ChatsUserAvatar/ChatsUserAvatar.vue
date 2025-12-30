<template>
  <section
    class="user-avatar"
    :class="{
      active,
      clickable,
      disabled,
      [`user-avatar--${size}`]: true,
    }"
    @click="$emit('click')"
    @keypress.enter="$emit('click')"
  >
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
    <span v-else>
      {{ getUsernameFirstCharacter }}
    </span>
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
      required: true,
    },
    photoUrl: {
      type: String,
      default: '',
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
  border-radius: $unnnic-border-radius-sm;

  border: 1px solid $unnnic-color-aux-purple-100;
  color: $unnnic-color-aux-purple-500;

  &.active {
    background: $unnnic-color-neutral-white;
  }

  &.disabled {
    background: $unnnic-color-neutral-cleanest;
    color: $unnnic-color-neutral-snow;
  }

  &.clickable {
    cursor: pointer;
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
