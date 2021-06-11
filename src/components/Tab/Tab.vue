<template>
  <div class="tab">
    <header class="tab-header">
      <ul class="tab-content">
        <li
          class="tab-head"
          v-for="tab in tabs"
          :key="tab"
          v-bind:class="{
            'tab-head--active': activeTab === tab,
          }"
          @click="switchTab(tab)"
        >
          <slot :name="tabHeadSlotName(tab)">{{ tab }} </slot>
        </li>
      </ul>
    </header>
    <main class="tab-body">
      <div class="tab-panel"><slot :name="tabPanelSlotName"> </slot></div>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    initialTab: {
      type: String,
      default: null,
    },
    tabs: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      activeTab: this.initialTab,
    };
  },
  computed: {
    tabPanelSlotName() {
      return `tab-panel-${this.activeTab}`;
    },
  },
  methods: {
    tabHeadSlotName(tabName) {
      return `tab-head-${tabName}`;
    },
    switchTab(tabName) {
      this.activeTab = tabName;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.tab-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  color: $unnnic-color-neutral-clean;
  font-family: $unnnic-font-family-secondary;
  font-weight: $unnnic-font-weight-bold;
  font-size: $unnnic-font-size-body-lg;
  line-height: ($unnnic-font-size-body-lg + $unnnic-line-height-medium);
  padding-bottom: $unnnic-inset-sm;
  border-bottom: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
}

.tab-content {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tab-head {
  cursor: pointer;
  margin-right: $unnnic-inset-md;
}

.tab-head--active {
  font-family: $unnnic-font-family-secondary;
  font-weight: $unnnic-font-weight-bold;
  color: $unnnic-color-neutral-darkest;
  font-size: $unnnic-font-size-body-lg;
  line-height: ($unnnic-font-size-body-lg + $unnnic-line-height-medium);
  transition: 0.4s;
}
</style>
