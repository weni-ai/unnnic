<template>
  <div class="unnnic-breadcrumb">
    <div v-for="(crumb, index) in crumbs" :key="crumb.name" class="unnnic-breadcrumb__container">
      <div
        @click="$emit('crumbClick', crumb)"
        :class="{
          'unnnic-breadcrumb__container__link': true,
          'unnnic-breadcrumb__container__link__active': index === crumbs.length - 1,
        }"
      >
        {{ crumb.name }}
      </div>
      <unnnic-icon-svg
        v-if="index !== crumbs.length - 1"
        icon="arrow-right-1-1"
        size="xs"
        lineHeight="md"
        class="unnnic-breadcrumb__container__divider"
        scheme="neutral-cloudy"
      />
    </div>
  </div>
</template>

<script>
import UnnnicIconSvg from '../Icon.vue';

export default {
  name: 'unnnic-breadcrumb',
  components: { UnnnicIconSvg },
  props: {
    crumbs: {
      type: Array,
      default: null,
      validator: (crumb) => crumb.every((c) => c.name !== null),
    },
  },
  methods: {
    emitAction(crumb) {
      this.$root.$emit('crumbClick', crumb);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/scss/unnnic.scss';
.unnnic-breadcrumb {
  display: flex;
  flex-direction: row;

  &__container {
    display: flex;
    flex-direction: row;

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
