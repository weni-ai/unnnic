import UnnnicDrawer from '../components/Drawer/Drawer.vue';
import UnnnicButton from '../components/Button/Button.vue';

const primaryButtonTypeOptions = [
  'primary',
  'secondary',
  'tertiary',
  'alternative',
  'warning',
  'attention',
];

export default {
  title: 'Example/Drawer',
  component: UnnnicDrawer,
  argTypes: {
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    primaryButtonType: {
      options: primaryButtonTypeOptions,
      control: { type: 'select' },
    },
    disabledPrimaryButton: { control: { type: 'boolean' } },
    disabledSecondaryButton: { control: { type: 'boolean' } },
    loadingPrimaryButton: { control: { type: 'boolean' } },
    loadingSecondaryButton: { control: { type: 'boolean' } },
    primaryButtonText: { control: { type: 'text' } },
    secondaryButtonText: { control: { type: 'text' } },
    modelValue: { control: { type: 'boolean' } },
    wide: { control: { type: 'boolean' } },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicDrawer, UnnnicButton },
    data() {
      return {
        opened: false,
      };
    },
    methods: {
      primaryClick() {
        console.log('primaryClick');
      },
      secondaryClick() {
        console.log('secondaryClick');
      },
    },
    template: `
      <div>
        <pre>v-model: {{ opened }}</pre>
        <button @click="opened = !opened">Change</button>
        <unnnic-drawer v-bind="args" v-model="opened" @close="opened = false" @primaryButtonClick="primaryClick" @secondaryButtonClick="secondaryClick">
          <template #content>
            <p style="padding: 0; margin:0;">Conteúdo</p>
          </template>
        </unnnic-drawer>
      </div>
    `,
  }),
};

export const Default = {
  args: {
    title: 'Title',
    description: 'Description',
    primaryButtonText: 'Confirmar',
    secondaryButtonText: 'Cancelar',
  },
};

export const Wide = {
  args: {
    title: 'Title',
    description: 'Description',
    primaryButtonText: 'Confirmar',
    secondaryButtonText: 'Cancelar',
    wide: true,
  },
};

export const ContentOverflowed = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicDrawer, UnnnicButton },
    data() {
      return {
        opened: false,
      };
    },
    methods: {
      primaryClick() {
        console.log('primaryClick');
      },
      secondaryClick() {
        console.log('secondaryClick');
      },
    },
    template: `
      <div>
        <pre>v-model: {{ opened }}</pre>
        <button @click="opened = !opened">Change</button>
        <unnnic-drawer v-bind="args" v-model="opened" @close="opened = false">
          <template #content>
            <p style="padding: 0; margin:0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
          </template>
        </unnnic-drawer>
      </div>  
    `,
  }),
  args: {
    title: 'Title',
    description: 'Description',
    primaryButtonText: 'Confirmar',
    secondaryButtonText: 'Cancelar',
    wide: true,
  },
};

export const ContentVideo = {
  render: (args) => ({
    components: { UnnnicDrawer, UnnnicButton },
    setup() {
      return { args };
    },
    data() {
      return {
        opened: false,
      };
    },
    template: `
      <div>
        <pre>v-model: {{ opened }}</pre>
        <button @click="opened = !opened">Change</button>
        <unnnic-drawer v-bind="args" v-model="opened" @close="opened = false">
          <template #content>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/dD8ENnN-2CI?si=68dJEsG5FdiNaYvY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </template>
        </unnnic-drawer>
      </div>
    `,
  }),
  args: {
    title: 'Title',
    description: 'Description',
    wide: true,
  },
};
