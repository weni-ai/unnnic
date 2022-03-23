import unnnicMultiSelect from '../components/MultiSelect/MultiSelect.vue';

export default {
  title: 'example/MultiSelect',
  component: unnnicMultiSelect,
  argTypes: {

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicMultiSelect },
  data() {
    return {
      groups: [
        {
          title: 'Permissões Gerais',
          selected: 0,
          items: [
            {
              title: 'Moderador',
              description: 'Gerencia membros do projeto e administra o rocket',
            },
            { title: 'Contribuidor', description: 'Consegue editar o projeto' },
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

  // eslint-disable-next-line no-multi-str
  template: '<div><unnnicMultiSelect v-bind="$props" v-model="groups"></unnnicMultiSelect></div>',
});

export const Medium = Template.bind({});

Medium.args = {};
