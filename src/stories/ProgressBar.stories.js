import unnnicProgressBar from '../components/ProgressBar/ProgressBar.vue';

export default {
  title: 'Progress/ProgressBar',
  component: unnnicProgressBar,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['primary', 'secondary'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicProgressBar,
  },

  data() {
    return {
      percentage: 25,
    };
  },

  template: `
    <div>
      <pre>v-model: {{ percentage }}</pre>
      <unnnic-progress-bar v-model="percentage" v-bind="$props">
      </unnnic-progress-bar>
    </div>
  `,

  methods: {},
});

export const Primary = Template.bind({});

Primary.args = {
  title: 'Title name',
};

export const Secondary = Template.bind({});

Secondary.args = {
  title: 'Title name',
  type: 'secondary',
};

export const Inline = Template.bind({});

Inline.args = {
  title: 'Title name',
  inline: true,
};

export const Subtitle = Template.bind({});

Subtitle.args = {
  title: 'test',
  subtitle: 'Subtitle or description',
};

export const SubtitleCanClose = Template.bind({});

SubtitleCanClose.args = {
  title: 'test',
  subtitle: 'Subtitle or description',
  canClose: true,
};
