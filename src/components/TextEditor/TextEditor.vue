<template>
  <div class="unnnic-text-editor">
    <div class="text-editor" @click="$refs.oDoc.focus()">
      <div
        class="inside"
        contenteditable="true"
        ref="oDoc"
        v-html="initialContent"
        @input="onInput"
        @keydown="$emit('keydown', $event)"
      ></div>

      <div v-if="$slots['footer-input']" class="footer-input" @click.stop>
        <slot name="footer-input" />
      </div>
    </div>

    <div class="actions">
      <unnnic-button-icon
        @click="$emit('action')"
        type="secondary"
        size="small"
        icon="flash-1-3"
      />

      <unnnic-button-icon
        @click="$emit('send')"
        type="primary"
        size="small"
        icon="send-email-3-1"
      />
    </div>

    <div class="format">
      <unnnic-tool-tip
        side="top"
        text="Undo"
        enabled
      >
        <unnnic-icon
          icon="arrow-undo"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @click="formatDoc('undo')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        text="Redo"
        enabled
      >
        <unnnic-icon
          icon="arrow-redo"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @click="formatDoc('redo')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        text="Record Audio"
        enabled
      >
        <unnnic-icon
          icon="microphone"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @mousedown="$emit('record-audio-down')"
          @mouseup="$emit('record-audio-up')"
          @click="$emit('record-audio')"
        />
      </unnnic-tool-tip>

      <!-- <unnnic-icon
        icon="email-action-unread-1"
        size="ant"
        clickable
        scheme="neutral-cleanest"
      /> -->

      <unnnic-tool-tip
        side="top"
        text="Bold"
        enabled
        :style="{ marginLeft: '1rem', }"
      >
        <unnnic-icon
          icon="text-bold"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @click="formatDoc('bold')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        text="Italic"
        enabled
      >
        <unnnic-icon
          icon="text-italic"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @click="formatDoc('italic')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        text="Underline"
        enabled
      >
        <unnnic-icon
          icon="text-underline"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @click="formatDoc('underline')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        text="List"
        enabled
      >
        <unnnic-icon
          icon="unordered-list"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @click="formatDoc('insertunorderedlist')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        text="Left"
        enabled
      >
        <unnnic-icon
          icon="text-left"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @click="formatDoc('justifyleft')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        text="Center"
        enabled
      >
        <unnnic-icon
          icon="text-center"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @click="formatDoc('justifycenter')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        text="Right"
        enabled
      >
        <unnnic-icon
          icon="text-right"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @click="formatDoc('justifyright')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        text="Justify"
        enabled
      >
        <unnnic-icon
          icon="text-justified"
          size="ant"
          clickable
          scheme="neutral-cleanest"
          @click="formatDoc('justifyFull')"
        />
      </unnnic-tool-tip>
    </div>
  </div>
</template>

<script>
import UnnnicButtonIcon from '../Button/ButtonIcon.vue';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicButtonIcon,
    UnnnicToolTip,
    UnnnicIcon,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      initialContent: '',
    };
  },

  created() {
    this.initialContent = this.value;
  },

  methods: {
    formatDoc(sCmd, sValue) {
      this.$refs.oDoc.focus();
      document.execCommand(sCmd, false, sValue);
      this.$refs.oDoc.focus();
    },

    validateMode() {
      return this.$refs.oDoc.focus();
    },

    onInput(event) {
      this.$emit('input', event.srcElement.innerHTML);
    },

    setValue(value) {
      this.$refs.oDoc.innerHTML = value;
      this.$emit('input', this.$refs.oDoc.innerHTML);
    },

    clear() {
      this.$refs.oDoc.innerHTML = '';
      this.$emit('input', this.$refs.oDoc.innerHTML);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-text-editor {
  display: grid;
  grid-template-areas:
    "text-editor actions"
    "format empty";
  grid-template-columns: 1fr auto;
  grid-column-gap: $unnnic-spacing-inline-xs;

  .text-editor {
    grid-area: text-editor;
    height: 7.25rem;
    box-sizing: border-box;
    overflow: auto;
    background-color: $unnnic-color-neutral-snow;
    border-radius: $unnnic-border-radius-sm;
    padding: $unnnic-spacing-inset-sm;
    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-clean;
    outline: none;
    color: $unnnic-color-neutral-cloudy;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    font-weight: $unnnic-font-weight-regular;
    cursor: text;
    display: flex;
    flex-direction: column;

    .inside {
      flex: 1;
      outline: none;
    }

    .footer-input {
      margin-top: $unnnic-spacing-stack-xs;
      align-self: flex-start;
      cursor: initial;
    }

    p {
      margin: 0;
    }
  }

  .actions {
    grid-area: actions;
    display: flex;
    flex-direction: column;
    gap: $unnnic-spacing-stack-xs;
    place-self: center;
  }

  .format {
    grid-area: format;
    place-self: center;
    padding: $unnnic-spacing-inset-nano;
    user-select: none;
    display: flex;
    gap: $unnnic-spacing-inline-xs;
  }
}
</style>
