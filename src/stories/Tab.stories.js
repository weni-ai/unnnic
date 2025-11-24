import unnnicTab from '../components/Tab/Tab.vue';

export default {
  title: 'tabs/Tab',
  component: unnnicTab,
  render: (args) => ({
    components: {
      unnnicTab,
    },
    setup() {
      return { args };
    },
    template: `
      <unnnic-tab v-bind="args">
        <template #tab-head-first>
          First
        </template>
        <template #tab-head-first-tooltip>
          Tooltip text
        </template>
        <template #tab-panel-first>
          <h2 class="title">First Content</h2>
          <p class="description">
          First description
          </p>
        </template>
        <template #tab-head-second>
          Second
        </template>
        <template #tab-panel-second>
          <h2 class="title">Second Content</h2>
          <p class="description">
            Second description
          </p>
        </template>
        <template #tab-head-third>
          Third
        </template>
        <template #tab-panel-third>
          <h2 class="title">Third Content</h2>
          <p class="description">
            Third description
          </p>
        </template>
      </unnnic-tab>
    `,
  }),
};

export const Default = {
  args: {
    initialTab: 'first',
    tabs: ['first', 'second', 'third'],
    disabledTabs: ['third'],
  },
};
