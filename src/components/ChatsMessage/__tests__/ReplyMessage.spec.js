import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

import { createI18n } from 'vue-i18n';
import en from '../../../locales/en.json';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en },
  fallbackWarn: false,
  missingWarn: false,
});

import ReplyMessage from '../ReplyMessage.vue';

const messageTextMock = {
  uuid: '1',
  user: null,
  room: '1',
  contact: { name: 'Contact' },
  text: 'text message',
  media: [],
  content_type: 'text',
};

describe('ReplyMessage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ReplyMessage, {
      global: { plugins: [i18n] },
      props: { replyMessage: messageTextMock, messageType: 'sent' },
    });
  });

  it('renders text content correctly', () => {
    expect(wrapper.find('[data-testid="content-text"]').text()).toBe(
      'text message',
    );
  });

  it('renders attachment content correctly', async () => {
    await wrapper.setProps({
      replyMessage: {
        ...messageTextMock,
        content_type: 'attachment',
        media: [
          {
            content_type: 'application/pdf',
            url: 'http://exmaple.com/file.pdf',
          },
        ],
      },
    });

    const icon = wrapper.findComponent(
      '[data-testid="content-attachment-icon"]',
    );
    const text = wrapper.find('[data-testid="content-attachment"]');

    expect(icon.props().icon).toBe('article');

    expect(text.text()).toContain('file.pdf');
  });

  it('renders image content correctly', async () => {
    await wrapper.setProps({
      replyMessage: {
        ...messageTextMock,
        content_type: 'image',
        media: [
          {
            content_type: 'image/png',
            url: 'http://example.com/image.png',
          },
        ],
      },
    });

    const icon = wrapper.findComponent('[data-testid="content-image-icon"]');
    const text = wrapper.find('[data-testid="content-image"]');
    const preview = wrapper.find('[data-testid="preview-image"]');

    expect(icon.props().icon).toBe('image');

    expect(text.text()).toContain(
      wrapper.vm.$t('chat_message.reply_message.image'),
    );

    expect(preview.attributes().src).toBe('http://example.com/image.png');
  });

  it('renders video content correctly', async () => {
    await wrapper.setProps({
      replyMessage: {
        ...messageTextMock,
        content_type: 'video',
        media: [
          {
            content_type: 'video/mp4',
            url: 'http://example.com/video.mp4',
          },
        ],
      },
    });

    const icon = wrapper.findComponent('[data-testid="content-video-icon"]');
    const text = wrapper.find('[data-testid="content-video"]');
    const preview = wrapper.find('[data-testid="preview-video"]');

    expect(icon.props().icon).toBe('videocam');

    expect(text.text()).toContain(
      wrapper.vm.$t('chat_message.reply_message.video'),
    );

    expect(preview.attributes().src).toBe('http://example.com/video.mp4');
  });

  it('renders audio content correctly', async () => {
    await wrapper.setProps({
      replyMessage: {
        ...messageTextMock,
        content_type: 'audio',
        media: [
          {
            content_type: 'audio/mp3',
            url: 'http://example.com/audio.mp3',
          },
        ],
      },
    });

    const icon = wrapper.findComponent('[data-testid="content-audio-icon"]');
    const text = wrapper.find('[data-testid="content-audio"]');

    expect(icon.props().icon).toBe('mic');

    expect(text.text()).toContain(
      wrapper.vm.$t('chat_message.reply_message.audio'),
    );
  });

  it('emits close event when close icon is clicked', async () => {
    await wrapper.setProps({ showClose: true });
    await wrapper.find('[data-testid="close-icon"]').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('applies correct class and text for user message', async () => {
    await wrapper.setProps({ replyMessage: { ...messageTextMock, user: {} } });

    expect(wrapper.classes()).toContain('reply-message--you');

    const contactName = wrapper.find('[data-testid="contact-name"]');

    expect(contactName.text()).toBe(
      wrapper.vm.$t('chat_message.reply_message.you'),
    );
  });

  it('applies correct class and text for contact message', async () => {
    await wrapper.setProps({
      replyMessage: { ...messageTextMock, contact: { name: 'Contact' } },
    });

    expect(wrapper.classes()).toContain('reply-message--contact');

    const contactName = wrapper.find('[data-testid="contact-name"]');

    expect(contactName.text()).toBe('Contact');
  });
});
