<template>
  <div>
    <unnic-input v-model="text" />
    {{ text }}
  </div>
</template>

<script>
import unnicInput from './Input.vue';

export default {
  components: { unnicInput },
  data() {
    return {
      text: '',
    };
  },
  mounted() {
    setTimeout(() => {
      this.text = 'valor';
      console.log(this.text);
    }, 1000);
  },
};
</script>
