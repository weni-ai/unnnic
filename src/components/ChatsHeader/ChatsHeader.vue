<template>
  <header>
    <div class="handlers" v-if="['dashboard', 'history'].includes(type)">
      <unnnic-breadcrumb />
      <unnnic-button-close @close="close" />
    </div>
    <div>
      <unnnic-icon icon="keyboard-arrow-left-1" size="xs" class="clickable" />
      <section>
        <unnnic-avatar-icon scheme="aux-purple"/>

        <hgroup>
          <h1>Dashboard</h1>
          <h2>Construtora Stéfani</h2>
        </hgroup>

        <div>

        </div>
      </section>
    </div>
    <!-- add margin right 24px -->
    <unnnic-button-close @close="close" />
  </header>
</template>
<script>
import UnnnicButtonClose from '../ButtonClose/ButtonClose.vue';

export default {
  name: 'ChatsHeader',

  components: {
    UnnnicButtonClose,
  },

  props: {
    type: {
      type: String,
      required: true,
      default: 'dashboard',
      validator(value) {
        return ['contact', 'dashboard', 'history'].includes(value);
      },
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    backButton: {
      type: Boolean,
      default: false,
    },
  },

};
</script>
<style lang="scss" scoped>

</style>
