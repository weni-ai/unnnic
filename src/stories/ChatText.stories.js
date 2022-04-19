import unnnicChatText from '../components/ChatText/ChatText.vue';
import UnnnicButtonIcon from '../components/Button/ButtonIcon.vue';

export default {
  title: 'example/ChatText',
  component: unnnicChatText,
  argTypes: {
    size: { control: { type: 'select', options: ['normal', 'small'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicChatText,
    UnnnicButtonIcon,
  },

  data() {
    return {};
  },

  template: `
    <div>
      <unnnic-chat-text v-bind="$props" @action="click">
        <template slot="actions">
          <unnnic-button-icon
            @click="click"
            type="secondary"
            size="small"
            icon="pencil-write-1"
          ></unnnic-button-icon>
        </template>

        <template slot="description">
          <span class="intent">Lorem</span> Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </template>
      </unnnic-chat-text>
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
  title: 'Title',
  info: 'Info',
};
