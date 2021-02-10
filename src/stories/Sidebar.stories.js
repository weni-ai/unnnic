import unnnicSidebar from '../components/Sidebar/Sidebar.vue';
import unnnicSidebarItem from '../components/Sidebar/SidebarItem.vue';
import unnnicSidebarMenu from '../components/Sidebar/SidebarMenu.vue';

export default {
  title: 'Example/Sidebar',
  component: unnnicSidebar,
  argTypes: {
    expanded: { control: { type: 'select', options: [true, false] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSidebar, unnnicSidebarItem, unnnicSidebarMenu },
  template: '<unnnic-sidebar v-bind="$props"> \
                <p slot="header"> Title </p> \
                <unnnic-sidebar-item icon="expand-8-1" text="footer" slot="footer" /> \
                <unnnic-sidebar-menu text="Submenu"> \
                  <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item1" icon="developer-community-github-1-1" :active="true" /> \
                  <unnnic-sidebar-item text="Item2" icon="alarm-bell-2" /> \
                </unnnic-sidebar-menu> \
                <unnnic-sidebar-menu text="Submenu 2"> \
                  <unnnic-sidebar-item text="Item3" icon="alarm-bell-2" /> \
                </unnnic-sidebar-menu> \
              </unnnic-sidebar>',
});

export const Expanded = Template.bind({});
Expanded.args = {};

export const Contracted = Template.bind({});
Contracted.args = {
  expanded: false,
};
