import UnnnicTableNext from '../components/TableNext/TableNext.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'example/TableNext',
  component: UnnnicTableNext,
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
      :pagination.sync="pagination"
      :paginationTotal="125"
      :paginationInterval="5"
    />
  `,

  data() {
    return {
      pagination: 1,
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
          click: (event) => {
            event.preventDefault();
            // eslint-disable-next-line no-alert
            console.log('click');
          },
        },
      },
    };
  },

  created() {
    this.table.rows = [
      {
        content: ['1', 'Alice', '30', 'USA', this.addButton],
        link: {
          url: 'https://weni.ai/',
          target: '_blank',
        },
      },
      {
        content: ['2', 'Bob', '25', 'Canada', this.addButton],
        link: {
          url: 'https://weni.ai/',
        },
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
    ];
  },
});

export const Default = Template.bind({});
Default.args = {};
