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
      <div style="max-width: 400px">
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

const args = {
  name: 'Nome do Projeto',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum cursus finibus. Sed consectetur aliquet ipsum, eu blandit lorem imperdiet non. Donec sodales eros nec orci placerat, eget condimentum mauris fermentum. Curabitur ullamcorper maximus elit, id lacinia nisl consequat non. Maecenas porttitor vitae arcu id eleifend. Etiam libero nisi, volutpat vitae ultricies nec, convallis sed libero. Donec pulvinar ligula augue. Pellentesque felis augue, viverra eget ex a, dictum porttitor enim. Phasellus tincidunt massa sit amet eros interdum elementum',
  status: 'active',
  canUpdateStatus: false,
};

export const Active = {
  args,
};

export const Inactive = {
  args: { ...args, status: 'inactive' },
};

export const InTest = {
  args: { ...args, status: 'in-test' },
};

export const CanUpdateStatus = {
  args: { ...args, canUpdateStatus: true },
};

export const Clickable = {
  args: { ...args, clickable: true },
};
