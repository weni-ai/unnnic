import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    createApp: vi.fn(() => ({
      mount: vi.fn(),
      unmount: vi.fn(),
    })),
  };
});

vi.mock('../Toast.vue', () => ({
  default: {
    name: 'Toast',
    template: '<div data-testid="toast">Mock Toast</div>',
  },
}));

import toastManager, { toast } from '../ToastManager';
import Toast from '../Toast.vue';

describe('ToastManager', () => {
  let mockCreateApp;
  let mockMount;
  let mockUnmount;

  beforeEach(async () => {
    vi.clearAllMocks();

    document.body.innerHTML = '';

    const { createApp } = await import('vue');
    mockCreateApp = createApp;
    mockMount = vi.fn();
    mockUnmount = vi.fn();

    mockCreateApp.mockReturnValue({
      mount: mockMount,
      unmount: mockUnmount,
    });

    Object.defineProperty(globalThis, 'document', {
      value: {
        ...document,
        createElement: vi.fn((tagName) => {
          const element = {
            tagName: tagName.toUpperCase(),
            setAttribute: vi.fn(),
            appendChild: vi.fn(),
            remove: vi.fn(),
            children: [],
            parentNode: null,
          };

          if (tagName === 'div') {
            element.appendChild = vi.fn((child) => {
              child.parentNode = element;
              element.children.push(child);
            });
          }

          return element;
        }),
        body: {
          ...document.body,
          appendChild: vi.fn(),
        },
      },
      writable: true,
    });
  });

  afterEach(() => {
    if (toastManager.toasts) {
      toastManager.toasts.clear();
    }

    document.body.innerHTML = '';

    vi.clearAllMocks();
  });

  describe('Container Management', () => {
    test('creates container on first toast', () => {
      const createElementSpy = vi.spyOn(document, 'createElement');
      const appendChildSpy = vi.spyOn(document.body, 'appendChild');

      toastManager.show({ title: 'Test Toast' });

      expect(createElementSpy).toHaveBeenCalledWith('div');
      expect(appendChildSpy).toHaveBeenCalled();
    });

    test('reuses existing container', () => {
      const createElementSpy = vi.spyOn(document, 'createElement');

      toastManager.show({ title: 'First Toast' });
      const firstCallCount = createElementSpy.mock.calls.length;

      toastManager.show({ title: 'Second Toast' });
      const secondCallCount = createElementSpy.mock.calls.length;

      // First toast: container div + wrapper div = 2 calls
      // Second toast: only wrapper div = 1 more call
      // Total: 3 calls (1 container + 2 wrappers)
      expect(secondCallCount).toBe(firstCallCount + 1);

      expect(createElementSpy).toHaveBeenCalledWith('div');
    });
  });

  describe('Toast Instance Management', () => {
    test('generates unique IDs for toasts', () => {
      const toast1 = toastManager.show({ title: 'First Toast' });
      const toast2 = toastManager.show({ title: 'Second Toast' });

      expect(toast1.id).not.toBe(toast2.id);
      expect(toast1.id).toMatch(/^toast-\d+$/);
      expect(toast2.id).toMatch(/^toast-\d+$/);
    });

    test('stores toast instances in map', () => {
      const toast1 = toastManager.show({ title: 'First Toast' });
      const toast2 = toastManager.show({ title: 'Second Toast' });

      expect(toastManager.toasts.has(toast1.id)).toBe(true);
      expect(toastManager.toasts.has(toast2.id)).toBe(true);
      expect(toastManager.toasts.size).toBe(2);
    });

    test('creates toast with correct props', () => {
      const props = {
        title: 'Test Toast',
        description: 'Test Description',
        type: 'success',
        timeout: 3000,
      };

      toastManager.show(props);

      expect(mockCreateApp).toHaveBeenCalledWith(
        Toast,
        expect.objectContaining({
          title: 'Test Toast',
          description: 'Test Description',
          type: 'success',
          timeout: 3000,
          onClose: expect.any(Function),
          onDestroy: expect.any(Function),
        }),
      );
    });

    test('mounts toast app to wrapper element', () => {
      toastManager.show({ title: 'Test Toast' });

      expect(mockMount).toHaveBeenCalled();
    });
  });

  describe('Toast Close Functionality', () => {
    test('removes toast from map when closed', () => {
      const toastInstance = toastManager.show({ title: 'Test Toast' });

      expect(toastManager.toasts.has(toastInstance.id)).toBe(true);

      toastManager.close(toastInstance.id);

      expect(toastManager.toasts.has(toastInstance.id)).toBe(false);
    });

    test('handles closing non-existent toast gracefully', () => {
      expect(() => {
        toastManager.close('non-existent-id');
      }).not.toThrow();
    });

    test('calls close when onClose is triggered', () => {
      const closeSpy = vi.spyOn(toastManager, 'close');

      toastManager.show({ title: 'Test Toast' });

      const createAppCall = mockCreateApp.mock.calls[0];
      const props = createAppCall[1];
      const onCloseCallback = props.onClose;

      onCloseCallback();

      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('Toast Destroy Functionality', () => {
    test('unmounts app and removes wrapper on destroy', () => {
      toastManager.show({ title: 'Test Toast' });

      const createAppCall = mockCreateApp.mock.calls[0];
      const props = createAppCall[1];
      const onDestroyCallback = props.onDestroy;

      onDestroyCallback();

      expect(mockUnmount).toHaveBeenCalled();
    });

    test('resolves promise when toast is destroyed', async () => {
      const toastInstance = toastManager.show({ title: 'Test Toast' });

      const createAppCall = mockCreateApp.mock.calls[0];
      const props = createAppCall[1];
      const onDestroyCallback = props.onDestroy;

      const promiseResolved = vi.fn();
      toastInstance.promise.then(promiseResolved);

      onDestroyCallback();

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(promiseResolved).toHaveBeenCalled();
    });
  });

  describe('Toast API', () => {
    beforeEach(() => {
      vi.spyOn(toastManager, 'show').mockReturnValue({
        id: 'mock-id',
        props: {},
        close: vi.fn(),
        promise: Promise.resolve(),
      });
    });

    test('toast.info creates informational toast', () => {
      toast.info('Info Title', 'Info Description', { timeout: 1000 });

      expect(toastManager.show).toHaveBeenCalledWith({
        title: 'Info Title',
        description: 'Info Description',
        timeout: 1000,
        type: 'informational',
      });
    });

    test('toast.success creates success toast', () => {
      toast.success('Success Title', 'Success Description');

      expect(toastManager.show).toHaveBeenCalledWith({
        title: 'Success Title',
        description: 'Success Description',
        type: 'success',
      });
    });

    test('toast.attention creates attention toast', () => {
      toast.attention('Attention Title');

      expect(toastManager.show).toHaveBeenCalledWith({
        title: 'Attention Title',
        type: 'attention',
      });
    });

    test('toast.error creates error toast', () => {
      toast.error('Error Title', 'Error Description', {
        button: { text: 'Retry', action: vi.fn() },
      });

      expect(toastManager.show).toHaveBeenCalledWith({
        title: 'Error Title',
        description: 'Error Description',
        button: { text: 'Retry', action: expect.any(Function) },
        type: 'error',
      });
    });

    test('toast methods return promises', async () => {
      const infoPromise = toast.info('Test');
      const successPromise = toast.success('Test');
      const attentionPromise = toast.attention('Test');
      const errorPromise = toast.error('Test');

      expect(infoPromise).toBeInstanceOf(Promise);
      expect(successPromise).toBeInstanceOf(Promise);
      expect(attentionPromise).toBeInstanceOf(Promise);
      expect(errorPromise).toBeInstanceOf(Promise);

      await Promise.all([
        infoPromise,
        successPromise,
        attentionPromise,
        errorPromise,
      ]);
    });
  });
});
