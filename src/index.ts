import type { App } from 'vue';
import { components } from '@/components';
import './assets/scss/tailwind.scss';
import { setTeleportTarget, type TeleportTarget } from '@/lib/teleport-target';

interface UnnnicPlugin {
  install(app: App, options?: UnnnicPluginOptions): void;
  [key: string]: any;
}

export interface UnnnicPluginOptions {
  teleportTarget?: TeleportTarget | null;
}

const Unnnic: UnnnicPlugin = {
  install(app: App, options?: UnnnicPluginOptions) {
    setTeleportTarget(options?.teleportTarget ?? null);

    Object.keys(components).forEach((name) => {
      app.component(name, components[name] as any);
    });
  },
  ...components,
};

export default Unnnic;
export * from '@/components';
