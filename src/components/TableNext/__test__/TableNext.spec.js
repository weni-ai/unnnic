import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
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

    it('do not render the header if it has the hideHeaders prop', async () => {
      await wrapper.setProps({ headers, hideHeaders: true });

      const header = wrapper.find('[data-testid="header"]');
      expect(header.exists()).toBe(false);

      const body = wrapper.find('[data-testid="body"]');
      expect(body.classes()).toContain('unnnic-table-next__body--hide-headers');
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

    it('renders "no matching results" message when there are no rows', async () => {
      await wrapper.setProps({ headers, rows: [] });

      const noResultsMessage = wrapper.find('[data-testid="body-cell-text"]');
      expect(noResultsMessage.text()).toBe('No matching results');
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
