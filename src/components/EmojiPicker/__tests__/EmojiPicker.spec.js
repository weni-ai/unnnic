import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import UnnnicEmojiPicker from '../EmojiPicker.vue';

import { Picker } from 'emoji-mart/';

vi.mock('emoji-mart/', () => {
  return {
    Picker: vi.fn(),
  };
});

describe('UnnnicEmojiPicker', () => {
  let wrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(UnnnicEmojiPicker, {
      props: {
        position: 'top',
        returnName: false,
      },
    });
  });

  it('renders correctly with the correct position class', () => {
    const position = wrapper.vm.position;
    expect(wrapper.classes()).toContain('emoji-picker');
    expect(wrapper.classes()).toContain(`emoji-picker--${position}`);
  });

  it('calls `initPicker` on mount and passes the correct configuration to Picker', () => {
    expect(Picker).toHaveBeenCalledTimes(1);
    const pickerConfig = Picker.mock.calls[0][0];
    expect(pickerConfig).toMatchObject({
      i18n: expect.any(Object),
      parent: wrapper.vm.$refs.pickerContainer,
      onEmojiSelect: expect.any(Function),
      onClickOutside: expect.any(Function),
      data: expect.any(Object),
      set: 'apple',
      theme: 'light',
      previewPosition: 'none',
      searchPosition: 'none',
      navPosition: 'bottom',
      noResultsEmoji: 'cry',
      maxFrequentRows: 3,
    });
  });

  it('emits "emojiSelected" with the correct data when an emoji is selected', () => {
    const emojiMock = { id: 'smile', native: '😊' };
    const onEmojiSelect = Picker.mock.calls[0][0].onEmojiSelect;

    onEmojiSelect(emojiMock);
    expect(wrapper.emitted('emojiSelected')).toBeTruthy();
    expect(wrapper.emitted('emojiSelected')[0]).toEqual(['😊']);
  });

  it('emits "emojiSelected" with the name when `returnName` is true', async () => {
    await wrapper.setProps({ returnName: true });

    const emojiMock = { id: 'smile', native: '😊' };
    const onEmojiSelect = Picker.mock.calls[0][0].onEmojiSelect;

    onEmojiSelect(emojiMock);
    expect(wrapper.emitted('emojiSelected')).toBeTruthy();
    expect(wrapper.emitted('emojiSelected')[0]).toEqual(['smile']);
  });

  it('emits "close" when `onClickOutside` is triggered', () => {
    const onClickOutside = Picker.mock.calls[0][0].onClickOutside;

    onClickOutside();
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('stops event propagation on click', async () => {
    const event = new MouseEvent('click');
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    await wrapper.trigger('click', { stopPropagation: stopPropagationSpy });
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('stops event propagation on keypress "Enter"', async () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    await wrapper.trigger('keypress', {
      key: 'Enter',
      stopPropagation: stopPropagationSpy,
    });
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
