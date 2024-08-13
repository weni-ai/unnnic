import UnnnicButton from '../components/Button/Button.vue';
import UnnnicEmojiPicker from '../components/EmojiPicker/EmojiPicker.vue';

export default {
  title: 'Form/EmojiPicker',
  decorators: () => {
    return {
      template:
        '<div style="height: 90vh; display: flex; align-items: end"><story/></div>',
    };
  },
};

export const Default = () => ({
  components: { UnnnicEmojiPicker, UnnnicButton },
  template: `
    <section style="position: relative;">
      <UnnnicButton @click.stop="handleEmojiPicker" type="secondary" iconCenter="emoji" size="small"/>
      <UnnnicEmojiPicker
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
        this.inputValue += event;
      } else {
        this.inputValue = event.target.value;
      }
    },
  },
});

export const EmojiName = () => ({
  components: { UnnnicEmojiPicker, UnnnicButton },
  template: `
    <section style="position: relative;">
      <UnnnicButton @click.stop="handleEmojiPicker" type="secondary" iconCenter="emoji" size="small"/>
      <UnnnicEmojiPicker
        v-show="isEmojiPickerOpen"
        returnName
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
});
