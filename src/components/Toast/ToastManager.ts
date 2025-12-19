import { createApp } from 'vue';
import { getTeleportContainer } from '@/lib/teleport-target';
import Toast from './Toast.vue';
import type {
  ToastProps,
  ToastInstance,
  ToastOptions,
  ToastCall,
} from './types';

class ToastManager implements ToastManager {
  private toasts: Map<string, ToastInstance> = new Map();
  private container: HTMLElement | null = null;
  private nextId = 0;

  private createContainer(): HTMLElement {
    if (this.container) {
      return this.container;
    }

    this.container = document.createElement('div');
    this.container.setAttribute('unnnic-toast-container', 'true');

    const host = getTeleportContainer() ?? document.body;
    host?.appendChild(this.container);

    return this.container;
  }

  private generateId(): string {
    return `toast-${++this.nextId}`;
  }

  show(props: ToastProps): ToastInstance {
    const id = this.generateId();
    const container = this.createContainer();

    const toastWrapper = document.createElement('div');

    // Create promise that resolves when toast is destroyed
    let resolvePromise: () => void;
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });

    const app = createApp(Toast, {
      ...props,
      onClose: () => {
        this.close(id);
      },
      onDestroy: () => {
        app.unmount();
        toastWrapper.remove();
        resolvePromise(); // Resolve the promise when toast is destroyed
      },
    });

    app.mount(toastWrapper);
    container.appendChild(toastWrapper);

    const toastInstance: ToastInstance = {
      id,
      props,
      close: () => this.close(id),
      promise,
    };

    this.toasts.set(id, toastInstance);
    return toastInstance;
  }

  close(id: string): void {
    const toast = this.toasts.get(id);
    if (toast) {
      this.toasts.delete(id);
    }
  }
}

const toastManager = new ToastManager();

export const toast: ToastCall = {
  info: (title: string, description?: string, options?: ToastOptions) =>
    toastManager.show({
      title,
      description,
      ...options,
      type: 'informational',
    }).promise,
  success: (title: string, description?: string, options?: ToastOptions) =>
    toastManager.show({
      title,
      description,
      ...options,
      type: 'success',
    }).promise,
  attention: (title: string, description?: string, options?: ToastOptions) =>
    toastManager.show({
      title,
      description,
      ...options,
      type: 'attention',
    }).promise,
  error: (title: string, description?: string, options?: ToastOptions) =>
    toastManager.show({
      title,
      description,
      ...options,
      type: 'error',
    }).promise,
};

export default toastManager;
