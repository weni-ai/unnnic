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
      organizationUuidInside: '',
      projectUuidInside: '',
      organizationsItemsInside: [],
      projectsItemsInside: [],
    };
  },

  template: `
    <div>
      <pre>organizationUuid: {{ organizationUuidInside }}
projectUuid: {{ projectUuidInside }}
organizationItems.slice(0, 1): {{ organizationsItemsInside.slice(0, 1) }}
projectsItems.slice(0, 1): {{ projectsItemsInside.slice(0, 1) }}</pre>
      <button @click="organizationUuidInside = ''">Go back</button>
      <unnnic-connect-project-selector
        v-bind="$props"
        :organizationUuid.sync="organizationUuidInside"
        :projectUuid.sync="projectUuidInside"
        :organizationsItems.sync="organizationsItemsInside"
        :projectsItems.sync="projectsItemsInside"
      >
        <template slot="subtitle">Escolha uma para acessar o Weni Chats</template>
      </unnnic-connect-project-selector>
    </div>
  `,
});

export const Default = Template.bind({});

Default.args = {
  env: 'develop',
  authorization: 'Bearer Token',
};
