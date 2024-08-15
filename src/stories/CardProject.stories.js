import UnnnicCardProject from '../components/CardProject/CardProject.vue';
import UnnnicDropdownItem from '../components/Dropdown/DropdownItem.vue';
import UnnnicIcon from '../components/Icon.vue';

export default {
  title: 'Data Display/CardProject',
  component: UnnnicCardProject,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => ({
    components: {
      UnnnicCardProject,
      UnnnicDropdownItem,
      UnnnicIcon,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        value: true,
      };
    },
    template: `
      <div>
      <unnnic-card-project v-bind="args">
        <template #actions>
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
  }),
};

export const Default = {
  args: {
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
  },
};
