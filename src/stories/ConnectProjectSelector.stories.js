import UnnnicConnectProjectSelector from '../components/ConnectProjectSelector/ConnectProjectSelector.vue';

export default {
  title: 'Connect/ProjectSelector',
  component: UnnnicConnectProjectSelector,
  argTypes: {
    size: {
      env: {
        type: 'select',
        options: ['develop', 'staging', 'production'],
      },
    },

    selectProject: {
      action: 'select-project',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    UnnnicConnectProjectSelector,
  },

  data() {
    return {
      pageInside: '',
      projectUuidInside: '',
    };
  },

  template: `
    <div>
      <pre>page: {{ pageInside }}
projectUuid: {{ projectUuidInside }}</pre>
      <button @click="pageInside = 'orgs'">Go back</button>
      <unnnic-connect-project-selector v-bind="$props" :page.sync="pageInside" :project-uuid.sync="projectUuidInside">
      </unnnic-connect-project-selector>
    </div>
  `,
});

export const Default = Template.bind({});

Default.args = {
  env: 'develop',
  authentication: 'Bearer Token',
};
