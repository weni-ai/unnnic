import { action } from '@storybook/addon-actions';

import UnnnicChatText from '../components/ChatText/ChatText.vue';
import UnnnicButtonIcon from '../components/Button/ButtonIcon.vue';
import colorsList from '../utils/colorsList';

export default {
  title: 'Data Display/ChatText',
  component: UnnnicChatText,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['normal', 'small'] },
    titleColor: {
      control: 'select',
      options: colorsList,
    },
  },
  render: (args) => ({
    components: {
      UnnnicChatText,
      UnnnicButtonIcon,
    },
    setup() {
      return { args };
    },
    methods: {
      actionClick() {
        action('action-click')();
      },
    },
    template: `
      <div>
        <UnnnicChatText v-bind="args">
          <template #actions>
            <UnnnicButtonIcon
              @click="actionClick"
              type="secondary"
              size="small"
              icon="pencil-write-1"
            />
          </template>

          <template #description>
            <span class="intent">Lorem</span> Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </template>
        </UnnnicChatText>
      </div>
    `,
  }),
};

export const Default = {
  args: {
    title: 'Title',
    info: 'Info',
  },
};
