import { mount } from '@vue/test-utils';
import { describe, expect, test, beforeEach } from 'vitest';
import ChartFunnelBaseRow from '@/components/ChartFunnel/SvgFunnel/ChartFunnelBaseRow.vue';

describe('ChartFunnelBaseRow.vue', () => {
  let wrapper;
  const mockRows = [
    {
      title: '100%',
      description: 'First Level',
      pathD: 'M0 0 L100 0 L80 50 L20 50 Z',
      titleY: '20',
      descriptionY: '35',
    },
    {
      title: '75%',
      description: 'Second Level',
      pathD: 'M20 50 L80 50 L60 100 L40 100 Z',
      titleY: '70',
      descriptionY: '85',
    },
    {
      title: '50%',
      description: 'Third Level',
      pathD: 'M40 100 L60 100 L50 150 L50 150 Z',
      titleY: '120',
      descriptionY: '135',
    },
  ];

  beforeEach(() => {
    wrapper = mount(ChartFunnelBaseRow, {
      props: {
        rows: mockRows,
        viewBox: '0 0 100 150',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('validates required props', () => {
    const { rows } = wrapper.vm.$options.props;
    expect(rows.required).toBe(true);
    expect(rows.type).toBe(Array);
  });

  test('validates optional viewBox prop', () => {
    const { viewBox } = wrapper.vm.$options.props;
    expect(viewBox.type).toBe(String);
    expect(viewBox.required).toBeTruthy();
  });

  test('applies correct viewBox to svg element', () => {
    const svg = wrapper.find('svg');
    expect(svg.attributes('viewBox')).toBe('0 0 100 150');
  });

  test('renders correct number of rows', () => {
    const rows = wrapper.findAll('.unnnic-chart-funnel-base-rows__row');
    expect(rows).toHaveLength(mockRows.length);
  });

  describe('row elements rendering', () => {
    test('renders paths with correct d attribute', () => {
      const paths = wrapper.findAll('.row__path');
      paths.forEach((path, index) => {
        expect(path.attributes('d')).toBe(mockRows[index].pathD);
      });
    });

    test('renders titles with correct text and position', () => {
      const titles = wrapper.findAll('.row__title');
      titles.forEach((title, index) => {
        expect(title.text()).toBe(mockRows[index].title);
        expect(title.attributes('x')).toBe('50%');
        expect(title.attributes('y')).toBe(mockRows[index].titleY);
      });
    });

    test('renders descriptions with correct text and position', () => {
      const descriptions = wrapper.findAll('.row__description');
      descriptions.forEach((description, index) => {
        expect(description.text()).toBe(mockRows[index].description);
        expect(description.attributes('x')).toBe('50%');
        expect(description.attributes('y')).toBe(mockRows[index].descriptionY);
      });
    });
  });

  test('handles empty rows array', async () => {
    await wrapper.setProps({ rows: [] });
    const rows = wrapper.findAll('.unnnic-chart-funnel-base-rows__row');
    expect(rows).toHaveLength(0);
  });

  test('handles missing viewBox prop', async () => {
    const wrapperWithoutViewBox = mount(ChartFunnelBaseRow, {
      props: {
        rows: mockRows,
      },
    });
    const svg = wrapperWithoutViewBox.find('svg');
    expect(svg.exists()).toBe(true);
    expect(svg.attributes('viewbox')).toBeFalsy();
  });

  test('handles rows with missing properties', async () => {
    const incompleteRows = [
      {
        title: '100%',
        pathD: 'M0 0 L100 0 L80 50 L20 50 Z',
        titleY: '20',
      },
    ];

    await wrapper.setProps({ rows: incompleteRows });
    const row = wrapper.find('.unnnic-chart-funnel-base-rows__row');
    const title = row.find('.row__title');
    const description = row.find('.row__description');
    const path = row.find('.row__path');

    expect(title.text()).toBe('100%');
    expect(description.text()).toBe('');
    expect(path.attributes('d')).toBe(incompleteRows[0].pathD);
  });

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('verifies SVG namespace', () => {
    const svg = wrapper.find('svg');
    expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svg.attributes('fill')).toBe('none');
  });

  test('maintains component class name', () => {
    const svg = wrapper.find('svg');
    expect(svg.classes()).toContain('unnnic-chart-funnel-base-rows');
  });

  test('preserves row order', () => {
    const rows = wrapper.findAll('.unnnic-chart-funnel-base-rows__row');
    rows.forEach((row, index) => {
      const title = row.find('.row__title');
      expect(title.text()).toBe(mockRows[index].title);
    });
  });

  describe('edge cases', () => {
    test('handles rows with special characters in text', async () => {
      const rowsWithSpecialChars = [
        {
          title: '100% & <special>',
          description: 'Test & <special>',
          pathD: 'M0 0 L100 0 L80 50 L20 50 Z',
          titleY: '20',
          descriptionY: '35',
        },
      ];

      await wrapper.setProps({ rows: rowsWithSpecialChars });
      const title = wrapper.find('.row__title');
      const description = wrapper.find('.row__description');

      expect(title.text()).toBe('100% & <special>');
      expect(description.text()).toBe('Test & <special>');
    });

    test('handles very long text content', async () => {
      const rowsWithLongText = [
        {
          title: 'A'.repeat(50),
          description: 'B'.repeat(100),
          pathD: 'M0 0 L100 0 L80 50 L20 50 Z',
          titleY: '20',
          descriptionY: '35',
        },
      ];

      await wrapper.setProps({ rows: rowsWithLongText });
      const title = wrapper.find('.row__title');
      const description = wrapper.find('.row__description');

      expect(title.text()).toBe('A'.repeat(50));
      expect(description.text()).toBe('B'.repeat(100));
    });
  });
});
