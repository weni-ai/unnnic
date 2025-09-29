export interface ToastButton {
  text: string;
  action: () => void;
}

export type ToastType = 'informational' | 'attention' | 'success' | 'error';

export interface ToastProps extends ToastOptions {
  title: string;
  description?: string;
}

export interface ToastOptions {
  type?: ToastType;
  button?: ToastButton;
  timeout?: number;
}

export interface ToastEmits {
  close: [];
  destroy: [];
}

export interface ToastInstance {
  id: string;
  props: ToastProps;
  close: () => void;
  promise: Promise<void>;
}
