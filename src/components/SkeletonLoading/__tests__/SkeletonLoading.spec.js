import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import SkeletonLoading from '../SkeletonLoading.vue';

function setup(options) {
  return mount(SkeletonLoading, options);
}

describe('SkeletonLoading', () => {
  let wrapper;

  describe('when the skeleton loading is a circle', () => {
    beforeEach(() => {
      wrapper = setup({
        props: {
          count: 1,
          duration: 1.5,
          tag: 'span',
          width: '100px',
          height: '100px',
          circle: true,
          loading: undefined,
          direct: false,
        },
      });
    });

    it('should have borderRadius', () => {
      expect(wrapper.vm.styles.borderRadius).toBe('50%');
    });
  });

  describe('when the skeleton loading has not a duration', () => {
    beforeEach(() => {
      wrapper = setup({
        props: {
          count: 1,
          duration: 0,
          tag: 'span',
          width: '100px',
          height: '100px',
          circle: false,
          loading: undefined,
          direct: false,
        },
      });
    });

    it('should not have the gradient background', () => {
      expect(wrapper.vm.styles.backgroundImage).toBe('');
    });
  });

  describe('when the default slot is provided and loading is undefined', () => {
    beforeEach(() => {
      wrapper = setup({
        props: {
          count: 1,
          duration: 0,
          tag: 'span',
          width: '100px',
          height: '100px',
          circle: false,
          loading: undefined,
          direct: false,
        },
        slots: { default: 'Default slot' },
      });
    });

    it('should not show the skeleton loading', () => {
      expect(wrapper.html()).toBe('<!--v-if-->');
    });
  });

  describe('when the loading prop is provided', () => {
    beforeEach(() => {
      wrapper = setup({
        props: {
          count: 1,
          duration: 0,
          tag: 'span',
          width: '100px',
          height: '100px',
          circle: false,
          loading: true,
          direct: false,
        },
      });
    });

    it('showLoading should be as same as the loading prop', async () => {
      expect(wrapper.vm.showLoading).toBeTruthy();

      await wrapper.setProps({
        loading: false,
      });

      expect(wrapper.vm.showLoading).toBeFalsy();
    });
  });

  describe('when the direct', () => {
    beforeEach(() => {
      wrapper = setup({
        props: {
          count: 1,
          duration: 0,
          tag: 'span',
          width: '100px',
          height: '100px',
          circle: false,
          loading: true,
          direct: true,
        },
      });
    });

    it('renders the skeleton loading directly on the component', async () => {
      expect(wrapper.html()).toBe(
        '<span class="unnnic-skeleton" style="background-color: rgb(232, 244, 244); width: 100px; height: 100px;"></span>',
      );
    });
  });
});
