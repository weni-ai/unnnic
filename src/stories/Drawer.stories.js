import unnnicDrawer from '../components/Drawer/Drawer.vue';
import unnnicButton from '../components/Button/Button.vue';

export default {
  title: 'Example/Drawer',
  component: unnnicDrawer,
  argTypes: {
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    primaryButtonText: { control: { type: 'text' } },
    secondaryButtonText: { control: { type: 'text' } },
    value: { control: { type: 'boolean' } },
    wide: { control: { type: 'boolean' } },
  },
};

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicDrawer, unnnicButton },
  data() {
    return {
      opened: false,
    };
  },
  template: `
  <div>
  <pre>v-model: {{ opened }}</pre>
  <button @click="opened = !opened">Change</button>
  <unnnic-drawer v-model="opened" v-bind="$props" @close="opened = false">
  </unnnic-drawer>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  description: 'Description',
  primaryButtonText: 'Confirmar',
  secondaryButtonText: 'Cancelar',
  wide: false,
};
