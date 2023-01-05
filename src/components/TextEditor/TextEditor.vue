<template>
  <div :class="['unnnic-text-editor', loadingValue !== undefined && 'status-loading']">
    <div v-if="loadingValue !== undefined" class="loading">
      <div class="indicator" :style="{ width: `${loadingValue * 100}%` }"></div>
    </div>

    <div class="text-editor" @click="$refs.oDoc.focus()">
      <textarea
        class="inside"
        ref="oDoc"
        :value="value"
        @input="$emit('input', $event.srcElement.value)"
        @keydown="$emit('keydown', $event)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      ></textarea>

      <!-- <div
        class="inside"
        contenteditable="true"
        v-html="initialContent"
        @input="onInput"
        @keydown="$emit('keydown', $event)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      ></div> -->

      <div v-if="$slots['footer-input']" class="footer-input" @click.stop>
        <slot name="footer-input" />
      </div>
    </div>

    <div class="actions">
      <unnnic-tool-tip
        side="left"
        :text="text('action')"
        enabled
      >
        <unnnic-button-icon
          @click="$emit('action')"
          type="secondary"
          size="small"
          icon="flash-1-4"
        />
      </unnnic-tool-tip>

      <unnnic-button-icon
        @click="$emit('send')"
        type="secondary"
        size="small"
        icon="send-email-3-1"
      />
    </div>

    <div class="format">
      <unnnic-tool-tip
        side="top"
        :text="text('Undo')"
        enabled
      >
        <unnnic-icon
          icon="arrow-undo"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @click="formatDoc('undo')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        :text="text('Redo')"
        enabled
      >
        <unnnic-icon
          icon="arrow-redo"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @click="formatDoc('redo')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        :text="text('RecordAudio')"
        enabled
      >
        <unnnic-icon
          icon="microphone"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @mousedown="$emit('record-audio-down')"
          @mouseup="$emit('record-audio-up')"
          @click="$emit('record-audio')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        :text="text('Attach')"
        :enabled="!attachmentOptionsOpen"
      >
        <unnnic-dropdown
          :open.sync="attachmentOptionsOpen"
          position="none"
          class="attachment-options-dropdown"
        >
          <unnnic-icon
            slot="trigger"
            icon="attachment"
            size="ant"
            clickable
            scheme="neutral-cloudy"
          />

          <div class="attachment-options-container">
            <slot name="attachment-options" />
          </div>
        </unnnic-dropdown>
      </unnnic-tool-tip>

      <!-- <unnnic-icon
        icon="email-action-unread-1"
        size="ant"
        clickable
        scheme="neutral-cloudy"
      /> -->

      <!--

      <unnnic-tool-tip
        side="top"
        :text="text('Bold')"
        enabled
        :style="{ marginLeft: '1rem', }"
      >
        <unnnic-icon
          icon="text-bold"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @click="formatDoc('bold')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        :text="text('Italic')"
        enabled
      >
        <unnnic-icon
          icon="text-italic"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @click="formatDoc('italic')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        :text="text('Underline')"
        enabled
      >
        <unnnic-icon
          icon="text-underline"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @click="formatDoc('underline')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        :text="text('List')"
        enabled
      >
        <unnnic-icon
          icon="unordered-list"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @click="formatDoc('insertunorderedlist')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        :text="text('Left')"
        enabled
      >
        <unnnic-icon
          icon="text-left"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @click="formatDoc('justifyleft')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        :text="text('Center')"
        enabled
      >
        <unnnic-icon
          icon="text-center"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @click="formatDoc('justifycenter')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        :text="text('Right')"
        enabled
      >
        <unnnic-icon
          icon="text-right"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @click="formatDoc('justifyright')"
        />
      </unnnic-tool-tip>

      <unnnic-tool-tip
        side="top"
        :text="text('Justify')"
        enabled
      >
        <unnnic-icon
          icon="text-justified"
          size="ant"
          clickable
          scheme="neutral-cloudy"
          @click="formatDoc('justifyFull')"
        />
      </unnnic-tool-tip>

      -->
    </div>
  </div>
</template>

<script>
import UnnnicButtonIcon from '../Button/ButtonIcon.vue';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';
import UnnnicIcon from '../Icon.vue';
import UnnnicDropdown from '../Dropdown/Dropdown.vue';

