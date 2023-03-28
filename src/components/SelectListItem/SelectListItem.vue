<template>
  <div class="unnnic-select-list-item">
    <div class="main">
      <unnnic-checkbox class="unnnic-checkbox" :value="checked" @change="$emit('change', $event)" />

      <span
        v-if="title"
        class="title u font secondary body-lg bold color-neutral-darkest"
        :title="title"
      >
        {{ title }}
      </span>

      <span
        v-if="description"
        class="u font secondary body-md color-neutral-cloudy"
        :title="description"
      >
        {{ description }}
      </span>
    </div>

    <div class="content">
      <div class="item" v-for="(item, index) in data" :key="index">
        <span class="u font secondary body-gt color-neutral-dark">{{ item.name }}</span>
        <span class="u font secondary body-gt bold color-neutral-darkest">{{ item.value }}</span>
      </div>

      <unnnic-dropdown v-if="$slots.actions" position="bottom-left">
        <unnnic-icon
          slot="trigger"
          icon="navigation-menu-vertical-1"
          size="sm"
          scheme="neutral-cleanest"
          clickable
        />

        <slot name="actions" />
      </unnnic-dropdown>
    </div>
  </div>
</template>

<script>
import UnnnicCheckbox from '../Checkbox/Checkbox.vue';
import UnnnicDropdown from '../Dropdown/Dropdown.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  model: {
    prop: 'checked',
    event: 'change',
  },

  components: {
    UnnnicCheckbox,
    UnnnicDropdown,
    UnnnicIcon,
  },

  props: {
    checked: Boolean,
    title: String,
    description: String,
    data: {
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

.unnnic-select-list-item {
  padding: $unnnic-spacing-inset-sm;
  border-radius: $unnnic-border-radius-md;
  background-color: $unnnic-color-background-snow;
  outline-style: solid;
  outline-color: $unnnic-color-neutral-soft;
  outline-width: $unnnic-border-width-thinner;
  outline-offset: -$unnnic-border-width-thinner;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .main {
    display: flex;
    column-gap: $unnnic-spacing-inline-sm;
    align-items: center;
    overflow: hidden;
    min-width: $unnnic-spacing-inline-lg;
    margin-right: $unnnic-spacing-inline-sm;
    flex: 1;

    .unnnic-checkbox {
      margin: $unnnic-spacing-stack-nano $unnnic-spacing-inline-nano;
    }

    .u.font {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }

    .title {
      max-width: fit-content;
    }
  }

  .content {
    display: flex;
    column-gap: $unnnic-spacing-inline-xl;

    .item {
      display: flex;
      column-gap: $unnnic-spacing-inline-xs;
    }
  }
}
</style>
