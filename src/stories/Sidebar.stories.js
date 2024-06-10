/* eslint-disable no-multi-str */

import UnnnicSidebar from '../components/Sidebar/Sidebar.vue';
import UnnnicSidebarItem from '../components/Sidebar/SidebarItem.vue';
import UnnnicSidebarMenu from '../components/Sidebar/SidebarMenu.vue';

export default {
  title: 'Example/Sidebar',
  component: UnnnicSidebar,
  argTypes: {
    expanded: { control: { type: 'boolean' } },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicSidebar, UnnnicSidebarItem, UnnnicSidebarMenu },
    template: `
      <unnnic-sidebar v-bind="args">
        <template #header>
          <p> Title </p>
        </template>
        <template #footer>
          <unnnic-sidebar-item icon="expand-8-1" text="footer" />
        </template>
        <unnnic-sidebar-menu text="Submenu">
          <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item1" icon="developer-community-github-1-1" :active="true" /> \
          <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item2" icon="alarm-bell-2" />
        </unnnic-sidebar-menu>
        <unnnic-sidebar-menu text="Submenu 2">
          <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item3" icon="alarm-bell-2" />
        </unnnic-sidebar-menu>
      </unnnic-sidebar>
    `,
  }),
};

export const Expanded = { args: {} };

export const Contracted = { args: { expanded: false } };
