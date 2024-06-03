import UnnnicTableNext from '../components/TableNext/TableNext.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'example/TableNext',
  component: UnnnicTableNext,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    UnnnicTableNext,
    UnnnicButton,
  },
  template: `
    <unnnic-table-next
      v-bind="$props"
      :headers="table.headers"
      :rows="table.rows"
    >
    </unnnic-table-next>
  `,

  data() {
    return {
      table: {
        headers: [
          {
            content: 'ID',
          },
          {
            content: 'Name',
          },
          {
            content: 'Age',
          },
          {
            content: 'Country',
          },
          {
            content: 'Add with friend',
          },
        ],
        rows: [],
      },
      addButton: {
        component: UnnnicButton,
        props: {
          text: 'Add',
          type: 'tertiary',
          iconLeft: 'add',
          size: 'small',
        },
        events: {
        // eslint-disable-next-line no-alert
          click: () => alert('click'),
        },
      },
    };
  },

  created() {
    this.table.rows = [
      {
        content: ['1', 'Alice', '30', 'USA', this.addButton],
      },
      {
        content: ['2', 'Bob', '25', 'Canada', this.addButton],
      },
      {
        content: ['3', 'Charlie', '35', 'UK', this.addButton],
      },
      {
        content: ['4', 'Diana', '28', 'Australia', this.addButton],
      },
      {
        content: ['5', 'Ethan', '22', 'New Zealand', this.addButton],
      },
      {
        content: ['6', 'Fiona', '40', 'Ireland', this.addButton],
      },
      {
        content: ['7', 'George', '45', 'Germany', this.addButton],
      },
      {
        content: ['8', 'Hannah', '32', 'France', this.addButton],
      },
      {
        content: ['9', 'Ian', '29', 'Spain', this.addButton],
      },
      {
        content: ['10', 'Julia', '27', 'Italy', this.addButton],
      },
    ];
  },
});

export const Default = Template.bind({});
Default.args = {};
