import UnnnicMoodRating from '../components/MoodRating/MoodRating.vue';

export default {
  title: 'Rating/MoodRating',
  component: UnnnicMoodRating,
  argTypes: {},
  render: (args) => ({
    setup() {
      return { args };
    },
    components: {
      UnnnicMoodRating,
    },

    data() {
      return {
        mood: null,
      };
    },

    template: `
      <div>
        <pre>v-model: {{ mood }}</pre>
        <unnnic-mood-rating v-bind="args" v-model="mood" />
      </div>
    `,
  }),
  args: {
    title: 'Avalie seu aprendizado nesta aula',
  },
};

export const Default = {};
