import type { App } from 'vue';
import { components } from '@/components';

interface UnnnicPlugin {
  install(app: App): void;
  [key: string]: any;
}

const Unnnic: UnnnicPlugin = {
  install(app: App) {
    Object.keys(components).forEach((name) => {
      app.component(name, components[name] as any);
    });
  },
  ...components,
};

export default Unnnic;
export * from '@/components';
