import unnnicTable from '../components/Table/Table.vue';
import unnnicTableRow from '../components/Table/TableRow.vue';
import unnnicButton from '../components/Button/Button.vue';
import unnnicCheckbox from '../components/Checkbox/Checkbox.vue';

export default {
  title: 'example/Table',
  component: unnnicTable,
  argTypes: {
    loading: { control: { type: 'boolean' } },
    loadingText: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicTable,
    unnnicTableRow,
    unnnicButton,
    unnnicCheckbox,
  },
  template: `
    <div>
      <unnnic-table
        v-bind="$props"
        :items="table.items"
        :style="{ maxHeight: '280px', maxWidth: '800px', }"
      >
        <template v-slot:header>
          <unnnic-table-row :headers="table.headers">
            <template v-slot:checkarea>
              <unnnic-checkbox :value="generalValue" @change="changeGeneralCheckbox" :style="{margin: '4px'}"/>
            </template>
          </unnnic-table-row>
        </template>

        <template v-slot:item="{ item }">
          <unnnic-table-row :headers="table.headers">
            <template v-slot:checkarea>
              <unnnic-checkbox v-model="item.selected" :style="{margin: '4px'}"/>
            </template>

            <template v-slot:project>
              <span :title="item.project">
                {{ item.project }}
              </span>
            </template>

            <template v-slot:contacts>
              <span :title="item.contacts">
                {{ item.contacts }}
              </span>
            </template>

            <template v-slot:export>
              <unnnic-button
                size="small"
                type="secondary"
                iconCenter="upload-bottom-1"
              />
            </template>
          </unnnic-table-row>
        </template>
      </unnnic-table>
    </div>
  `,

  data() {
    return {
      table: {
        headers: [
          {
            id: 'checkarea',
            text: '',
            width: '32px',
          },
          {
            id: 'project',
            text: 'Projeto',
            flex: 1,
          },
          {
            id: 'contacts',
            text: 'Nº Contatos',
            flex: 1,
          },
          {
            id: 'export',
            text: 'Exportar',
            width: '55px',
          },
        ],
        items: [
          {
            selected: false,
            project: 'Funil de Marketing Digital',
            contacts: '125.256.325',
          },
          {
            selected: false,
            project: 'Juntando vetores',
            contacts: '35.251',
          },
          {
            selected: false,
            project: 'Hospital Unimed',
            contacts: '12.478',
          },
        ],
      },
    };
  },

  computed: {
    generalValue() {
      if (!this.table.items.find((item) => item.selected)) {
        return false;
      }

      if (!this.table.items.find((item) => !item.selected)) {
        return true;
      }

      return 'less';
    },
  },

  methods: {
    changeGeneralCheckbox(value) {
      this.table.items = this.table.items.map((item) => ({
        ...item,
        selected: value,
      }));
    },
  },
});

export const Default = Template.bind({});
Default.args = {
  loading: true,
  loadingText: 'Carregando...',
};
