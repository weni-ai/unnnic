import { action } from 'storybook/actions';
import UnnnicTabsExpanded from '../components/TabsExpanded/TabsExpanded.vue';

export default {
  title: 'tabs/TabsExpanded',
  component: UnnnicTabsExpanded,
  argTypes: {},
  render: (args) => ({
    setup() {
      return { args };
    },
    components: {
      UnnnicTabsExpanded,
    },

    data() {
      return {
        v: 'uuid2',
        lItems: [],
      };
    },

    created() {
      this.lItems = args.items;
    },

    methods: {
      lCloseTab(tab) {
        const index = this.lItems.findIndex(({ value }) => value === tab.value);

        this.lItems.splice(index, 1);

        this.v = this.lItems[index]?.value || this.lItems[index - 1]?.value;
      },
    },

    template:
      '<div><pre>v-model: {{ v }}</pre><unnnic-tabs-expanded  v-bind="args" v-model="v" @close-tab="lCloseTab"></unnnic-tabs-expanded></div>',
  }),
  args: {
    onBack: action('@back'),
    onAdd: action('@add'),
    onCloseTab: action('@close-tab'),
    items: [
      {
        title: 'Suporte',
        description: 'Última edição há 5 minutos',
        value: 'uuid1',
      },
      {
        title: 'Boas vindas',
        description: 'Última edição agora há pouco',
        value: 'uuid2',
      },
      {
        title: 'Atendimento',
        description: 'Última edição em 4 de janeiro',
        value: 'uuid3',
      },
      {
        title: 'Texto grande texto grande texto grande',
        description: 'Texto grande texto grande texto grande',
        value: 'uuid4',
      },
    ],
  },
};

export const Default = {};
