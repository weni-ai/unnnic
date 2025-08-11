import type { App, Component } from 'vue';

// Importar tipos específicos dos componentes
export type { IconProps } from '../components/Icon.vue';

// Interface para o plugin principal
export interface UnnnicPlugin {
  install(app: App): void;
  [key: string]: any;
}

// Interface para o mapa de componentes
export interface ComponentsMap {
  [key: string]: Component | Function;
}

// Export dos principais componentes e utilitários
export declare const components: ComponentsMap;

// Export individual dos componentes principais
export declare const unnnicButton: Component;
export declare const unnnicInput: Component;
export declare const unnnicCard: Component;
export declare const unnnicModal: Component;
export declare const unnnicIcon: Component;
export declare const unnnicDropdown: Component;
export declare const unnnicTable: Component;
export declare const unnnicPagination: Component;
export declare const unnnicAlert: Component;
export declare const unnnicCheckbox: Component;
export declare const unnnicRadio: Component;
export declare const unnnicSwitch: Component;
export declare const unnnicTextArea: Component;
export declare const unnnicTooltip: Component;
export declare const unnnicBreadcrumb: Component;
export declare const unnnicLabel: Component;
export declare const unnnicDatePicker: Component;
export declare const unnnicSelectSmart: Component;
export declare const unnnicMultiSelect: Component;
export declare const unnnicTag: Component;
export declare const unnnicTab: Component;
export declare const unnnicAccordion: Component;
export declare const unnnicCollapse: Component;
export declare const unnnicCarousel: Component;
export declare const unnnicSidebar: Component;
export declare const unnnicDrawer: Component;
export declare const unnnicProgressBar: Component;
export declare const unnnicSkeletonLoading: Component;

// Export de funções
export declare const unnnicCallAlert: (props: any) => void;
export declare const unnnicCallModal: (props: any) => void;

// Export de configurações
export declare const unnnicFontSize: any;

// Export principal
declare const Unnnic: UnnnicPlugin;
export default Unnnic; 