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
              icon="info"
              :size="size === 'sm' ? 'xs' : 'sm'"
              filled
              scheme="neutral-cleanest"
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
      this.localValue = value;
      this.$emit('change', this.localValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.tab-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  color: $unnnic-color-neutral-cloudy;
  font-family: $unnnic-font-family-secondary;
  font-weight: $unnnic-font-weight-bold;
  font-size: $unnnic-font-size-body-lg;
  line-height: ($unnnic-font-size-body-lg + $unnnic-line-height-medium);
  margin-bottom: $unnnic-inset-sm;
  border-bottom: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
}

.tab-content {
  display: flex;
  gap: $unnnic-spacing-sm;

  margin: 0;
  padding: 0;
  list-style: none;
}

.tab-head {
  display: flex;
  gap: $unnnic-spacing-xs;
  align-items: center;

  cursor: pointer;
  margin: $unnnic-spacing-xs $unnnic-spacing-sm;

  .unnnic-tooltip {
    display: flex;
  }

  &:hover {
    color: $unnnic-color-neutral-black;
  }
}

.tab-head--active {
  font-family: $unnnic-font-family-secondary;
  font-weight: $unnnic-font-weight-bold;
  color: $unnnic-color-neutral-black;
  font-size: $unnnic-font-size-body-lg;
  line-height: ($unnnic-font-size-body-lg + $unnnic-line-height-medium);
  transition: 0.4s;

  position: relative;

  &::after {
    content: '';

    position: absolute;
    bottom: -$unnnic-spacing-xs;
    left: -$unnnic-spacing-sm;

    display: block;

    width: calc(100% + (#{$unnnic-spacing-sm} * 2));

    border-bottom: $unnnic-border-width-thin solid $unnnic-color-weni-600;
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
