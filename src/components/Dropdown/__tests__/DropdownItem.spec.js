import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import DropdownItem from '../DropdownItem.vue';

describe('DropdownItem.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DropdownItem, {
      slots: {
        default: '<span>Dropdown Item Content</span>',
      },
    });
  });

  it('renders slot content', () => {
    expect(wrapper.html()).toContain('Dropdown Item Content');
  });

  it('has the correct classes applied', () => {
    const dropdownItem = wrapper.find('[data-testid="dropdown-item"]');
    expect(dropdownItem.classes()).toContain('unnnic-dropdown-item');
    expect(dropdownItem.classes()).toContain('unnnic--clickable');
  });
});
