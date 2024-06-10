import UnnnicCollapse from '../components/Collapse/Collapse.vue';

export default {
  title: 'accordion/Collapse',
  component: UnnnicCollapse,
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
  render: (args) => ({
    setup() {
      return { args };
    },
    components: {
      UnnnicCollapse,
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

      <unnnic-collapse v-bind="args" v-model="active">
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


      <b  >With header slot:</b>

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
  }),
};

export const Default = {
  args: {
    title: 'Title prop or header slot',
  },
};
