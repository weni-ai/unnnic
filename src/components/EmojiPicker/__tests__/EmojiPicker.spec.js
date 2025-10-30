import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UnnnicEmojiPicker from '../EmojiPicker.vue';

vi.mock('emoji-mart-vue-fast/src', () => ({
  Picker: {
    name: 'Picker',
    props: [
      'data',
      'set',
      'theme',
      'preview',
      'search',
      'navPosition',
      'noResultsEmoji',
      'maxFrequentRows',
      'i18n',
      'color',
    ],
    emits: ['select', 'click-outside'],
    template: '<div class="emoji-mart-picker"></div>',
  },
  EmojiIndex: vi.fn().mockImplementation(() => ({})),
}));

vi.mock('emoji-mart-vue-fast/data/all.json', () => ({
  default: {},
}));

vi.mock('emoji-mart-vue-fast/css/emoji-mart.css', () => ({}));

vi.mock('../../utils/plugins/i18n', () => {
  const current = 'pt-br';
  return {
    default: {
      global: {
        get locale() {
          return current;
        },
        set locale(_v) {},
        t: (key) => `${key}`,
      },
    },
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
      global: {
        config: {
          errorHandler: () => {},
          warnHandler: () => {},
        },
        stubs: {
          Picker: {
            name: 'Picker',
            props: [
              'data',
              'set',
              'theme',
              'emoji',
              'title',
              'showPreview',
              'search',
              'navPosition',
              'noResultsEmoji',
              'maxFrequentRows',
              'i18n',
              'color',
            ],
            emits: ['select', 'click-outside'],
            template:
              '<div class="emoji-mart-picker" @select="$emit(\'select\', $event)" @click-outside="$emit(\'click-outside\')"></div>',
          },
        },
      },
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
    expect(picker.props('emoji')).toBe('point_up');
    expect(picker.props('title')).toBe('Escolha seu emoji...');
    expect(picker.props('showPreview')).toBe(true);
    expect(picker.props('search')).toBe(true);
    expect(picker.props('navPosition')).toBe('bottom');
    expect(picker.props('noResultsEmoji')).toBe('cry');
    expect(picker.props('maxFrequentRows')).toBe(3);
    expect(picker.props('color')).toBe('#00A49F');
    expect(picker.props('i18n')).toBeDefined();
  });

  it('emits "emojiSelected" with the correct data when an emoji is selected', async () => {
    const emojiMock = { id: 'smile', native: '😊' };
    const picker = wrapper.findComponent({ name: 'Picker' });

    await picker.vm.$emit('select', emojiMock);
    expect(wrapper.emitted('emojiSelected')).toBeTruthy();
    expect(wrapper.emitted('emojiSelected')[0]).toEqual(['😊']);
  });

  it('emits "emojiSelected" with the name when `returnName` is true', async () => {
    const custom = mount(UnnnicEmojiPicker, {
      props: { position: 'top', returnName: true },
      global: {
        stubs: {
          Picker: {
            name: 'Picker',
            props: [
              'data',
              'set',
              'theme',
              'emoji',
              'title',
              'showPreview',
              'search',
              'navPosition',
              'noResultsEmoji',
              'maxFrequentRows',
              'i18n',
              'color',
            ],
            emits: ['select', 'click-outside'],
            template:
              '<div class="emoji-mart-picker" @select="$emit(\'select\', $event)"></div>',
          },
        },
      },
    });

    const emojiMock = { id: 'smile', native: '😊' };
    const picker = custom.findComponent({ name: 'Picker' });

    await picker.vm.$emit('select', emojiMock);
    expect(custom.emitted('emojiSelected')).toBeTruthy();
    expect(custom.emitted('emojiSelected')[0]).toEqual(['smile']);
    custom.unmount();
  });

  it('emits "close" when clicking outside the component', async () => {
    // Simula um click fora do componente
    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);

    const clickEvent = new Event('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { value: outsideElement });

    document.dispatchEvent(clickEvent);

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('close')).toBeTruthy();

    // Cleanup
    document.body.removeChild(outsideElement);
  });

  it('renders bottom position class when position is bottom', async () => {
    const custom = mount(UnnnicEmojiPicker, {
      props: { position: 'bottom' },
      global: {
        stubs: {
          Picker: {
            name: 'Picker',
            props: [
              'data',
              'set',
              'theme',
              'emoji',
              'title',
              'showPreview',
              'search',
              'navPosition',
              'noResultsEmoji',
              'maxFrequentRows',
              'i18n',
              'color',
            ],
            template: '<div />',
          },
        },
      },
    });
    expect(custom.classes()).toContain('emoji-picker--bottom');
    custom.unmount();
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

  it('uses pt-br as default locale', () => {
    const picker = wrapper.findComponent({ name: 'Picker' });
    const i18nProp = picker.props('i18n');
    expect(i18nProp).toBeDefined();
    expect(i18nProp.search).toBeDefined();
  });

  it('uses custom locale when provided', async () => {
    await wrapper.setProps({ locale: 'en' });
    const picker = wrapper.findComponent({ name: 'Picker' });
    const i18nProp = picker.props('i18n');
    expect(i18nProp).toBeDefined();
    expect(i18nProp.search).toBeDefined();
  });
});
