import Vue from 'vue';
import UnnicTextInput from './Input/Input.vue';
import UnnicPasswordInput from './Input/PasswordInput.vue';

const components = {
  UnnicTextInput,
  UnnicPasswordInput,
};

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name]);
});

export default components;
