import Card from '../components/Card/Card.vue';
import iconList from '../utils/iconList';
import unnnicButton from '../components/Button/Button.vue';
import unnnicDropdown from '../components/Dropdown/Dropdown.vue';
import unnnicDropdownItem from '../components/Dropdown/DropdownItem.vue';

export default {
  title: 'Example/Card',
  component: Card,
  argTypes: {
    enabled: { control: { type: 'select', options: [true, false] } },
    infoPosition: { control: { type: 'select', options: ['top', 'right', 'bottom', 'left'] } },
    type: { control: { type: 'select', options: ['title', 'dash', 'account', 'status', 'default', 'blank', 'content', 'marketplace'] } },
    icon: { control: { type: 'select', options: iconList } },
    scheme: {
      control: {
        type: 'select',
        options: ['feedback-red', 'feedback-green', 'feedback-yellow', 'feedback-blue', 'feedback-grey',
          'aux-blue', 'aux-purple', 'aux-orange', 'aux-lemon', 'aux-pink', 'brand-weni-soft'],
      },
    },
    typeAction: { control: { type: 'select', options: ['add', 'config', 'edit'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    Card,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem,
  },
  template: `
    <Card v-bind="$props">
      <unnnic-dropdown slot="actions">
        <unnnic-button
          slot="trigger"
          size="small"
          type="secondary"
          iconCenter="cog-1"
        />
        <unnnic-dropdown-item>
          Configure
        </unnnic-dropdown-item>
        <unnnic-dropdown-item>
          Remove
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </Card>
  `,
});

export const Title = Template.bind({});
Title.args = {
  type: 'title',
  title: 'This is the title',
  info: 'This is the info',
  hasInformationIcon: true,
};

export const Dash = Template.bind({});
Dash.args = {
  type: 'dash',
  title: 'This is the title',
  value: 12345,
  percent: 15,
};

export const Status = Template.bind({});
Status.args = {
  type: 'status',
  title: 'This is the title',
  description: 'This is the description',
  status: 'This is the status',
};

export const Account = Template.bind({});
Account.args = {
  type: 'account',
  title: 'This is the title',
  description: 'This is the description',
};

export const Default = Template.bind({});
Default.args = {
  type: 'default',
  title: 'This is the title',
  description: 'This is the description',
};

export const Blank = Template.bind({});
Blank.args = {
  type: 'blank',
  text: 'This is the text',
};

export const Content = Template.bind({});
Content.args = {
  type: 'content',
  title: 'This is the title',
  description: 'This is the description',
  enabled: false,
  icon: 'view-1-1',
};

export const Marketplace = Template.bind({});
Marketplace.args = {
  type: 'marketplace',
  title: 'This is the title',
  description: 'This is the description',
  rating: 4.9,
  comments: '3 comments',
  iconSrc: 'https://api.iconify.design/grommet-icons:slack.svg',
  enabled: false,
  typeAction: 'add',
  clickable: true,
};
