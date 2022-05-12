import unnnicCardProject from '../components/CardProject/CardProject.vue';
import unnnicDropdownItem from '../components/Dropdown/DropdownItem.vue';
import unnnicIcon from '../components/Icon.vue';

export default {
  title: 'example/CardProject',
  component: unnnicCardProject,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicCardProject,
    unnnicDropdownItem,
    unnnicIcon,
  },

  data() {
    return {};
  },

  template: `
    <div>
      <unnnic-card-project v-bind="$props">
        <template slot="actions">
          <unnnic-dropdown-item>
            <unnnic-icon size="sm" icon="cog-1" />
            Configuração
          </unnnic-dropdown-item>

          <unnnic-dropdown-item>
            <unnnic-icon size="sm" icon="single-neutral-actions-1" />
            Gerenciar membros
          </unnnic-dropdown-item>
        </template>
      </unnnic-card-project>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  name: 'Nome do Projeto',
  actionText: 'Entrar',
  statuses: [
    {
      title: 'AI',
      icon: 'science-fiction-robot-2',
      scheme: 'aux-blue',
      count: 1,
    },
    {
      title: 'Flows',
      icon: 'hierarchy-3-2',
      scheme: 'aux-purple',
      count: 2,
    },
    {
      title: 'Contatos',
      icon: 'single-neutral-actions-1',
      scheme: 'aux-lemon',
      count: 3,
    },
  ],
};
