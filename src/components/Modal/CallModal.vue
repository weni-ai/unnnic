<template>
  <button @click="onClick()">click me</button>
</template>

<script>
import call from '../../utils/call';

export default {
  methods: {
    onClick() {
      call.callModal({
        props: {
          text: 'Title',
          modalIcon: 'alert-circle-1',
          description: 'description',
          alertMessage: 'alert message',
          scheme: 'feedback-yellow',
        },
      });
    },
  },
};
</script>
