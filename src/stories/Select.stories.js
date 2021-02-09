import unnicSelect from '../components/Select/Select.vue';
import unnicSelectItem from '../components/Select/SelectItem.vue';

export default {
  title: 'example/UnnicSelect',
  component: unnicSelect,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnicSelect, unnicSelectItem },
  template: '<unnicSelect v-bind="$props"> <unnicButton slot="trigger" /> <unnicSelectItem> Item1 </unnicSelectItem> <unnicSelectItem> Item2 </unnicSelectItem> </unnicSelect>',
});

export const Medium = Template.bind({});
