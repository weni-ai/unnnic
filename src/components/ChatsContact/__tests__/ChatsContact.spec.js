import { beforeEach, describe, expect, afterEach, it, vi } from 'vitest';
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

  describe('Media "You:" prefix', () => {
    const imageMedia = {
      media: [
        {
          content_type: 'image/jpeg',
          message: 'a997421d-6238-4bef-912d-e689c1c0db3f',
          url: 'https://example.com/photo.jpg',
          created_on: '2025-04-15T14:58:56.163027-03:00',
        },
      ],
    };

    it('should not render the prefix on a media message when isFromUser is falsy', async () => {
      await wrapper.setProps({ lastMessage: imageMedia });

      const prefix = wrapper.find('[data-testid="media-sender-prefix"]');
      expect(prefix.exists()).toBe(false);
    });

    it('should render the EN "You:" prefix when isFromUser is true', async () => {
      await wrapper.setProps({
        lastMessage: { ...imageMedia, isFromUser: true },
        locale: 'en',
      });

      const prefix = wrapper.find('[data-testid="media-sender-prefix"]');
      expect(prefix.exists()).toBe(true);
      expect(prefix.text()).toBe('You:');
    });

    it('should render the PT-BR "Você:" prefix when isFromUser is true', async () => {
      await wrapper.setProps({
        lastMessage: { ...imageMedia, isFromUser: true },
        locale: 'pt-br',
      });

      const prefix = wrapper.find('[data-testid="media-sender-prefix"]');
      expect(prefix.exists()).toBe(true);
      expect(prefix.text()).toBe('Você:');
    });

    it('should render the ES "Tú:" prefix when isFromUser is true', async () => {
      await wrapper.setProps({
        lastMessage: { ...imageMedia, isFromUser: true },
        locale: 'es',
      });

      const prefix = wrapper.find('[data-testid="media-sender-prefix"]');
      expect(prefix.exists()).toBe(true);
      expect(prefix.text()).toBe('Tú:');
    });

    it('should not render the prefix for non-media messages even when isFromUser is true', async () => {
      await wrapper.setProps({
        lastMessage: { text: 'Hello there', isFromUser: true },
      });

      const prefix = wrapper.find('[data-testid="media-sender-prefix"]');
      expect(prefix.exists()).toBe(false);
    });
  });

  describe('New message indicator', () => {
    it('should not render the dot by default', () => {
      const indicator = wrapper.find('[data-testid="new-message-indicator"]');
      expect(indicator.exists()).toBe(false);
    });

    it('should render the dot when newMessageIndicator is true', async () => {
      await wrapper.setProps({ newMessageIndicator: true });

      const indicator = wrapper.find('[data-testid="new-message-indicator"]');
      expect(indicator.exists()).toBe(true);
    });

    it('should hide the unread-count circle when newMessageIndicator and unreadMessages are both set', async () => {
      await wrapper.setProps({
        newMessageIndicator: true,
        unreadMessages: 5,
      });

      const indicator = wrapper.find('[data-testid="new-message-indicator"]');
      const unreadCount = wrapper.find(
        '.chats-contact__infos__unread-messages',
      );

      expect(indicator.exists()).toBe(true);
      expect(unreadCount.exists()).toBe(false);
    });

    it('should keep tooltip disabled when newMessageIndicatorTooltip is empty', async () => {
      await wrapper.setProps({
        newMessageIndicator: true,
        newMessageIndicatorTooltip: '',
      });

      const tooltip = wrapper.findComponent({ name: 'UnnnicTooltip' });

      expect(tooltip.exists()).toBe(true);
      expect(tooltip.props('enabled')).toBe(false);
      expect(tooltip.props('text')).toBe('');
    });

    it('should enable tooltip with the provided text when newMessageIndicatorTooltip is set', async () => {
      const tooltipText = 'New chats received';

      await wrapper.setProps({
        newMessageIndicator: true,
        newMessageIndicatorTooltip: tooltipText,
      });

      const tooltip = wrapper.findComponent({ name: 'UnnnicTooltip' });

      expect(tooltip.exists()).toBe(true);
      expect(tooltip.props('enabled')).toBe(true);
      expect(tooltip.props('text')).toBe(tooltipText);
    });
  });

  describe('Pending response', () => {
    it('should not render the pending response icon by default', () => {
      const icon = wrapper.find('[data-testid="pending-response-icon"]');
      expect(icon.exists()).toBe(false);
    });

    it('should render the pending response icon when pendingResponse is true', async () => {
      await wrapper.setProps({ pendingResponse: true });

      const icon = wrapper.findComponent(
        '[data-testid="pending-response-icon"]',
      );
      expect(icon.exists()).toBe(true);
      expect(icon.props('icon')).toBe('reply');
      expect(icon.props('scheme')).toBe('fg-info');
    });

    it('should keep tooltip disabled when pendingResponseTooltip is empty', async () => {
      await wrapper.setProps({
        pendingResponse: true,
        pendingResponseTooltip: '',
      });

      const tooltip = wrapper.findComponent({ name: 'UnnnicTooltip' });
      expect(tooltip.exists()).toBe(true);
      expect(tooltip.props('enabled')).toBe(false);
      expect(tooltip.props('text')).toBe('');
    });

    it('should enable tooltip with the provided text when pendingResponseTooltip is set', async () => {
      const tooltipText = 'You did not respond to this contact';

      await wrapper.setProps({
        pendingResponse: true,
        pendingResponseTooltip: tooltipText,
      });

      const tooltip = wrapper.findComponent({ name: 'UnnnicTooltip' });
      expect(tooltip.exists()).toBe(true);
      expect(tooltip.props('enabled')).toBe(true);
      expect(tooltip.props('text')).toBe(tooltipText);
    });
  });
});
