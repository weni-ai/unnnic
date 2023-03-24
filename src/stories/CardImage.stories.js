import UnnnicCardImage from '../components/CardImage/CardImage.vue';
import UnnnicDropdownItem from '../components/Dropdown/DropdownItem.vue';

export default {
  title: 'card/CardImage',
  component: UnnnicCardImage,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: {
    UnnnicCardImage,
    UnnnicDropdownItem,
  },

  props: Object.keys(argTypes),

  data() {
    return {
      v: false,
    };
  },

  template: `<div><pre>v-model: {{ v }}</pre>
  <unnnic-card-image v-model="v" v-bind="$props">
  <template slot="actions">
    <unnnic-dropdown-item>
      Option 1
    </unnnic-dropdown-item>

    <unnnic-dropdown-item>
      Option 2
    </unnnic-dropdown-item>
  </template>
  </unnnic-card-image>
</div>`,
});

export const Default = Template.bind({});

Default.args = {
  title: 'Title Card',
  description: 'Last edit',
  image: 'https://picsum.photos/300/150',
  data: [{
    icon: 'graph-stats-1',
    scheme: 'aux-purple',
    name: 'Data',
    value: '00',
  }, {
    icon: 'graph-stats-1',
    scheme: 'aux-purple',
    name: 'Data',
    value: '00',
  }],
};
