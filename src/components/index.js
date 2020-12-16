import Vue from 'vue';
import UnnicInput from './Input/Input.vue';
import UnnicButton from './Button/Button.vue';

const components = {
  UnnicInput,
  UnnicButton,
};

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name]);
});

export default components;
