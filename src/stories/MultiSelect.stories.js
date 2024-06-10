import UnnnicMultiSelect from '../components/MultiSelect/MultiSelect.vue';

export default {
  title: 'Form/MultiSelect',
  component: UnnnicMultiSelect,
  argTypes: {},
  render: (args) => ({
    components: {
      UnnnicMultiSelect,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        groups: [
          {
            title: 'Permissões Gerais',
            selected: 0,
            items: [
              {
                title: 'Moderador',
                description:
                  'Gerencia membros do projeto e administra o rocket',
              },
              {
                title: 'Contribuidor',
                description: 'Consegue editar o projeto',
              },
              {
                title: 'Vizualizador',
                description: 'Apenas vizualiza o projeto',
              },
            ],
          },
          {
            title: 'Permissões do módulo chat',
            selected: 0,
            items: [
              {
                title: 'Gerente de Atendimento',
                description:
                  'Consegue responder mensagens e criar grupos no Rocket',
              },
              {
                title: 'Agente',
                description: 'Consegue responder mensagens no Rocket',
              },
            ],
          },
        ],
      };
    },
    template: `
      <div>
        <UnnnicMultiSelect v-bind="args" v-model="groups" />
      </div>
    `,
  }),
};

export const Medium = { args: {} };
