import unnicSidebar from '../components/Sidebar/Sidebar.vue';
import unnicSidebarItem from '../components/Sidebar/SidebarItem.vue';
import unnicSidebarMenu from '../components/Sidebar/SidebarMenu.vue';

export default {
  title: 'Example/Sidebar',
  component: unnicSidebar,
  argTypes: {
    expanded: { control: { type: 'select', options: [true, false] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnicSidebar, unnicSidebarItem, unnicSidebarMenu },
  template: '<unnic-sidebar v-bind="$props"> \
                <h1 slot="header"> Title </h1> \
                <unnic-sidebar-item icon="expand-8-1" text="footer" slot="footer" /> \
                <unnic-sidebar-menu text="Submenu"> \
                  <unnic-sidebar-item text="Item1" icon="developer-community-github-1-1" :active="true" /> \
                  <unnic-sidebar-item text="Item2" icon="alarm-bell-2" /> \
                </unnic-sidebar-menu> \
                <unnic-sidebar-menu text="Submenu 2"> \
                  <unnic-sidebar-item text="Item3" icon="alarm-bell-2" /> \
                </unnic-sidebar-menu> \
              </unnic-sidebar>',
});

export const Expanded = Template.bind({});
Expanded.args = {};

export const Contracted = Template.bind({});
Contracted.args = {
  expanded: false,
};
