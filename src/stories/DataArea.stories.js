import UnnnicDataArea from '../components/DataArea/DataArea.vue';
import UnnnicButton from '../components/Button/Button.vue';
import { unnnicFontSize } from '../components/config';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Data Display/DataArea',
  tags: ['autodocs'],
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
        action('click')();
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
        <UnnnicDataArea v-bind="args">
          <template #links>
            <div :style="slotStyle">
              <a href="#" @click.prevent="click" :style="linkStyle">Link1</a>
              <a href="#" @click.prevent="click" :style="linkStyle">Link2</a>
            </div>
          </template>
  
          <template #buttons>
            <div :style="slotStyle">
              <UnnnicButton
                size="small"
                type="secondary"
                iconCenter="copy-paste-1"
                @click="click"
              />
              <UnnnicButton
                size="small"
                type="secondary"
                iconCenter="button-refresh-arrows-1"
                @click="click"
              />
            </div>
          </template>
        </UnnnicDataArea>
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
