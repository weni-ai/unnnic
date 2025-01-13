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
        lastMessage: 'Message',
      },
    });
  });

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should hours last interaction time', async () => {
    const isoDate = moment().toISOString();

    await wrapper.setProps({ lastInteractionTime: isoDate });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe(moment(isoDate).format('HH:mm'));
  });

  it('should Yesterday last interaction time', async () => {
    const isoDate = moment().subtract({ day: 1 }).toISOString();

    await wrapper.setProps({ lastInteractionTime: isoDate });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe('Yesterday');
  });

  it('should date last interaction time', async () => {
    const isoDate = moment().subtract({ day: 3 }).toISOString();

    await wrapper.setProps({ lastInteractionTime: isoDate });

    const interactionTimeText = wrapper.find(
      '[data-testid="last-interaction-time"]',
    );

    expect(interactionTimeText.exists()).toBe(true);
    expect(interactionTimeText.text()).toBe(moment(isoDate).format('L'));
  });
});
