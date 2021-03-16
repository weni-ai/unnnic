import unnnicTable from '../components/Table/Table.vue';
import unnnicTableRow from '../components/Table/TableRow.vue';
import unnnicButton from '../components/Button/Button.vue';
import unnnicIconSvg from '../components/Icon-svg.vue';

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
    unnnicIconSvg,
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
              <unnnic-icon-svg :icon="generalIcon.name" :scheme="generalIcon.color" clickable @click="clickGeneralCheckbox" :style="{margin: '4px'}"/>
            </template>
          </unnnic-table-row>
        </template>

        <template v-slot:item="{ item }">
          <unnnic-table-row :headers="table.headers">
            <template v-slot:checkarea>
              <unnnic-icon-svg size="md" :icon="item.selected ? 'checkbox-select' : 'checkbox-default'" :scheme="item.selected ? 'brand-weni' : 'neutral-clean'" clickable @click="item.selected = !item.selected" :style="{margin: '4px'}"/>
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
    generalIconType() {
      if (!this.table.items.find((item) => item.selected)) {
        return 'none';
      }
      if (!this.table.items.find((item) => !item.selected)) {
        return 'all';
      }
      return 'some';
    },

    generalIcon() {
      return {
        none: {
          name: 'checkbox-default',
          color: 'neutral-clean',
        },
        all: {
          name: 'checkbox-select',
          color: 'brand-weni',
        },
        some: {
          name: 'checkbox-less',
          color: 'brand-weni',
        },
      }[this.generalIconType];
    },
  },

  methods: {
    clickGeneralCheckbox() {
      const status = this.generalIconType !== 'all';

      this.table.items.forEach((item) => {
        item.selected = status;
      });
    },
  },
});

export const Default = Template.bind({});
Default.args = {
  loading: true,
  loadingText: 'Carregando...',
};
