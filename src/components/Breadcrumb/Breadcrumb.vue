<template>
  <div class="unnnic-breadcrumb">
    <template
      v-for="(crumb, index) in crumbs"
      :key="crumb.name"
    >
      <div
        :class="{
          'unnnic-breadcrumb__container__link': true,
          'unnnic-breadcrumb__container__link__active':
            index === crumbs.length - 1,
        }"
        :data-test="crumb.name"
        @click="$emit('crumb-click', crumb)"
      >
        {{ crumb.name }}
      </div>

      <UnnnicIcon
        v-if="index !== crumbs.length - 1"
        data-test="right-icon"
        icon="arrow-right-1-1"
        size="xs"
        lineHeight="md"
        class="unnnic-breadcrumb__container__divider"
        scheme="neutral-cloudy"
      />
    </template>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicBreadcrumb',
  components: { UnnnicIcon },
  props: {
    crumbs: {
      type: Array,
      default: null,
      validator: (crumb) => crumb.every((c) => c.name !== null),
    },
  },

  emits: ['crumb-click'],
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/unnnic' as *;
.unnnic-breadcrumb {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__container {
    &__divider {
      margin: 0 $unnnic-inline-xs;
    }

    &__link {
      cursor: pointer;
      text-decoration: underline;

      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-neutral-cloudy;

      &__active {
        text-decoration: none;
        cursor: default;

        color: $unnnic-color-neutral-dark;
        font-weight: $unnnic-font-weight-bold;
      }
    }
  }
}
</style>
