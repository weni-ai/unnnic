// Sobrescreve tipos problemáticos do @vueuse/components
declare module '@vueuse/components' {
  export interface OnClickOutsideOptions {
    [key: string]: any;
  }
  
  export const vOnClickOutside: any;
} 