export default {
  components: {
    UnnnicButtonIcon,
    UnnnicToolTip,
    UnnnicIcon,
    UnnnicDropdown,
  },

  props: {
    loadingValue: {
      type: Number,
    },

    value: {
      type: String,
      default: '',
    },

    texts: {
      type: Object,
      default() {
        return {
          Undo: 'Undo',
          Redo: 'Redo',
          RecordAudio: 'Record Audio',
          Bold: 'Bold',
          Italic: 'Italic',
          Underline: 'Underline',
          List: 'List',
          Left: 'Left',
          Center: 'Center',
          Right: 'Right',
          Justify: 'Justify',
          Attach: 'Attach',
          action: 'Mensagens rápidas',
        };
      },
    },

    tags: {
      type: Array,
      default() {
        return ['b', 'i', 'u', 'ul', 'li', 'br', 'div'];
      },
    },

    attributes: {
      type: Array,
      default() {
        return ['style'];
      },
    },

    styleProperties: {
      type: Array,
      default() {
        return ['text-align'];
      },
    },
  },

  data() {
    return {
      initialContent: '',

      attachmentOptionsOpen: false,

      isFocused: false,

      lastValueFromInside: '',
    };
  },

  computed: {},

  created() {
    this.initialContent = this.value;
    document.execCommand('defaultParagraphSeparator', false, 'div');
  },

  watch: {
    value: {
      immediate: true,

      handler() {
        // if (this.value !== this.lastValueFromInside) {
        //   this.$refs.oDoc.innerHTML = this.value;
        // }

        this.$nextTick(() => {
          this.$refs.oDoc.style.minHeight = 0;
          this.$refs.oDoc.style.minHeight = `${this.$refs.oDoc.scrollHeight}px`;
        });
      },
    },
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

    emitInput() {
      this.lastValueFromInside = this.$refs.oDoc.innerHTML;

      this.lastValueFromInside = this.lastValueFromInside.replace(/<(\/)?([^> ]+)( [^>]+)?>/gi, ($1, $2 = '', $3, $4 = '') => {
        if (this.tags.includes($3)) {
          const complements = [];

          // eslint-disable-next-line no-restricted-syntax
          for (const i of $4.matchAll(/((?<name1>[^ =]+)="(?<value1>[^"]*)"|(?<name2>[^ =]+)='(?<value2>[^"]*)')/g)) {
            const name = i.groups.name1 || i.groups.name2;
            const value = i.groups.value1 || i.groups.value2;

            if (this.attributes.includes('style') && name === 'style') {
              const styles = [];

              // eslint-disable-next-line no-restricted-syntax
              for (const j of value.matchAll(/(?<propertyName>[^:]+):(?<propertyValue>[^;]+);?/g)) {
                if (this.styleProperties.includes(j.groups.propertyName.toLowerCase().trim())) {
                  styles.push(`${j.groups.propertyName.toLowerCase().trim()}: ${j.groups.propertyValue.trim()}`);
                }
              }

              complements.push(`style="${styles.join('; ')};"`);
            }
          }

          return `<${$2}${$3}${complements.length ? ` ${complements.join(' ')}` : ''}>`;
        }

        return '';
      });

      this.$emit('input', this.lastValueFromInside);
    },

    onInput() {
      this.emitInput();
    },

    setValue(value) {
      this.$refs.oDoc.innerHTML = value;
      this.emitInput();
    },

    clear() {
      this.$refs.oDoc.innerHTML = '';
      this.emitInput();
    },

    text(key) {
      return this.texts[key];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-text-editor {
  display: grid;
  grid-template-areas:
    "loading loading-side"
    "text-editor actions"
    "format empty";
  grid-template-columns: 1fr auto;
  grid-column-gap: $unnnic-spacing-inline-xs;

  .loading {
    grid-area: loading;
    width: 100%;
    height: $unnnic-border-width-thin;
    border-radius: $unnnic-border-radius-sm $unnnic-border-radius-sm 0 0;
    position: relative;
    overflow: hidden;
    background-color: rgba($unnnic-color-neutral-cleanest, $unnnic-opacity-level-light);

    .indicator {
      height: $unnnic-border-width-thin;
      background-color: $unnnic-color-neutral-cleanest;
      transition: width 0.2s;
    }
  }

  &:not(.status-loading) .text-editor {
    border-radius: $unnnic-border-radius-sm;
  }

  .text-editor {
    grid-area: text-editor;
    height: 7.25rem;
    box-sizing: border-box;
    overflow: auto;
    background-color: $unnnic-color-neutral-snow;
    border-radius: 0 0 $unnnic-border-radius-sm $unnnic-border-radius-sm;
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
      color: $unnnic-color-neutral-cloudy;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-regular;
      border: none;
      padding: 0;
      resize: none;
      overflow-y: hidden;

      flex: 1;
      outline: none;

      ::v-deep p {
        margin: 0;
      }
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

    .attachment-options-dropdown ::v-deep .unnnic-dropdown__content {
      padding: 0;
      bottom: 100%;
      margin-bottom: 0.5rem;
      right: (-10.375rem / 2) + 0.625rem;
    }

    .attachment-options-container {
      width: 10.375rem;
    }
  }
}
</style>
