import Vue from 'vue';
import UnnicInput from './Input/Input.vue';
import UnnicButton from './Button/Button.vue';
import UnnicSidebar from './Sidebar/Sidebar.vue';
import UnnicSidebarItem from './Sidebar/SidebarItem.vue';
import UnnicSidebarMenu from './Sidebar/SidebarMenu.vue';
import UnnicDropdown from './Dropdown/Dropdown.vue';
import UnnicDropdownItem from './Dropdown/DropdownItem.vue';
import UnnicIcon from './Icon.vue';
import UnnicToolTip from './ToolTip/ToolTip.vue';
import UnnicCard from './Card/Card.vue';
import UnnicLanguageSelect from './Dropdown/LanguageSelect.vue';
import UnnicModal from './Modal/Modal.vue';
import alert from '../utils/alert';

const components = {
  UnnicInput,
  UnnicButton,
  UnnicSidebar,
  UnnicSidebarItem,
  UnnicSidebarMenu,
  UnnicIcon,
  UnnicDropdown,
  UnnicDropdownItem,
  UnnicToolTip,
  UnnicCard,
  UnnicLanguageSelect,
  UnnicModal,
};

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name]);
});

export default { ...components, callAlert: alert.callAlert };
