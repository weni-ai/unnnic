<template>
  <span
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
    <unnnic-icon
      v-if="username === 'Agent'"
      icon="single-neutral-actions-1"
      size="sm"
      :scheme="disabled ? 'neutral-snow' : ''"
    />
    <unnnic-icon
      v-else-if="username === 'Bot'"
      icon="science-fiction-robot-2"
      size="sm"
      :scheme="disabled ? 'neutral-snow' : ''"
    />
    <img v-else-if="!!photoUrl" :src="photoUrl" alt="" />
    <span v-else>
      {{ getUsernameFirstCharacter }}
    </span>
  </span>
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
      validator: (value) => ['xs', 'sm', 'ant', 'md', 'lg', 'xl', '2xl'].indexOf(value) !== -1,
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

  computed: {
    getUsernameFirstCharacter() {
      return this.username ? this.username.charAt(0).toUpperCase() : '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

$avatar-sizes: '2xl' 3rem, 'xl' $unnnic-icon-size-xl, 'lg' $unnnic-icon-size-lg,
  'md' $unnnic-icon-size-md, 'ant' $unnnic-icon-size-ant, 'sm' $unnnic-icon-size-sm,
  'xs' $unnnic-icon-size-xs;

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $unnnic-border-radius-sm;

  background: $unnnic-color-weni-50;
  color: $unnnic-color-aux-purple-500;

  &.active {
    background: $unnnic-color-weni-100;
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
