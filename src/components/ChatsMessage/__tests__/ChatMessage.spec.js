import { describe, it, beforeEach, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import ChatsMessage from '../ChatsMessage.vue';

describe('ChatsMessage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ChatsMessage, {
      slots: { default: 'Message text content' },
      props: { time: new Date() },
    });
  });

  it('should show reply icon on hover message', async () => {
    await wrapper.setProps({ enableReply: true });
    await wrapper.trigger('mouseover');

    expect(wrapper.vm.isHovering).toBe(true);
    const replyIcon = wrapper.find('[data-testid="reply-icon"]');

    expect(replyIcon.exists()).toBe(true);

    await replyIcon.trigger('click');

    expect(wrapper.emitted('reply')).toBeTruthy();

    await wrapper.trigger('mouseleave');
    expect(wrapper.vm.isHovering).toBe(false);
  });
});
