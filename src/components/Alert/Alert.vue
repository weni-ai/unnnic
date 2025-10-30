<template>
  <Version1dot1
    v-if="version === '1.1'"
    v-bind="{ ...$props }"
  />

  <UnnnicToast
    v-else
    :title="text || ''"
    :type="toastType"
    @close="() => onClose()"
  />
</template>

<script lang="ts">
import Version1dot1 from './Version1dot1.vue';
import UnnnicToast from '../Toast/Toast.vue';

export default {
  name: 'UnnnicAlert',
  components: {
    UnnnicToast,
    Version1dot1,
  },
  props: {
    version: {
      type: String,
      default: '1.1',
    },
    text: {
      type: String,
      default: null,
    },
    scheme: {
      type: String,
      default: null,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    toastType() {
      if (this.scheme === 'feedback-green' || this.type === 'success') {
        return 'success';
      }
      if (this.scheme === 'feedback-red' || this.type === 'error') {
        return 'error';
      }
      if (this.type === 'attention') {
        return 'attention';
      }
      return 'informational';
    },
  },
};
</script>
