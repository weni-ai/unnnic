import unnnicSelect from '../components/Select/Select.vue';
import unnnicSelectItem from '../components/Select/SelectItem.vue';

export default {
  title: 'example/Select',
  component: unnnicSelect,
  argTypes: {
    size: { control: { type: 'select', options: ['md', 'sm'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSelect, unnnicSelectItem },
  template: '<unnnicSelect v-bind="$props"> <unnnicButton slot="trigger" /> <unnnicSelectItem> Item1 </unnnicSelectItem> <unnnicSelectItem> Item2 </unnnicSelectItem> </unnnicSelect>',
});

export const Medium = Template.bind({});
