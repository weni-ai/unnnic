import UnnnicButton from '../components/Button/Button.vue';
import UnnnicEmojiPicker from '../components/EmojiPicker/EmojiPicker.vue';

export default {
  title: 'Form/EmojiPicker',
  args: {
    returnName: false,
    position: 'top',
  },
  argTypes: {
    returnName: { control: { type: 'boolean' } },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
    },
  },
  decorators: () => {
    return {
      template:
        '<div style="height: 90vh; display: flex; align-items: end"><story/></div>',
    };
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicEmojiPicker, UnnnicButton },
    template: `
    <section style="position: relative;">
      <UnnnicButton @click.stop="handleEmojiPicker" type="secondary" iconCenter="emoji" size="small"/>
      <UnnnicEmojiPicker
        v-bind="args"
        v-show="isEmojiPickerOpen"
        @emojiSelected="handleInput"
        @close="closeEmojiPicker"
      />
      <input
        placeholder="..."
        :value="inputValue"
        @input="handleInput"
      />
    </section>
  `,
    data() {
      return {
        isEmojiPickerOpen: false,
        inputValue: '',
      };
    },
    methods: {
      openEmojiPicker() {
        this.isEmojiPickerOpen = true;
      },
      closeEmojiPicker() {
        this.isEmojiPickerOpen = false;
      },
      handleEmojiPicker() {
        if (this.isEmojiPickerOpen) {
          this.closeEmojiPicker();
        } else {
          this.openEmojiPicker();
        }
      },
      handleInput(event) {
        if (typeof event === 'string') {
          this.inputValue = event;
        } else {
          this.inputValue = event.target.value;
        }
      },
    },
  }),
};

export const Default = {};

export const EmojiName = {
  args: {
    returnName: true,
  },
};

export const PositionBottom = {
  decorators: () => {
    return {
      template:
        '<div style="height: 90vh; display: flex; align-items: start"><story/></div>',
    };
  },
  args: {
    position: 'bottom',
  },
};
