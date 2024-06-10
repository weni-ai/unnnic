import UnnnicBreadcrumb from '../components/Breadcrumb/Breadcrumb.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Example/Breadcrumb',
  component: UnnnicBreadcrumb,
  args: {
    onCrumbClick: action('crumb-click'),
  },
};

export const Default = {
  args: {
    crumbs: [
      { name: 'One', path: '/One' },
      { name: 'Two', path: '/Two' },
      { name: 'Active', path: '/Active' },
    ],
  },
};
