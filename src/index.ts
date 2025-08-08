import { App, defineAsyncComponent } from 'vue';

const Icon = defineAsyncComponent(
  () => import('./components/Icon.vue'),
);

const components = {
  Icon,
};

export { Icon };

export default {
  install(app: App) {
    for (const component in components) {
      app.component(
        component,
        components[component as keyof typeof components],
      );
    }
  },
}; 