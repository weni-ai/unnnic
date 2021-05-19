<template>
  <img :src="currentEmote" :title="name" :style="{height: `${height}em`}"/>
</template>

<script>
import emojiList from '../../utils/emojiList';

export default {
  data() {
    return {
      emojiList,
    };
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    currentEmote() {
      return require(`../../assets/emoji/${this.emojiList[this.name]}.png`);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  user-select: none;
  margin-bottom: -0.05em;
}
</style>
