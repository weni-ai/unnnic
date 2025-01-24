<template>
  <button @click="callAlert">Launch alert</button>
</template>

<script>
import alert from '../../utils/call';
import { sanitizeHtml } from '../../utils/sanitize';

export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    scheme: {
      type: String,
      default: null,
    },
    seconds: {
      type: Number,
      default: 3,
    },
    closeText: {
      type: String,
      default: null,
    },
    position: {
      type: String,
      default: 'top-right',
    },
  },
  computed: {
    sanitizedProps() {
      return {
        ...this.$props,
        title: sanitizeHtml(this.title, ['b', 'i', 'u'], 500),
        text: sanitizeHtml(this.text, ['b', 'i', 'u'], 1000),
        closeText: sanitizeHtml(this.closeText, [], 100),
      };
    },
  },
  methods: {
    callAlert() {
      alert.callAlert({ props: this.sanitizedProps, seconds: this.seconds });
    },
  },
};
</script>
