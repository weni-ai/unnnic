import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import UnnnicEmojiPicker from '../EmojiPicker.vue';

// Mock emoji-mart-vue-fast
vi.mock('emoji-mart-vue-fast/src', () => ({
  Picker: {
    name: 'Picker',
    props: ['data', 'set', 'theme', 'preview', 'search', 'navPosition', 'noResultsEmoji', 'maxFrequentRows', 'locale'],
    emits: ['select', 'click-outside'],
    template: '<div class="emoji-mart-picker"></div>'
  },
  EmojiIndex: vi.fn().mockImplementation(() => ({}))
}));

vi.mock('emoji-mart-vue-fast/data/all.json', () => ({
  default: {}
}));

vi.mock('emoji-mart-vue-fast/css/emoji-mart.css', () => ({}));

describe('UnnnicEmojiPicker', () => {
  let wrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(UnnnicEmojiPicker, {
      props: {
        position: 'top',
        returnName: false,
      },
      global: {
        stubs: {
          Picker: {
            name: 'Picker',
            props: ['data', 'set', 'theme', 'preview', 'search', 'navPosition', 'noResultsEmoji', 'maxFrequentRows', 'locale'],
            emits: ['select', 'click-outside'],
            template: '<div class="emoji-mart-picker" @select="$emit(\'select\', $event)" @click-outside="$emit(\'click-outside\')"></div>'
          }
        }
      }
    });
  });

  it('renders correctly with the correct position class', () => {
    expect(wrapper.classes()).toContain('emoji-picker');
    expect(wrapper.classes()).toContain('emoji-picker--top');
  });

  it('renders the Picker component with correct props', () => {
    const picker = wrapper.findComponent({ name: 'Picker' });
    expect(picker.exists()).toBe(true);
    expect(picker.props('set')).toBe('apple');
    expect(picker.props('theme')).toBe('light');
    expect(picker.props('preview')).toBe(false);
    expect(picker.props('search')).toBe(false);
    expect(picker.props('navPosition')).toBe('bottom');
    expect(picker.props('noResultsEmoji')).toBe('cry');
    expect(picker.props('maxFrequentRows')).toBe(3);
    expect(picker.props('locale')).toBe('pt');
  });

  it('emits "emojiSelected" with the correct data when an emoji is selected', async () => {
    const emojiMock = { id: 'smile', native: '😊' };
    const picker = wrapper.findComponent({ name: 'Picker' });

    await picker.vm.$emit('select', emojiMock);
    expect(wrapper.emitted('emojiSelected')).toBeTruthy();
    expect(wrapper.emitted('emojiSelected')[0]).toEqual(['😊']);
  });

  it('emits "emojiSelected" with the name when `returnName` is true', async () => {
    await wrapper.setProps({ returnName: true });

    const emojiMock = { id: 'smile', native: '😊' };
    const picker = wrapper.findComponent({ name: 'Picker' });

    await picker.vm.$emit('select', emojiMock);
    expect(wrapper.emitted('emojiSelected')).toBeTruthy();
    expect(wrapper.emitted('emojiSelected')[0]).toEqual(['smile']);
  });

  it('emits "close" when `click-outside` is triggered', async () => {
    const picker = wrapper.findComponent({ name: 'Picker' });

    await picker.vm.$emit('click-outside');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('updates position class when position prop changes', async () => {
    expect(wrapper.classes()).toContain('emoji-picker--top');
    
    await wrapper.setProps({ position: 'bottom' });
    expect(wrapper.classes()).toContain('emoji-picker--bottom');
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
