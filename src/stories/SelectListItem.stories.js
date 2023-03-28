import UnnnicSelectListItem from '../components/SelectListItem/SelectListItem.vue';
import UnnnicDropdownItem from '../components/Dropdown/DropdownItem.vue';

export default {
  title: 'select/SelectListItem',
  component: UnnnicSelectListItem,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: {
    UnnnicSelectListItem,
    UnnnicDropdownItem,
  },

  props: Object.keys(argTypes),

  data() {
    return {
      v: false,
      lItems: [],
    };
  },

  created() {
    this.lItems = this.items;
  },

  methods: {},

  template: `<div><pre>v-model: {{ v }}</pre>

<unnnic-select-list-item v-model="v" v-bind="$props">
  <template slot="actions">
    <unnnic-dropdown-item>
      Option 1
    </unnnic-dropdown-item>

    <unnnic-dropdown-item>
      Option 2
    </unnnic-dropdown-item>
  </template>
</unnnic-select-list-item>

</div>`,
});

export const Default = Template.bind({});

Default.args = {
  title: 'Captura de nome',
  description: 'Editada há 5 minutos',
  data: [
    {
      name: 'Runs:',
      value: '13',
    },
    {
      name: 'Completions',
      value: '45%',
    },
  ],
};
