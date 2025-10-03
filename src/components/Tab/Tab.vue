<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="['tab', `size-${size}`]">
    <header class="tab-header">
      <ul class="tab-content">
        <li
          v-for="tab in tabs"
          :key="tab"
          class="tab-head"
          :class="{
            'tab-head--active': localValue === tab,
            'tab-head--disabled': disabledTabs?.includes(tab),
          }"
          @click="change(tab)"
        >
          <slot :name="tabHeadSlotName(tab)">{{ tab }} </slot>
          <UnnnicToolTip
            v-if="getHeadTooltip(tab)"
            enabled
            :text="getHeadTooltip(tab)"
            side="bottom"
          >
            <UnnnicIcon
              icon="help"
              size="sm"
              scheme="fg-base"
            />
          </UnnnicToolTip>
        </li>
      </ul>
    </header>
    <main class="tab-body">
      <div class="tab-panel"><slot :name="tabPanelSlotName"> </slot></div>
    </main>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';

export default {
  components: {
    UnnnicIcon,
    UnnnicToolTip,
  },
  model: {
    prop: 'activeTab',
    event: 'change',
  },
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (size) => ['md', 'sm'].includes(size),
    },
    activeTab: {
      type: String,
      default: '',
    },
    initialTab: {
      type: String,
      default: null,
    },
    tabs: {
      type: Array,
      default: null,
      validator: (tabs) => {
        return tabs.every((tab) => typeof tab === 'string') && tabs.length <= 5;
      },
    },
    disabledTabs: {
      type: Array,
      default: null,
    },
  },
  emits: ['change'],
  data() {
    return {
      localValue: '',
    };
  },
  computed: {
    tabPanelSlotName() {
      return `tab-panel-${this.localValue}`;
    },
  },
  watch: {
    activeTab() {
      this.localValue = this.activeTab;
    },
  },
  created() {
    const value =
      this.initialTab || this.activeTab || (this.tabs && this.tabs[0]);

    this.change(value);
  },
  methods: {
    tabHeadSlotName(tabName) {
      return `tab-head-${tabName}`;
    },
    tabHeadTooltipSlotName(tabName) {
      return tabName ? `tab-head-${tabName}-tooltip` : '';
    },
    getHeadTooltip(tabName) {
      const tooltipSlot = this.$slots[this.tabHeadTooltipSlotName(tabName)];

      if (tooltipSlot) {
        return tooltipSlot()?.[0]?.children;
      }
      return '';
    },
    change(value) {
      if (this.disabledTabs?.includes(value)) {
        return;
      }

      this.localValue = value;
      this.$emit('change', this.localValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.tab-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  color: $unnnic-color-fg-base;
  font: $unnnic-font-action;
  margin-bottom: $unnnic-space-4;
  border-bottom: $unnnic-border-width-thinner solid $unnnic-color-border-base;
}

.tab-content {
  display: flex;
  gap: $unnnic-space-6;

  margin: 0;
  padding: 0;
  list-style: none;
}

.tab-head {
  display: flex;
  gap: $unnnic-space-2;
  align-items: center;

  cursor: pointer;
  padding: $unnnic-space-2 $unnnic-space-4;

  .unnnic-tooltip {
    display: flex;
  }

  &:hover {
    color: $unnnic-color-fg-emphasized;
  }
}

.tab-head--active {
  color: $unnnic-color-fg-emphasized;
  font: $unnnic-font-action;
  transition: 0.4s;

  position: relative;

  &::after {
    content: '';

    position: absolute;
    bottom: 0;
    left: 0;

    display: block;

    width: 100%;

    border-bottom: $unnnic-border-width-thin solid $unnnic-color-border-active;
  }
}

.tab-head--disabled {
  color: $unnnic-color-fg-muted;
  cursor: default;

  &:hover {
    color: $unnnic-color-fg-muted;
  }
}

.tab.size-sm {
  .tab-header {
    margin-bottom: $unnnic-spacing-stack-xs;

    .tab-head,
    .tab-head--active {
      font-size: $unnnic-font-size-body-md;
      line-height: ($unnnic-font-size-body-md + $unnnic-line-height-md);
    }
  }
}
</style>
