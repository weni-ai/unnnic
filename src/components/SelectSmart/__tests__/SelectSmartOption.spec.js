import { shallowMount } from '@vue/test-utils';
import SelectSmartOption from '../SelectSmartOption.vue';

describe('SelectSmartOption.vue', () => {
  let wrapper;

  const mountWrapper = (props = {}) => {
    wrapper = shallowMount(SelectSmartOption, {
      propsData: {
        label: 'Test Option',
        ...props,
      },
    });
  };

  beforeEach(() => {
    mountWrapper();
  });

  describe('Initial rendering', () => {
    it('matches the snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders the component with the correct label', () => {
      expect(wrapper.find('[data-testid="label"]').text()).toBe('Test Option');
    });

    it('applies the title attribute with the label text', () => {
      expect(wrapper.attributes('title')).toBe('Test Option');
    });
  });

  describe('Dynamic classes', () => {
    it('adds focused class when focused prop is true', async () => {
      await wrapper.setProps({ focused: true });
      expect(wrapper.classes()).toContain(
        'unnnic-select-smart-option--focused',
      );
    });

    it('adds active class when active prop is true', async () => {
      await wrapper.setProps({ active: true });
      expect(wrapper.classes()).toContain('unnnic-select-smart-option--active');
    });

    it('adds selectable class when selectable prop is true', async () => {
      await wrapper.setProps({ selectable: true });
      expect(wrapper.classes()).toContain(
        'unnnic-select-smart-option--selectable',
      );
    });

    it('adds with-checkbox class when allowCheckbox prop is true', async () => {
      await wrapper.setProps({ allowCheckbox: true });
      expect(wrapper.classes()).toContain(
        'unnnic-select-smart-option--with-checkbox',
      );
    });
  });

  describe('Checkbox rendering', () => {
    beforeEach(() => {
      mountWrapper({ allowCheckbox: true });
    });

    it('renders checkbox when allowCheckbox is true', () => {
      const checkbox = wrapper.findComponent('[data-testid="checkbox"]');
      expect(checkbox.exists()).toBe(true);
    });

    it('does not render checkbox when allowCheckbox is false', () => {
      mountWrapper({ allowCheckbox: false });
      const checkbox = wrapper.findComponent('[data-testid="checkbox"]');
      expect(checkbox.exists()).toBe(false);
    });

    it('binds active prop to checkbox modelValue', async () => {
      await wrapper.setProps({ active: true });
      const checkbox = wrapper.findComponent('[data-testid="checkbox"]');
      expect(checkbox.props('modelValue')).toBe(true);
    });
  });

  describe('Label and description rendering', () => {
    it('displays the label with the correct size class', async () => {
      await wrapper.setProps({ size: 'large' });
      const label = wrapper.find('[data-testid="label"]');
      expect(label.classes()).toContain(
        'unnnic-select-smart-option__label--large',
      );
    });

    it('displays the description if provided', async () => {
      await wrapper.setProps({ description: 'This is a test description' });
      const description = wrapper.find('[data-testid="description"]');
      expect(description.exists()).toBe(true);
      expect(description.text()).toBe('This is a test description');
    });

    it('does not render description if it is not provided', () => {
      const description = wrapper.find('[data-testid="description"]');
      expect(description.exists()).toBe(false);
    });

    it('applies size class to description if provided', async () => {
      await wrapper.setProps({ description: 'Description', size: 'small' });
      const description = wrapper.find('[data-testid="description"]');
      expect(description.classes()).toContain(
        'unnnic-select-smart-option__description--small',
      );
    });
  });
});
