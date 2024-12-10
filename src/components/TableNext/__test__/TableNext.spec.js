import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import TableNext from '../TableNext.vue';
import TablePagination from '../TablePagination.vue';

describe('TableNext.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TableNext, {
      props: { headers, rows },
    });
  });

  const headers = [{ content: 'Header 1' }, { content: 'Header 2', size: 2 }];
  const rows = [
    { content: ['Row 1 Col 1', 'Row 1 Col 2'] },
    {
      content: ['Row 2 Col 1', 'Row 2 Col 2'],
      link: { url: '#' },
    },
    {
      content: ['Row 3 Col 1', 'Row 3 Col 2'],
      link: { url: '#', target: '_self' },
    },
  ];

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Header rendering', () => {
    it('renders headers correctly', () => {
      const headerCells = wrapper.findAll('[data-testid="header-cell"]');
      expect(headerCells).toHaveLength(headers.length);
      headers.forEach((header, index) => {
        expect(headerCells[index].text()).toBe(header.content);
      });
    });

    it('renders headers with correct size', () => {
      const headerRow = wrapper.find('[data-testid="header-row"]');
      const gridTemplateColumns = headerRow.attributes('style');
      expect(gridTemplateColumns).toContain('1fr 2fr');
      // The first column uses the default size of 1fr,
      // and the second column is set to 2fr as specified in the header configuration.
    });

    it('renders rows with default 1fr when no headers are provided', async () => {
      wrapper = mount(TableNext, {
        props: { rows },
      });

      const rowElement = wrapper.find('[data-testid="body-row"]');
      const gridTemplateColumns = rowElement.attributes('style');
      expect(gridTemplateColumns).toContain('1fr 1fr');
      // Since headers are absent, each row column should default to 1fr as per the logic in `gridTemplateColumns`.
    });

    it('do not render the header if it has the hideHeaders prop', async () => {
      await wrapper.setProps({ headers, hideHeaders: true });

      const header = wrapper.find('[data-testid="header"]');
      expect(header.exists()).toBe(false);

      const body = wrapper.find('[data-testid="body"]');
      expect(body.classes()).toContain('unnnic-table-next__body--hide-headers');
    });

    it('renders headers with mixed sizes (number and string)', () => {
      wrapper = mount(TableNext, {
        props: {
          headers: [
            { content: 'ID', size: 1 },
            { content: 'Name', size: 'auto' },
            { content: 'Age', size: 2 },
          ],
          rows,
        },
      });

      const headerRow = wrapper.find('[data-testid="header-row"]');
      const gridTemplateColumns = headerRow.attributes('style');

      expect(gridTemplateColumns).toContain(
        'grid-template-columns: 1fr auto 2fr',
      );
    });
  });

  describe('Header sorting', () => {
    it('render sort icon', async () => {
      wrapper = mount(TableNext, {
        props: {
          headers: [
            { content: 'ID', size: 1, isSortable: true },
            { content: 'Name', size: 'auto' },
            { content: 'Age', size: 2 },
          ],
          rows,
        },
      });
      expect(wrapper.find('[data-testid="arrow-default-icon"]').exists()).toBe(
        true,
      );
    });
    it('change sorting and emit sort event', async () => {
      wrapper = mount(TableNext, {
        props: {
          headers: [
            { content: 'ID', size: 1, isSortable: true },
            { content: 'Name', size: 'auto' },
            { content: 'Age', size: 2 },
          ],
          rows,
        },
      });
      const handlerSortSpy = vi.spyOn(wrapper.vm, 'handleSort');

      const [headerCell, unsortableHeaderCell] = wrapper.findAll(
        '[data-testid="header-cell"]',
      );

      await unsortableHeaderCell.trigger('click');
      expect(handlerSortSpy).not.toHaveBeenCalled();

      await headerCell.trigger('click');
      expect(handlerSortSpy).toHaveBeenCalledWith('ID', 'asc');
      await headerCell.trigger('click');
      expect(handlerSortSpy).toHaveBeenCalledWith('ID', 'desc');
      await headerCell.trigger('click');
      expect(handlerSortSpy).toHaveBeenCalledWith('', '');
    });
  });

  describe('Row rendering and behaviors', () => {
    it('renders rows correctly', () => {
      const bodyRows = wrapper.findAll('[data-testid="body-row"]');
      expect(bodyRows).toHaveLength(rows.length);

      rows.forEach((row, rowIndex) => {
        const bodyCells = bodyRows[rowIndex].findAll(
          '[data-testid="body-cell"]',
        );
        expect(bodyCells).toHaveLength(row.content.length);

        row.content.forEach((cell, cellIndex) => {
          expect(bodyCells[cellIndex].text()).toBe(cell);
        });
      });
    });

    it('renders rows with links correctly', () => {
      const linkedRows = wrapper.findAll('[data-testid="body-row-redirect"]');
      expect(linkedRows).toHaveLength(2);

      const firstLink = linkedRows[0];
      expect(firstLink.attributes('href')).toBe('#');
      expect(firstLink.attributes('target')).toBe('_blank');

      const secondLink = linkedRows[1];
      expect(secondLink.attributes('href')).toBe('#');
      expect(secondLink.attributes('target')).toBe('_self');
    });

    it('renders "no matching results" message when there are no rows', () => {
      wrapper = mount(TableNext, {
        props: { headers },
      });

      const noResultsMessage = wrapper.find('[data-testid="body-cell-text"]');
      expect(noResultsMessage.text()).toBe('No matching results');
    });

    it('should emit row-click when clicking on a row', async () => {
      const row = wrapper.find('[data-testid="body-row"]');
      await row.trigger('click');

      expect(wrapper.emitted()['row-click'][0][0]).toEqual(rows[0]);
    });
  });

  describe('Loading state', () => {
    it('renders loading state', async () => {
      await wrapper.setProps({ headers, isLoading: true });
      const loadingImage = wrapper.find('[data-testid="body-row-loading"]');
      expect(loadingImage.exists()).toBe(true);
    });
  });

  describe('Pagination', () => {
    it('emits update:pagination event on pagination change', async () => {
      const paginationComponent = wrapper.findComponent(TablePagination);
      await paginationComponent.vm.$emit('update:model-value', 2);

      expect(wrapper.emitted()['update:pagination'][0]).toEqual([2]);
    });
  });
});
