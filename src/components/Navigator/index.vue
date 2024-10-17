<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="unnnic-navigator-pages">
    <section
      v-for="(page, pageIndex) in pages"
      :key="page"
      :class="[
        'unnnic-navigator-pages__page',
        {
          'unnnic-navigator-pages__page--before': activePageIndex > pageIndex,
          'unnnic-navigator-pages__page--current': activePage == page,
        },
      ]"
    >
      <span class="unnnic-navigator-pages__page-progress"></span>

      <p
        :class="[
          'unnnic-navigator-pages__page-title',
          {
            'unnnic-navigator-pages__page-title--active': activePage === page,
          },
        ]"
      >
        {{ page }}
      </p>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    pages: { type: Array, required: true },
    activePage: { type: String, required: true },
  },
  computed: {
    activePageIndex() {
      return this.pages.indexOf(this.activePage);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';
.unnnic-navigator-pages {
  display: flex;
  column-gap: $unnnic-spacing-xs;

  &__page {
    width: 100%;
    max-width: 100px;
    display: flex;
    flex-direction: column;
    row-gap: $unnnic-spacing-nano;

    &-progress {
      height: $unnnic-font-size-body-sm;
      width: 100%;
      background-color: $unnnic-color-weni-100;
      border-radius: $unnnic-border-radius-pill;
    }

    &-title {
      text-align: center;
      margin-top: 0;
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
      color: $unnnic-color-neutral-clean;
    }

    @media screen and (max-width: 480px) {
      max-width: 3.75rem;

      &-title {
        display: none;
      }
    }

    &--current,
    &--before {
      .unnnic-navigator-pages__page-progress {
        background-color: $unnnic-color-weni-600;
      }
    }

    &--current {
      .unnnic-navigator-pages__page-title {
        color: $unnnic-color-weni-700;
        font-weight: $unnnic-font-weight-bold;
      }
    }
  }
}
</style>
