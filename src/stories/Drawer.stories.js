import unnnicDrawer from '../components/Drawer/Drawer.vue';
import unnnicButton from '../components/Button/Button.vue';

export default {
  title: 'Example/Drawer',
  component: unnnicDrawer,
  argTypes: {
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    primaryButtonType: { control: { type: 'select', options: ['primary', 'secondary', 'tertiary', 'alternative', 'warning', 'attention'] } },
    primaryButtonText: { control: { type: 'text' } },
    secondaryButtonText: { control: { type: 'text' } },
    value: { control: { type: 'boolean' } },
    wide: { control: { type: 'boolean' } },
    hiddenFooter: { control: { type: 'boolean' } },
  },
};

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicDrawer, unnnicButton },
  data() {
    return {
      opened: false,
    };
  },
  template: `
  <div>
    <pre>v-model: {{ opened }}</pre>
    <button @click="opened = !opened">Change</button>
    <unnnic-drawer v-model="opened" v-bind="$props" @close="opened = false">
      <template #content>
        <p>Conteúdo</p>
      </template>
    </unnnic-drawer>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  description: 'Description',
  primaryButtonText: 'Confirmar',
  secondaryButtonText: 'Cancelar',
};

export const Wide = Template.bind({});
Wide.args = {
  title: 'Title',
  description: 'Description',
  primaryButtonText: 'Confirmar',
  secondaryButtonText: 'Cancelar',
  wide: true,
};

const TemplateOveflowed = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicDrawer, unnnicButton },
  data() {
    return {
      opened: false,
    };
  },
  template: `
  <div>
    <pre>v-model: {{ opened }}</pre>
    <button @click="opened = !opened">Change</button>
    <unnnic-drawer v-model="opened" v-bind="$props" @close="opened = false">
      <template #content>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum dolor viverra, aliquam metus dictum, vehicula felis. Nulla sapien nisi, laoreet sit amet nisi sed, consectetur ornare odio. Nullam facilisis a ligula quis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus et sodales ex. Donec mauris dui, tempor eget lorem vel, blandit consequat tellus. Maecenas ut justo vitae orci commodo consectetur eget id nisl. Donec auctor sollicitudin ex at lacinia. Integer lobortis, eros nec congue facilisis, augue nisl elementum nibh, pharetra euismod odio turpis eu lorem. Vivamus a tristique tellus.</p>
      </template>
    </unnnic-drawer>
  </div>
  `,
});

export const ContentOverflowed = TemplateOveflowed.bind({});
ContentOverflowed.args = {
  title: 'Title',
  description: 'Description',
  primaryButtonText: 'Confirmar',
  secondaryButtonText: 'Cancelar',
  wide: true,
};

const TemplateVideo = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicDrawer, unnnicButton },
  data() {
    return {
      opened: false,
    };
  },
  template: `
  <div>
    <pre>v-model: {{ opened }}</pre>
    <button @click="opened = !opened">Change</button>
    <unnnic-drawer v-model="opened" v-bind="$props" @close="opened = false">
      <template #content>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/dD8ENnN-2CI?si=68dJEsG5FdiNaYvY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </template>
    </unnnic-drawer>
  </div>
  `,
});

export const ContentVideo = TemplateVideo.bind({});
ContentVideo.args = {
  title: 'Title',
  description: 'Description',
  hiddenFooter: true,
  wide: true,
};
