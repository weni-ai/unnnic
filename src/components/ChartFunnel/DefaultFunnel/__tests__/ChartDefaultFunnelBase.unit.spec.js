import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test } from 'vitest';
import ChartDefaultFunnelBase from '@/components/ChartFunnel/DefaultFunnel/ChartDefaultFunnelBase.vue';

describe('ChartDefaultFunnelBase.vue', () => {
  let wrapper;

  const sampleData = [
    {
      percentage: '90%',
      value: 900,
      description: 'Viewed the landing page',
      widthClass: 'w-60',
      color: '#0077B6',
    },
    {
      percentage: '80%',
      value: 800,
      description: 'Clicked on the CTA',
      widthClass: 'w-50',
      color: '#00A8E8',
    },
    {
      percentage: '70%',
      value: 700,
      description: 'Signed up for the trial',
      widthClass: 'w-40',
      color: '#00BFFF',
    },
    {
      percentage: '60%',
      value: 600,
      description: 'Completed the onboarding',
      widthClass: 'w-30',
      color: '#87CEEB',
    },
    {
      percentage: '50%',
      value: 500,
      description: 'Became a paying customer',
      widthClass: 'w-20',
      color: '#ADD8E6',
    },
  ];

  beforeEach(() => {
    wrapper = mount(ChartDefaultFunnelBase, {
      props: {
        data: sampleData,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders the correct number of funnel steps', () => {
    const funnelSteps = wrapper.findAll('.unnnic-chart-funnel-base-item');
    expect(funnelSteps).toHaveLength(sampleData.length);
  });

  test('renders the correct percentage and value for each step', () => {
    const funnelSteps = wrapper.findAll('.unnnic-chart-funnel-base-item');
    funnelSteps.forEach((step, index) => {
      expect(
        step.find('.unnnic-chart-funnel-base-item__text__values-title').text(),
      ).toBe(sampleData[index].percentage);
      expect(
        step
          .find('.unnnic-chart-funnel-base-item__text__values-sub-title')
          .text(),
      ).toBe(`| ${sampleData[index].value}`);
    });
  });

  test('renders the correct description for each step', () => {
    const funnelSteps = wrapper.findAll(
      '.unnnic-chart-funnel-base-item__text-description',
    );
    funnelSteps.forEach((step, index) => {
      expect(step.text()).toBe(sampleData[index].description);
    });
  });

  test('applies the correct width class for each step', () => {
    const funnelSteps = wrapper.findAll(
      '.unnnic-chart-funnel-base-item .overflow-hidden',
    );
    funnelSteps.forEach((step, index) => {
      expect(step.classes()).toContain(sampleData[index].widthClass);
    });
  });

  test('applies the first-item class to the first step', () => {
    const firstStep = wrapper.find(
      '.unnnic-chart-funnel-base-item .overflow-hidden.first-item',
    );
    expect(firstStep.exists()).toBe(true);
  });

  test('applies the last-item class to the last step', () => {
    const lastStep = wrapper.find(
      '.unnnic-chart-funnel-base-item .overflow-hidden.last-item',
    );
    expect(lastStep.exists()).toBe(true);
  });

  test('applies the last-item class to the text container of the last step', () => {
    const lastStepText = wrapper.find(
      '.unnnic-chart-funnel-base-item__text.last-item',
    );
    expect(lastStepText.exists()).toBe(true);
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
