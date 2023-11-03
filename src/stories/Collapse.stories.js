import unnnicCollapse from '../components/Collapse/Collapse.vue';

export default {
  title: 'accordion/Collapse',
  component: unnnicCollapse,
  argTypes: {
    'on-update:model-value': { action: '@update:model-value' },
    size: {
      control: {
        type: 'select',
        options: ['md', 'lg'],
      },
    },
    borderBottom: { control: { type: 'boolean' } },
    unspacedIcon: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicCollapse,
  },

  data() {
    return {
      active: true,
    };
  },

  template: `
    <div>
      <button @click="active = !active">External change active</button>

      <pre>v-model: {{ active }}</pre>

      <unnnic-collapse v-bind="$props" v-model="active">
        Default slot
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </unnnic-collapse>

<pre>

<b>Basic usage:</b>

&lt;unnnic-collapse title="Title"&gt;
  Collapse body
&lt;/unnnic-collapse&gt;


<b>With header slot:</b>

&lt;unnnic-collapse&gt;
  &lt;template slot="header"&gt;Title&lt;/template&gt;

  Collapse body
&lt;/unnnic-collapse&gt;


<b>With v-model:</b>

&lt;unnnic-collapse title="Title" v-model="active"&gt;
  Collapse body
&lt;/unnnic-collapse&gt;


<b>Complete usage:</b>

&lt;unnnic-collapse
  title           String
  border-bottom   Boolean
  unspaced-icon   Boolean
  active          Boolean
  @change         Boolean Event
&gt;
  &lt;template slot="header"&gt;Title&lt;/template&gt;

  Collapse body
&lt;/unnnic-collapse&gt;
</pre>
    </div>
  `,

  methods: {
    click() {},
  },
});

export const Default = Template.bind({});

Default.args = {
  title: 'Title prop or header slot',
};
