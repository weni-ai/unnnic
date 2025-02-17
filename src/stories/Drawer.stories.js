import { action } from '@storybook/addon-actions';

import UnnnicDrawer from '../components/Drawer/Drawer.vue';
import UnnnicButton from '../components/Button/Button.vue';
import UnnnicAvatarIcon from '../components/AvatarIcon/AvatarIcon.vue';

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
    size: {
      options: ['md', 'lg', 'xl', 'gt'],
      control: { type: 'select' },
    },
    withoutOverlay: { control: { type: 'boolean' } },
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
      primaryClick: action('primaryButtonClick'),
      secondaryClick: action('secondaryButtonClick'),
      closeAction: action('close'),
      backAction: action('back'),
      close() {
        this.closeAction();
        this.opened = false;
      },
      back() {
        this.backAction();
        this.opened = false;
      },
    },
    template: `
      <div>
        <pre>v-model: {{ opened }}</pre>
        <button @click="opened = !opened">Change</button>
        <unnnic-drawer v-bind="args" v-model="opened" @close="close" @back="back" @primaryButtonClick="primaryClick" @secondaryButtonClick="secondaryClick">
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
    distinctCloseBack: true,
  },
};

export const Large = {
  args: {
    title: 'Title',
    description: 'Description',
    primaryButtonText: 'Confirmar',
    secondaryButtonText: 'Cancelar',
    size: 'lg',
  },
};

export const ExtraLarge = {
  args: {
    title: 'Title',
    description: 'Description',
    primaryButtonText: 'Confirmar',
    secondaryButtonText: 'Cancelar',
    size: 'xl',
  },
};

export const Giant = {
  args: {
    title: 'Title',
    description: 'Description',
    primaryButtonText: 'Confirmar',
    secondaryButtonText: 'Cancelar',
    size: 'gt',
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
      primaryClick: action('primaryButtonClick'),
      secondaryClick: action('secondaryButtonClick'),
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
    size: 'lg',
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
    size: 'lg',
  },
};

export const WithoutOverlay = {
  parameters: {
    docs: {
      description: {
        story: `It is recommended to use this variation for contexts where the drawer occupies 
        the screen with another drawer or modal (components with overlay in general).`,
      },
    },
  },
  args: {
    title: 'Title',
    description: 'Description',
    primaryButtonText: 'Confirmar',
    secondaryButtonText: 'Cancelar',
    withoutOverlay: true,
  },
};

export const TitleModified = {
  render: (args) => ({
    components: { UnnnicDrawer, UnnnicAvatarIcon },
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
          <template #title>
            <section style="display: flex; align-items: center; gap: 8px;">
              <UnnnicAvatarIcon
                size="sm"
                icon="bolt"
                scheme="aux-blue"
              />
              <h1 style="fontSize: 20px; margin: 0;">Modified Title</h1>
            </section>
          </template>
        </unnnic-drawer>
      </div>
    `,
  }),
  args: {
    title: 'Title',
    description: 'Description',
    size: 'lg',
  },
};
