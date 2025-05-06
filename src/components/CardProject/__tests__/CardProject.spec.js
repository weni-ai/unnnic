import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import CardProject from '../CardProject.vue';

const factory = (props = {}, options = {}) => {
  return mount(CardProject, {
    props: {
      name: 'Test Project',
      description: 'Project Description',
      status: 'ACTIVE',
      ...props,
    },
    global: {
      stubs: ['UnnnicIcon'],
    },
    ...options,
  });
};

describe('CardProject.vue', () => {
  it('renders project name and description', () => {
    const wrapper = factory();
    expect(wrapper.text()).toContain('Test Project');
    expect(wrapper.text()).toContain('Project Description');
  });

  it('emits click when clickable and left click occurs', async () => {
    const wrapper = factory({ clickable: true });
    await wrapper
      .find('[data-testid="unnnic-card-project"]')
      .trigger('click.left');
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')[0][0]).toEqual({ button: 0 });
  });

  it('emits click with button 1 on middle click', async () => {
    const wrapper = factory({ clickable: true });

    await wrapper.trigger('click.middle');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')[0][0]).toEqual({ button: 1 });
  });

  it('emits click with button 1 on Ctrl+click', async () => {
    const wrapper = factory({ clickable: true });

    await wrapper.trigger('click.ctrl.left');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')[0][0]).toEqual({ button: 1 });
  });

  it('does not emit click if clickable is false', async () => {
    const wrapper = factory({ clickable: false });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('renders status chip with correct text and style', () => {
    const wrapper = factory({ status: 'IN_TEST' });
    const chip = wrapper.find('[data-testid="project-status-chip"]');
    expect(chip.exists()).toBe(true);
    expect(chip.classes()).toContain(
      'unnnic-card-project__status-chip--IN_TEST',
    );
  });

  it('toggles dropdown if canUpdateStatus is true', async () => {
    const wrapper = factory({ canUpdateStatus: true });
    const chip = wrapper.find('[data-testid="project-status-chip"]');
    await chip.trigger('click');
    expect(wrapper.vm.openDropdown).toBe(true);
  });

  it('does not toggle dropdown if canUpdateStatus is false', async () => {
    const wrapper = factory({ canUpdateStatus: false });
    const chip = wrapper.find('[data-testid="project-status-chip"]');
    await chip.trigger('click');
    expect(wrapper.vm.openDropdown).toBe(false);
  });

  it('emits changeProjectStatus when a dropdown item is clicked', async () => {
    const wrapper = factory({
      canUpdateStatus: true,
      status: 'ACTIVE',
    });

    await wrapper.setData({ openDropdown: true });

    await wrapper.vm.handlerClickDropdownItem('IN_TEST');
    expect(wrapper.emitted('changeProjectStatus')).toBeTruthy();
    expect(wrapper.emitted('changeProjectStatus')[0][0]).toBe('IN_TEST');
  });

  it('applies inactive class when status is INACTIVE', () => {
    const wrapper = factory({ status: 'INACTIVE' });
    expect(wrapper.classes()).toContain('unnnic-card-project--inactive');
    expect(
      wrapper.find('[data-testid="card-project-title"]').classes(),
    ).toContain('unnnic-card-project__title--inactive');
  });

  it('displays actions slot if provided', () => {
    const wrapper = factory(
      {},
      {
        slots: {
          actions: '<div class="custom-action">Action</div>',
        },
      },
    );

    expect(wrapper.find('[data-testid="dropdown-actions"]').exists()).toBe(
      true,
    );
  });

  it('computes correct statusOptions when status is ACTIVE', () => {
    const wrapper = factory({ status: 'ACTIVE' });
    expect(wrapper.vm.statusOptions).toEqual(['INACTIVE', 'IN_TEST']);
  });

  it('computes correct statusOptions when status is INACTIVE', () => {
    const wrapper = factory({ status: 'INACTIVE' });
    expect(wrapper.vm.statusOptions).toEqual(['ACTIVE', 'IN_TEST']);
  });

  it('computes correct statusOptions when status is IN_TEST', () => {
    const wrapper = factory({ status: 'IN_TEST' });
    expect(wrapper.vm.statusOptions).toEqual(['ACTIVE', 'INACTIVE']);
  });

  it('updates openDropdown when UnnnicDropdown emits update:open', async () => {
    const wrapper = factory({ canUpdateStatus: true });

    const statusDropdown = wrapper.findComponent(
      '[data-testid="status-dropdown"]',
    );
    await statusDropdown.vm.$emit('update:open', true);

    expect(wrapper.vm.openDropdown).toBe(true);

    await statusDropdown.vm.$emit('update:open', false);

    expect(wrapper.vm.openDropdown).toBe(false);
  });

  it('emits changeProjectStatus when dropdown item is clicked', async () => {
    const wrapper = factory({ status: 'IN_TEST', canUpdateStatus: true });
    await wrapper.setData({ openDropdown: true });

    const firstOption = wrapper.findAll('.status-option')[0];
    await firstOption.trigger('click');

    const expectedStatus = wrapper.vm.statusOptions[0];
    expect(wrapper.emitted('changeProjectStatus')).toBeTruthy();
    expect(wrapper.emitted('changeProjectStatus')[0][0]).toBe(expectedStatus);
  });
});
