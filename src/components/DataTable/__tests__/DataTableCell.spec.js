import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import DataTableCell from '../DataTableCell.vue';

const mountCell = (props = {}, slots = {}) =>
  mount(DataTableCell, {
    props,
    slots,
  });

describe('DataTableCell', () => {
  it('renders a body cell as td by default', () => {
    const wrapper = mountCell({}, { default: 'Lorem ipsum' });

    expect(wrapper.element.tagName).toBe('TD');
    expect(wrapper.classes()).toContain('unnnic-data-table-cell--body');
    expect(wrapper.classes()).toContain('unnnic-data-table__body-cell');
    expect(wrapper.text()).toBe('Lorem ipsum');
  });

  it('renders a header cell as th', () => {
    const wrapper = mountCell({ type: 'header' }, { default: 'Header' });

    expect(wrapper.element.tagName).toBe('TH');
    expect(wrapper.attributes('scope')).toBe('col');
    expect(wrapper.classes()).toContain('unnnic-data-table-cell--header');
    expect(wrapper.classes()).toContain('unnnic-data-table__header-cell');
    expect(wrapper.text()).toBe('Header');
  });

  it.each(['left', 'center', 'right'])(
    'applies the %s alignment class',
    (align) => {
      const wrapper = mountCell({ align });

      expect(wrapper.classes()).toContain(
        `unnnic-data-table-cell--align-${align}`,
      );
    },
  );

  it('shows the default sort icon when the header is sortable', () => {
    const wrapper = mountCell({ type: 'header', sortable: true });

    expect(wrapper.classes()).toContain('unnnic-data-table-cell--sortable');
    expect(wrapper.classes()).toContain(
      'unnnic-data-table__header-cell--clickable',
    );
    expect(wrapper.find('[data-testid="arrow-default-icon"]').exists()).toBe(
      true,
    );
  });

  it('shows the ascending sort icon', () => {
    const wrapper = mountCell({
      type: 'header',
      sortable: true,
      sortOrder: 'asc',
    });

    expect(wrapper.classes()).toContain('unnnic-data-table-cell--sorting');
    expect(wrapper.find('[data-testid="arrow-asc-icon"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="arrow-asc-icon"]').classes()).toContain(
      'unnnic-data-table-cell__sort-icon--asc',
    );
    expect(wrapper.find('[data-testid="arrow-default-icon"]').exists()).toBe(
      false,
    );
  });

  it('shows the descending sort icon', () => {
    const wrapper = mountCell({
      type: 'header',
      sortable: true,
      sortOrder: 'desc',
    });

    expect(wrapper.find('[data-testid="arrow-desc-icon"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="arrow-desc-icon"]').classes()).toContain(
      'unnnic-data-table-cell__sort-icon--desc',
    );
  });

  it('does not show sort icons on body cells', () => {
    const wrapper = mountCell({ type: 'body', sortable: true });

    expect(wrapper.find('[data-testid="arrow-default-icon"]').exists()).toBe(
      false,
    );
  });

  it('marks cells with component content as slotted', () => {
    const wrapper = mountCell(
      { type: 'body' },
      { default: '<button>Edit</button>' },
    );

    expect(wrapper.classes()).toContain('unnnic-data-table-cell--has-slot');
  });

  it('uses the medium size by default', () => {
    const wrapper = mountCell();

    expect(wrapper.classes()).toContain('unnnic-data-table-cell--md');
    expect(wrapper.classes()).not.toContain('unnnic-data-table-cell--sm');
  });

  it('applies the small size class', () => {
    const wrapper = mountCell({ size: 'sm' });

    expect(wrapper.classes()).toContain('unnnic-data-table-cell--sm');
    expect(wrapper.classes()).not.toContain('unnnic-data-table-cell--md');
  });
});
