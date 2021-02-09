<template>
  <div>
    <unnnic-input v-model="text" />
    {{ text }}
  </div>
</template>

<script>
import unnnicInput from './Input.vue';

export default {
  components: { unnnicInput },
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
