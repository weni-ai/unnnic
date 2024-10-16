import { markRaw } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import TableBodyCell from '../TableBodyCell.vue';

describe('TableBodyCell.vue', () => {
  const mountWrapper = (cellContent) => {
    return mount(TableBodyCell, {
      props: {
        cell: cellContent,
      },
    });
  };

  it('renders text when cell is a string', () => {
    const cellContent = 'Test Cell';
    const wrapper = mountWrapper(cellContent);

    const textElement = wrapper.find('[data-testid="body-cell-text"]');
    expect(textElement.exists()).toBe(true);
    expect(textElement.text()).toBe(cellContent);
  });

  it('renders component when cell is an object', () => {
    const mockComponent = {
      template: '<div>Mock Component</div>',
    };

    const cellContent = {
      component: markRaw(mockComponent),
      events: { click: () => {} },
    };

    const wrapper = mountWrapper(cellContent);
    const componentElement = wrapper.findComponent(mockComponent);
    expect(componentElement.exists()).toBe(true);
  });

  it('passes props and events to the child component', async () => {
    const mockComponent = {
      props: ['propA'],
      template: '<div @click="onClick">{{ propA }}</div>',
      methods: {
        onClick() {
          this.$emit('click');
        },
      },
    };

    const cellContent = {
      component: markRaw(mockComponent),
      props: { propA: 'valueA' },
      events: { click: () => {} },
    };

    const wrapper = mountWrapper(cellContent);
    const componentElement = wrapper.findComponent(mockComponent);

    expect(componentElement.props().propA).toBe('valueA');

    await componentElement.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
});
