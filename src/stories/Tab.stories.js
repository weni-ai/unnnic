import unnnicTab from '../components/Tab/Tab.vue';

export default {
  title: 'Example/Tab',
  component: unnnicTab,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicTab },
  template: `
  <unnnic-tab v-bind="$props">
      <template slot="tab-head-first">
        First
      </template>
      <template slot="tab-panel-first">
        <h2 class="title">First Content</h2>
        <p class="description">
        First description
        </p>
      </template>
      <template slot="tab-head-second">
        Second
      </template>
      <template slot="tab-panel-second">
        <h2 class="title">Second Content</h2>
        <p class="description">
          Second description
        </p>
      </template>
  </unnnic-tab>
  `,
});

export const Default = Template.bind({});
Default.args = {
  initialTab: 'first',
  tabs: ['first', 'second'],
};
