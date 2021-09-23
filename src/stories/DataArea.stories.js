import unnnicDataArea from '../components/DataArea/DataArea.vue';
import unnnicButton from '../components/Button/Button.vue';

export default {
  title: 'example/DataArea',
  component: unnnicDataArea,
  argTypes: {
    title: { control: { type: 'text' } },
    text: { control: { type: 'text' } },
    enableHover: { control: { type: 'boolean' } },
    hoverText: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicDataArea,
    unnnicButton,
  },

  data() {
    return {
      slotStyle: {
        display: 'flex',
        gap: '0.5rem',
        color: 'red',
      },
      linkStyle: {
        color: 'DimGray',
      },
    };
  },

  template: `
    <div>
      <unnnic-data-area v-bind="$props">
        <div slot="links" :style="slotStyle">
          <a href="#" :style="linkStyle">Link1</a>
          <a href="#" :style="linkStyle">Link2</a>
        </div>

        <div slot="buttons" :style="slotStyle">
          <unnnic-button
            slot="trigger"
            size="small"
            type="secondary"
            iconCenter="copy-paste-1"
          />
          <unnnic-button
            slot="trigger"
            size="small"
            type="secondary"
            iconCenter="button-refresh-arrows-1"
          />
        </div>
      </unnnic-data-area>
    </div>
  `,

  methods: {
    click() {
      console.log('clicked');
    },
  },
});

export const Default = Template.bind({});

Default.args = {
  title: 'Title text',
  text: '1e65416859c4cdff11cf94a70ce7395eba0f494d',
};
