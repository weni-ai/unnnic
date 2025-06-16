import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import UnnnicChatsContact from '../ChatsContact.vue';
import moment from 'moment';

describe('UnnnicChatsContact', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(UnnnicChatsContact, {
      props: {
        title: 'Contact Name',
        lastMessage: { text: 'Message' },
      },
    });
  });

  afterEach(() => {
    // Reset moment locale after each test
    moment.locale('en');
  });

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should show hours:minutes when last interaction was today', async () => {
    const todayTime = moment().subtract(30, 'minutes').toISOString();

    await wrapper.setProps({ lastInteractionTime: todayTime });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe(moment(todayTime).format('HH:mm'));
  });

  it('should show "Yesterday" when last interaction was yesterday (English)', async () => {
    const yesterdayTime = moment()
      .subtract(1, 'day')
      .startOf('day')
      .add(12, 'hours')
      .toISOString();

    await wrapper.setProps({
      lastInteractionTime: yesterdayTime,
      locale: 'en',
    });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe('Yesterday');
  });

  it('should show "Ontem" when last interaction was yesterday (Portuguese)', async () => {
    const yesterdayTime = moment()
      .subtract(1, 'day')
      .startOf('day')
      .add(12, 'hours')
      .toISOString();

    await wrapper.setProps({
      lastInteractionTime: yesterdayTime,
      locale: 'pt-br',
    });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe('Ontem');
  });

  it('should show "Ayer" when last interaction was yesterday (Spanish)', async () => {
    const yesterdayTime = moment()
      .subtract(1, 'day')
      .startOf('day')
      .add(12, 'hours')
      .toISOString();

    await wrapper.setProps({
      lastInteractionTime: yesterdayTime,
      locale: 'es',
    });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe('Ayer');
  });

  it('should show date when last interaction was more than 1 day ago', async () => {
    const threeDaysAgoTime = moment().subtract(3, 'days').toISOString();

    await wrapper.setProps({ lastInteractionTime: threeDaysAgoTime });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe(
      moment(threeDaysAgoTime).format('L'),
    );
  });

  it('should show hours:minutes when difference is less than 1 hour', async () => {
    const recentTime = moment().subtract(30, 'minutes').toISOString();

    await wrapper.setProps({ lastInteractionTime: recentTime });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe(moment(recentTime).format('HH:mm'));
  });

  it('should show date when difference is more than 1 hour but not yesterday', async () => {
    const mockNow = new Date('2025-06-06T15:00:00Z');
    const moreThanOneHourAgo = moment('2025-06-04T12:00:00Z').toISOString();

    vi.setSystemTime(mockNow);

    await wrapper.setProps({ lastInteractionTime: moreThanOneHourAgo });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe(
      moment(moreThanOneHourAgo).format('L'),
    );

    vi.useRealTimers();
  });

  it('should not show time when lastInteractionTime is empty', async () => {
    await wrapper.setProps({ lastInteractionTime: '' });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(false);
  });

  it('should default to English locale when no locale is provided', async () => {
    const yesterdayTime = moment()
      .subtract(1, 'day')
      .startOf('day')
      .add(12, 'hours')
      .toISOString();

    await wrapper.setProps({
      lastInteractionTime: yesterdayTime,
      // No locale prop provided
    });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe('Yesterday');
  });

  describe('Pin functionality', () => {
    it('should emit clickPin event when pin is clicked', async () => {
      await wrapper.setProps({
        pinned: true,
        activePin: true,
      });
      await wrapper.setData({ isHovered: true });

      const pinElement = wrapper.find('[data-testid="pin-button"]');
      expect(pinElement.exists()).toBe(true);

      await pinElement.trigger('click');

      expect(wrapper.emitted('clickPin')).toBeTruthy();
      expect(wrapper.emitted('clickPin')).toHaveLength(1);
    });

    it('should not emit main click event when pin is clicked', async () => {
      await wrapper.setProps({
        pinned: true,
        activePin: true,
      });
      await wrapper.setData({ isHovered: true });

      const pinElement = wrapper.find('[data-testid="pin-button"]');
      expect(pinElement.exists()).toBe(true);

      // Clear any previous emissions
      wrapper.emitted().click = undefined;

      await pinElement.trigger('click');

      // Pin click should not trigger the main click event
      expect(wrapper.emitted('click')).toBeFalsy();
      expect(wrapper.emitted('clickPin')).toBeTruthy();
    });

    it('should show pin icon when pinned is true', async () => {
      await wrapper.setProps({ pinned: true });

      const pinElement = wrapper.find('[data-testid="pin-button"]');
      const iconElement = pinElement.findComponent('[data-testid="pin-icon"]');

      expect(pinElement.exists()).toBe(true);
      expect(iconElement.exists()).toBe(true);
      expect(iconElement.props('icon')).toBe('pin');
    });

    it('should show unpin icon when hovered and pinned', async () => {
      await wrapper.setProps({ pinned: true });
      await wrapper.setData({ isHovered: true });

      const pinElement = wrapper.find('[data-testid="pin-button"]');
      const iconElement = pinElement.findComponent('[data-testid="pin-icon"]');

      expect(pinElement.exists()).toBe(true);
      expect(iconElement.exists()).toBe(true);
      expect(iconElement.props('icon')).toBe('unpin');
    });

    it('should render pin when activePin is true and hovered', async () => {
      await wrapper.setProps({
        activePin: true,
        pinned: false,
      });
      await wrapper.setData({ isHovered: true });

      const pinElement = wrapper.find('[data-testid="pin-button"]');
      expect(pinElement.exists()).toBe(true);
    });

    it('should not render pin when activePin is true but not hovered', async () => {
      await wrapper.setProps({
        activePin: true,
        pinned: false,
      });
      await wrapper.setData({ isHovered: false });

      const pinElement = wrapper.find('[data-testid="pin-button"]');
      expect(pinElement.exists()).toBe(false);
    });
  });
});
