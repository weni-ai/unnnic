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
        @click="emit('crumb-click', crumb)"
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
        scheme="fg-base"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import UnnnicIcon from '../Icon.vue';

defineOptions({
  name: 'UnnnicBreadcrumb',
});

export interface BreadcrumbItem {
  name: string;
}

export interface BreadcrumbProps {
  crumbs?: BreadcrumbItem[] | null;
}

withDefaults(defineProps<BreadcrumbProps>(), {
  crumbs: null,
});

const emit = defineEmits<{
  'crumb-click': [crumb: BreadcrumbItem];
}>();
</script>

<style scoped lang="scss">
@use '@/assets/scss/unnnic' as *;
.unnnic-breadcrumb {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__container {
    &__divider {
      margin: 0 $unnnic-space-2;
    }

    &__link {
      cursor: pointer;
      text-decoration: underline;

      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-fg-base;

      &__active {
        text-decoration: none;
        cursor: default;

        color: $unnnic-color-fg-base;
        font-weight: $unnnic-font-weight-bold;
      }
    }
  }
}
</style>
