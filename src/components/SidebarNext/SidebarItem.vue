<template>
  <section
    :class="{ 'unnnic-sidebar-item': true, active: active.item }"
    @click.stop="hasChildren ? handleShowChildrenList() : handleEmitNavigate()"
  >
    <Icon
      v-if="item.icon"
      class="unnnic-sidebar-item__icon"
      :icon="item.icon"
      size="ant"
      :scheme="active.item ? 'weni-600' : 'neutral-cloudy'"
    />
    <p :class="{ 'unnnic-sidebar-item__label': true, active: active.item }">
      {{ item.label }}
    </p>
    <Icon
      v-if="item.children?.length"
      class="unnnic-sidebar-item__arrow"
      :icon="showChildrenList ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
      size="ant"
      scheme="neutral-cloudy"
    />
  </section>
  <Transition name="slide-fade">
    <ul
      v-if="showChildrenList"
      class="unnnic-sidebar-item-children"
    >
      <li
        v-for="(child, index) in item.children"
        :key="child"
        :class="{
          'unnnic-sidebar-item-child': true,
          active: active.item && index === active.childIndex,
        }"
        @click.stop="
          !(active.item && index === active.childIndex) &&
            emit('navigate', { item, child })
        "
      >
        <Icon
          v-if="child.icon"
          class="unnnic-sidebar-item-child__icon"
          :icon="child.icon"
          size="ant"
          :scheme="
            active.item && index === active.childIndex
              ? 'weni-600'
              : 'neutral-cloudy'
          "
        />
        <p
          :class="{
            'unnnic-sidebar-item-child__label': true,
            active: active.item && index === active.childIndex,
          }"
        >
          {{ child.label }}
        </p>
      </li>
    </ul>
  </Transition>
</template>

<script>
export default {
  name: 'UnnnicSidebarItem',
};
</script>

<script setup>
import { computed, onMounted, ref } from 'vue';
import Icon from '../Icon.vue';

const { item, active } = defineProps({
  item: {
    type: Object,
    required: true,
  },
  active: {
    type: Object,
    default: () => ({ item: false, childIndex: null }),
  },
});

onMounted(() => {
  if (
    typeof active.childIndex === 'number' &&
    active.childIndex >= 0 &&
    active.item
  ) {
    handleShowChildrenList();
  }
});

const hasChildren = computed(() => {
  return item.children?.length;
});

const showChildrenList = ref(false);

const handleShowChildrenList = () => {
  showChildrenList.value = !showChildrenList.value;
};

const handleEmitNavigate = () => {
  if (!item.active) emit('navigate', { item, child: null });
};

const emit = defineEmits(['navigate']);
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.unnnic-sidebar-item {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: $unnnic-spacing-xs;
  padding: $unnnic-spacing-xs;
  cursor: pointer;

  &.active {
    border-radius: 4px;
    background-color: $unnnic-color-neutral-light;
  }

  &__label {
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */

    color: $unnnic-color-neutral-cloudy;

    &.active {
      font-family: Lato;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px; /* 157.143% */
      color: $unnnic-color-neutral-darkest;
    }
  }

  &__arrow {
    display: flex;
    margin-left: auto;
  }

  &-children {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-left: $unnnic-spacing-ant;
    margin-top: $unnnic-spacing-nano;
    gap: $unnnic-spacing-xs;
  }

  &-child {
    padding: $unnnic-spacing-nano $unnnic-spacing-xs;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: $unnnic-spacing-xs;

    &.active {
      border-radius: 4px;
      background-color: $unnnic-color-neutral-light;
    }
    &__label {
      /* Lato / Regular / Body Greater */
      font-family: Lato;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
      color: $unnnic-color-neutral-cloudy;

      &.active {
        overflow: hidden;
        color: $unnnic-color-neutral-dark;
        text-overflow: ellipsis;
        /* Lato / Bold / Body Greater */
        font-family: Lato;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 22px; /* 157.143% */
      }
    }
  }
}
</style>
