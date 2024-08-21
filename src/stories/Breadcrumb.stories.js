import UnnnicBreadcrumb from '../components/Breadcrumb/Breadcrumb.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Navigation/Breadcrumb',
  component: UnnnicBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Displays the path taken by the user within a system or hierarchical structure, 
        facilitating navigation and offering clear context about the current location.`,
      },
    },
  },
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
