import Vue from 'vue';
import UnnicInput from './Input/Input.vue';
import UnnicButton from './Button/Button.vue';
import UnnicSidebar from './Sidebar/Sidebar.vue'

const components = {
  UnnicInput,
  UnnicButton,
  UnnicSidebar,
};

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name]);
});

export default components;
