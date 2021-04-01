import SidebarPrimary from '../components/Sidebar/SidebarPrimary.vue';

export default {
  title: 'example/SidebarPrimary',
  component: SidebarPrimary,
  argTypes: {
    hideExpandButton: { control: { type: 'boolean' } },
    expanded: { control: { type: 'boolean' } },
    items: { control: { type: 'array' } },
    hideText: { control: { type: 'text' } },
    language: { control: { type: 'select', options: ['pt-br', 'en'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    SidebarPrimary,
  },
  template: `
    <sidebar-primary v-bind="$props" style="min-height: 300px;">
      <template v-slot:header>
        Header
      </template>
    </sidebar-primary>
  `,
});

export const Normal = Template.bind({});

Normal.args = {
  expanded: true,
  language: 'pt-br',
  hideText: 'Encolher',
  items: [{
    label: 'Menu principal',
    items: [{
      label: 'Início',
      active: true,
      icon: 'house-1-1',
      // eslint-disable-next-line no-param-reassign
      click(option) { option.active = !option.active; },
    }],
  }, {
    label: 'Sistemas',
    items: [{
      label: 'Fluxos',
      active: false,
      icon: 'hierarchy-3-2',
      click() {},
    }, {
      label: 'Inteligência Artificial',
      active: false,
      icon: 'science-fiction-robot-2',
      click() {},
    }, {
      label: 'Agentes',
      active: false,
      icon: 'messaging-we-chat-3',
      click() {},
    }],
  }, {
    label: 'Perfil',
    items: [{
      label: 'Conta',
      active: false,
      icon: 'single-neutral-actions-1',
      click() {},
    }],
  }],
};
