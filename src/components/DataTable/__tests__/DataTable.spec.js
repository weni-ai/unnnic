import { describe, expect, it } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';

import DataTable from '../index.vue';

const headers = [
  { title: 'ID', itemKey: 'id', isSortable: true },
  { title: 'Name', itemKey: 'name' },
  { title: 'Age', itemKey: 'age', align: 'right' },
];

const items = [
  { id: '1', name: 'Eduardo', age: 27 },
  { id: '2', name: 'Marcus', age: 27 },
];

const mountTable = (props = {}, slots = {}) =>
  mount(DataTable, {
    props: { headers, items, hidePagination: true, ...props },
    slots,
  });

describe('UnnnicDataTable', () => {
  describe('rendering', () => {
    it('renders headers and body cells', () => {
      const wrapper = mountTable();

      const headerCells = wrapper.findAll('[data-testid="header-cell"]');
      expect(headerCells).toHaveLength(headers.length);
      expect(headerCells[0].text()).toContain('ID');
      expect(headerCells[1].text()).toContain('Name');

      const bodyCells = wrapper.findAll('[data-testid="body-cell"]');
      expect(bodyCells).toHaveLength(headers.length * items.length);
      expect(bodyCells[0].text()).toContain('1');
      expect(bodyCells[1].text()).toContain('Eduardo');
    });

    it('uses the internal DataTableCell for header and body', () => {
      const wrapper = mountTable();

      expect(wrapper.findAll('.unnnic-data-table-cell--header')).toHaveLength(
        headers.length,
      );
      expect(wrapper.findAll('.unnnic-data-table-cell--body')).toHaveLength(
        headers.length * items.length,
      );
    });

    it('maps header align right to right-aligned cells', () => {
      const wrapper = mountTable();
      const ageHeader = wrapper.findAll('[data-testid="header-cell"]')[2];

      expect(ageHeader.classes()).toContain(
        'unnnic-data-table-cell--align-right',
      );
    });

    it('applies the small size to body cells only', () => {
      const wrapper = mountTable({ size: 'sm' });

      expect(wrapper.classes()).toContain('unnnic-data-table--sm');
      expect(wrapper.find('[data-testid="header-cell"]').classes()).toContain(
        'unnnic-data-table-cell--md',
      );
      expect(wrapper.find('[data-testid="body-cell"]').classes()).toContain(
        'unnnic-data-table-cell--sm',
      );
    });
  });

  describe('sorting', () => {
    it('renders the default sort icon for sortable headers', () => {
      const wrapper = mountTable();

      expect(wrapper.find('[data-testid="arrow-default-icon"]').exists()).toBe(
        true,
      );
    });

    it('emits update:sort when a sortable header is clicked', async () => {
      const wrapper = mountTable();
      const headerCells = wrapper.findAll('[data-testid="header-cell"]');

      await headerCells[0].trigger('click');
      expect(wrapper.emitted('update:sort')[0][0]).toEqual({
        header: 'ID',
        itemKey: 'id',
        order: 'asc',
      });
      expect(wrapper.find('[data-testid="arrow-asc-icon"]').exists()).toBe(
        true,
      );

      await headerCells[0].trigger('click');
      expect(wrapper.emitted('update:sort')[1][0].order).toBe('desc');
      expect(wrapper.find('[data-testid="arrow-desc-icon"]').exists()).toBe(
        true,
      );
    });

    it('does not sort when a non-sortable header is clicked', async () => {
      const wrapper = mountTable();
      const nameHeader = wrapper.findAll('[data-testid="header-cell"]')[1];

      await nameHeader.trigger('click');
      expect(wrapper.emitted('update:sort')).toBeUndefined();
    });
  });

  describe('rows', () => {
    it('emits itemClick when clickable rows are clicked', async () => {
      const wrapper = mountTable({ clickable: true });
      const row = wrapper.find('.unnnic-data-table__body-row--clickable');

      await row.trigger('click');
      expect(wrapper.emitted('itemClick')[0][0]).toEqual(items[0]);
    });

    it('emits itemClick:middle when a clickable row is middle-clicked', async () => {
      const wrapper = mountTable({ clickable: true });
      const row = wrapper.find('.unnnic-data-table__body-row--clickable');

      await row.trigger('click.middle');
      expect(wrapper.emitted('itemClick:middle')[0][0]).toEqual(items[0]);
      expect(wrapper.emitted('itemClick')).toBeUndefined();
    });

    it('emits itemClick on Enter and Space for clickable rows', async () => {
      const wrapper = mountTable({ clickable: true });
      const row = wrapper.find('.unnnic-data-table__body-row--clickable');

      await row.trigger('keydown.enter');
      await row.trigger('keydown.space');

      expect(wrapper.emitted('itemClick')).toHaveLength(2);
    });

    it('does not emit itemClick when rows are not clickable', async () => {
      const wrapper = mountTable();
      const row = wrapper.find('.unnnic-data-table__body-row');

      await row.trigger('click');
      expect(wrapper.emitted('itemClick')).toBeUndefined();
    });
  });

  describe('slots', () => {
    it('renders a custom header slot', () => {
      const wrapper = mountTable(
        {},
        {
          'header-name': `<button>Custom name</button>`,
        },
      );

      expect(wrapper.find('[data-testid="header-cell"] button').text()).toBe(
        'Custom name',
      );
    });

    it('renders a custom body slot', () => {
      const wrapper = mountTable(
        {},
        {
          'body-id': `<button>id-slot</button>`,
        },
      );

      expect(wrapper.find('[data-testid="body-cell"] button').text()).toBe(
        'id-slot',
      );
    });
  });

  describe('states', () => {
    it('shows the loading indicator', () => {
      const wrapper = mountTable({ isLoading: true });

      expect(wrapper.find('[data-testid="body-row-loading"]').exists()).toBe(
        true,
      );
      expect(
        wrapper.findComponent({ name: 'UnnnicIconLoading' }).exists(),
      ).toBe(true);
      expect(wrapper.find('[data-testid="body-cell"]').exists()).toBe(false);
    });

    it('shows the empty state', () => {
      const wrapper = mountTable({ items: [] });

      expect(wrapper.find('[data-testid="body-cell-text"]').text()).toBe(
        'No matching results',
      );
    });

    it('shows the empty state in the selected locale', () => {
      const wrapper = mountTable({ items: [], locale: 'pt-br' });

      expect(wrapper.find('[data-testid="body-cell-text"]').text()).toBe(
        'Nenhum resultado correspondente',
      );
    });

    it('renders the without-results slot', () => {
      const wrapper = mountTable({ items: [] }, { 'without-results': 'Empty' });

      expect(wrapper.text()).toContain('Empty');
      expect(wrapper.find('[data-testid="body-cell-text"]').exists()).toBe(
        false,
      );
    });

    it('hides headers when hideHeaders is set', () => {
      const wrapper = mountTable({ hideHeaders: true });

      expect(wrapper.find('.unnnic-data-table__header').exists()).toBe(false);
      expect(wrapper.find('.unnnic-data-table__body').classes()).toContain(
        'unnnic-data-table__body--hide-headers',
      );
    });

    it('hides pagination when hidePagination is set', () => {
      const wrapper = mountTable({ hidePagination: true });

      expect(wrapper.findComponent({ name: 'TablePagination' }).exists()).toBe(
        false,
      );
    });

    it('shows pagination by default', () => {
      const wrapper = mountTable({ hidePagination: false, pageTotal: 20 });

      expect(wrapper.findComponent({ name: 'TablePagination' }).exists()).toBe(
        true,
      );
    });

    it('shows the loading-more indicator during infinite scroll', () => {
      const wrapper = mountTable({
        infiniteScroll: true,
        isLoadingMore: true,
      });

      expect(
        wrapper.find('[data-testid="body-row-loading-more"]').exists(),
      ).toBe(true);
      expect(
        wrapper.findComponent({ name: 'UnnnicIconLoading' }).exists(),
      ).toBe(true);
    });
  });

  describe('fixed headers', () => {
    const mockTbodyScrollbar = (wrapper, offsetWidth, clientWidth) => {
      const tbody = wrapper.find('.unnnic-data-table__body').element;
      Object.defineProperty(tbody, 'offsetWidth', {
        configurable: true,
        value: offsetWidth,
      });
      Object.defineProperty(tbody, 'clientWidth', {
        configurable: true,
        value: clientWidth,
      });
    };

    it('offsets the header by the body scrollbar width', async () => {
      const wrapper = mountTable({
        fixedHeaders: true,
        height: '165px',
      });

      mockTbodyScrollbar(wrapper, 200, 188);
      await wrapper.setProps({
        items: [...items, { id: '3', name: 'Paulo', age: 29 }],
      });
      await flushPromises();

      const header = wrapper.find('.unnnic-data-table__header');
      expect(header.attributes('style')).toContain('padding-right: 12px');
      expect(wrapper.classes()).toContain('unnnic-data-table--has-scrollbar');
    });

    it('does not offset the header when headers are not fixed', async () => {
      const wrapper = mountTable({ height: '165px' });

      mockTbodyScrollbar(wrapper, 200, 188);
      await wrapper.setProps({
        items: [...items, { id: '3', name: 'Paulo', age: 29 }],
      });
      await flushPromises();

      expect(wrapper.classes()).not.toContain(
        'unnnic-data-table--has-scrollbar',
      );
    });
  });
});
