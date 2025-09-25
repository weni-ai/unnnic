import UnnnicPopover from '../components/Popover/index.vue';

export default {
  title: 'example/Popover',
  component: UnnnicPopover,
  render: (args) => ({
    components: { UnnnicPopover },
    setup() {
        return {
            args,
        }
    },
    template: `
    <div>
      <unnnic-popover v-bind="args">
        <template #trigger>
          <button>Click me</button>
        </template>
        <template #content>
          <p>Hello</p>
        </template>
      </unnnic-popover>
    </div>
  `,
  }),
};

export const Default = {
  args: {
    modelValue: false
  }
};

export const WithModelValue = {
    args: {
        modelValue: true,
    }
}