import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import Tab from '@/components/Tab/Tab.vue';
import UnnnicIcon from '@/components/Icon.vue';
import UnnnicToolTip from '@/components/ToolTip/ToolTip.vue';

describe('Tab.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Tab, {
      props: {
        size: 'md',
        activeTab: 'tab1',
        initialTab: 'tab2',
        tabs: ['tab1', 'tab2', 'tab3'],
      },
      slots: {
        'tab-head-tab1-tooltip': 'Tooltip text',
      },
      global: {
        components: {
          UnnnicIcon,
          UnnnicToolTip,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders correct number of tabs', () => {
    const tabs = wrapper.findAll('.tab-head');
    expect(tabs.length).toBe(3);
  });

  test('applies correct active class based on activeTab', async () => {
    const activeTab = wrapper.find('.tab-head--active');
    expect(activeTab.text()).toContain('tab2');

    await wrapper.setProps({ activeTab: 'tab3' });
    const newActiveTab = wrapper.find('.tab-head--active');
    expect(newActiveTab.text()).toContain('tab3');
  });

  test('renders UnnnicToolTip and UnnnicIcon when tooltip is provided', () => {
    const tooltips = wrapper.findAllComponents(UnnnicToolTip);
    const icons = wrapper.findAllComponents(UnnnicIcon);

    expect(tooltips.length).toBeGreaterThan(0);
    expect(icons.length).toBeGreaterThan(0);
  });

  test('does not render UnnnicToolTip when no tooltip is provided', async () => {
    await wrapper.setProps({ tabs: ['tab2', 'tab3'] });

    const tooltips = wrapper.findAllComponents(UnnnicToolTip);
    expect(tooltips.length).toBe(0);
  });

  test('correctly computes tabPanelSlotName', () => {
    expect(wrapper.vm.tabPanelSlotName).toBe('tab-panel-tab2');
    wrapper.setData({ localValue: 'tab3' });
    expect(wrapper.vm.tabPanelSlotName).toBe('tab-panel-tab3');
  });

  test('correctly computes tabHeadSlotName', () => {
    expect(wrapper.vm.tabHeadSlotName('tab1')).toBe('tab-head-tab1');
  });

  test('correctly computes getHeadTooltip', () => {
    const tooltip = wrapper.vm.getHeadTooltip('tab2');
    expect(tooltip).toBe('');
  });

  test('changes tab when clicking on tab head', async () => {
    const tabHeads = wrapper.findAll('.tab-head');
    await tabHeads[1].trigger('click');

    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')[0]).toEqual(['tab2']);
  });

  test('initializes with correct tab based on props', () => {
    expect(wrapper.vm.localValue).toBe('tab2');
  });

  test('updates localValue when activeTab prop changes', async () => {
    await wrapper.setProps({ activeTab: 'tab3' });
    expect(wrapper.vm.localValue).toBe('tab3');
  });

  test('sets the correct initial tab value on creation', () => {
    wrapper = mount(Tab, {
      props: {
        initialTab: 'tab3',
        activeTab: '',
        tabs: ['tab1', 'tab2', 'tab3'],
      },
    });

    expect(wrapper.vm.localValue).toBe('tab3');

    wrapper = mount(Tab, {
      props: {
        initialTab: '',
        activeTab: 'tab2',
        tabs: ['tab1', 'tab2', 'tab3'],
      },
    });

    expect(wrapper.vm.localValue).toBe('tab2');

    wrapper = mount(Tab, {
      props: {
        initialTab: '',
        activeTab: '',
        tabs: ['tab1', 'tab2', 'tab3'],
      },
    });

    expect(wrapper.vm.localValue).toBe('tab1');
  });

  test('computes tabHeadTooltipSlotName correctly', () => {
    expect(wrapper.vm.tabHeadTooltipSlotName('tab1')).toBe(
      'tab-head-tab1-tooltip',
    );
    expect(wrapper.vm.tabHeadTooltipSlotName(undefined)).toBe('');
  });

  test('renders UnnnicIcon with correct size based on prop size', async () => {
    const icon = wrapper.findComponent(UnnnicIcon);
    expect(icon.props('size')).toBe('sm');

    await wrapper.setProps({ size: 'sm' });
    expect(icon.props('size')).toBe('xs');

    await wrapper.setProps({ size: 'lg' });
    expect(icon.props('size')).toBe('sm');
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
