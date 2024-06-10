import UnnnicDataArea from '../components/DataArea/DataArea.vue';
import UnnnicButton from '../components/Button/Button.vue';
import { unnnicFontSize } from '../components/config';

export default {
  title: 'example/DataArea',
  component: UnnnicDataArea,
  argTypes: {
    title: { control: { type: 'text' } },
    text: { control: { type: 'text' } },
    enableHover: { control: { type: 'boolean' } },
    hoverText: { control: { type: 'text' } },
  },
  render: (args) => ({
    components: {
      UnnnicDataArea,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    methods: {
      click() {
        console.log('clicked');
      },
    },
    data() {
      return {
        slotStyle: {
          display: 'flex',
          gap: `${0.5 * unnnicFontSize}px`,
          color: 'red',
        },
        linkStyle: {
          color: 'DimGray',
        },
      };
    },
    template: `
      <div>
        <unnnic-data-area v-bind="args">
          <template #links>
            <div :style="slotStyle">
              <a href="#" :style="linkStyle">Link1</a>
              <a href="#" :style="linkStyle">Link2</a>
            </div>
          </template>
  
          <template #buttons>
            <div :style="slotStyle">
              <unnnic-button
                size="small"
                type="secondary"
                iconCenter="copy-paste-1"
              />
              <unnnic-button
                size="small"
                type="secondary"
                iconCenter="button-refresh-arrows-1"
              />
            </div>
          </template>
        </unnnic-data-area>
      </div>
    `,
  }),
};

export const Default = {
  args: {
    title: 'Title text',
    text: '1e65416859c4cdff11cf94a70ce7395eba0f494d',
  },
};
