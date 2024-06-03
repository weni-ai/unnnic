import UnnnicTableNext from '../components/TableNext/TableNext.vue';

export default {
  title: 'example/TableNext',
  component: UnnnicTableNext,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    UnnnicTableNext,
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
            content: 'Occupation',
          },
        ],
        rows: [
          {
            content: ['1', 'Alice', '30', 'USA', 'Engineer'],
          },
          {
            content: ['2', 'Bob', '25', 'Canada', 'Designer'],
          },
          {
            content: ['3', 'Charlie', '35', 'UK', 'Teacher'],
          },
          {
            content: ['4', 'Diana', '28', 'Australia', 'Developer'],
          },
          {
            content: ['5', 'Ethan', '22', 'New Zealand', 'Student'],
          },
          {
            content: ['6', 'Fiona', '40', 'Ireland', 'Manager'],
          },
          {
            content: ['7', 'George', '45', 'Germany', 'Scientist'],
          },
          {
            content: ['8', 'Hannah', '32', 'France', 'Artist'],
          },
          {
            content: ['9', 'Ian', '29', 'Spain', 'Chef'],
          },
          {
            content: ['10', 'Julia', '27', 'Italy', 'Writer'],
          },
        ],
      },
    };
  },
});

export const Default = Template.bind({});
Default.args = {};
