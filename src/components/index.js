import Vue from 'vue';
import input from './Input/Input.vue';
import button from './Button/Button.vue';
import sidebar from './Sidebar/Sidebar.vue';
import sidebarItem from './Sidebar/SidebarItem.vue';
import sidebarMenu from './Sidebar/SidebarMenu.vue';
import dropdown from './Dropdown/Dropdown.vue';
import dropdownItem from './Dropdown/DropdownItem.vue';
import icon from './Icon.vue';
import toolTip from './ToolTip/ToolTip.vue';
import card from './Card/Card.vue';
import languageSelect from './Dropdown/LanguageSelect.vue';
import modal from './Modal/Modal.vue';
import alert from '../utils/alert';

const components = {
  unnnicInput: input,
  unnnicButton: button,
  unnnicSidebar: sidebar,
  unnnicSidebarItem: sidebarItem,
  unnnicSidebarMenu: sidebarMenu,
  unnnicIcon: icon,
  unnnicDropdown: dropdown,
  unnnicDropdownItem: dropdownItem,
  unnnicToolTip: toolTip,
  unnnicCard: card,
  unnnicLanguageSelect: languageSelect,
  unnnicModal: modal,
};

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name]);
});

export const unnnicInput = input;
export const unnnicButton = button;
export const unnnicSidebar = sidebar;
export const unnnicSidebarItem = sidebarItem;
export const unnnicSidebarMenu = sidebarMenu;
export const unnnicDropdown = dropdown;
export const unnnicDropdownItem = dropdownItem;
export const unnnicIcon = icon;
export const unnnicToolTip = toolTip;
export const unnnicCard = card;
export const unnniclanguageSelect = languageSelect;
export const unnnicModal = modal;
export const unnnicCallAlert = alert.callAlert;
