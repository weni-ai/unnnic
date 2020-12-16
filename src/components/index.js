import Vue from 'vue';
import UnnicInput from './Input/Input.vue';

const components = {
  UnnicInput,
};

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name]);
});

export default components;
