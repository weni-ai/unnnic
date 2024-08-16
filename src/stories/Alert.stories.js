import AlertCaller from '../components/Alert/AlertCaller.vue';
import alert from '../utils/call';
import UnnnicAlert from '../components/Alert/Alert.vue';
import AlertBanner from '../components/Alert/AlertBanner.vue';

export default {
  title: 'Feedback/Alert',
  component: UnnnicAlert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Ideal for conveying important messages or notifications to the user in a clear 
        and prominent manner. Used to communicate alerts, errors, warnings or confirmations, this 
        component helps ensure that the message is noticed and understood quickly.
          `,
      },
    },
  },
  args: {
    type: 'default',
    text: 'Text',
    linkHref: '',
    linkText: '',
    linkTarget: '',
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['default', 'success', 'error'],
    },

    text: {
      control: {
        type: 'text',
      },
    },

    linkHref: {
      control: {
        type: 'text',
      },
    },

    linkText: {
      control: {
        type: 'text',
      },
    },

    linkTarget: {
      control: {
        type: 'text',
      },
    },
    position: {
      if: { arg: 'version' },
    },
    version: {
      control: false,
    },
    title: {
      if: { arg: 'version' },
    },
    icon: {
      if: { arg: 'version' },
    },
    closeText: {
      if: { arg: 'version' },
    },
    scheme: {
      if: { arg: 'version' },
    },
  },
};

export const Normal = {
  parameters: {
    docs: {
      description: {
        story: `For basic usage, simply import the alert and call the function by passing the 
        following object:

    alert.callAlert({
      props: {
        text: 'Text',
      },
      seconds: 5,
    });

        `,
      },
    },
  },
  render: (args) => ({
    components: { AlertCaller, UnnnicAlert },
    setup() {
      return { args };
    },

    data() {
      return {
        alert: null,
      };
    },

    methods: {
      unnnicCallAlert() {
        alert.callAlert({ props: this.args, seconds: this.args.seconds });
      },
    },
    template: `<button @click="unnnicCallAlert">Click for alert as callAlert function</button>`,
  }),
};

export const InlineComponent = {
  render: (args) => ({
    components: { AlertCaller, UnnnicAlert },
    setup() {
      return { args };
    },

    data() {
      return {
        alert: null,
      };
    },

    methods: {
      showAlertAsInlineComponent() {
        this.alert = {
          ...this.args,
        };
      },
    },
    template: `
    <div>
      <button @click="showAlertAsInlineComponent">Click for alert as inline component</button>

      <UnnnicAlert
        v-if="alert"
        v-bind="alert"
        @close="alert = null"
      />`,
  }),
};

export const WithContainerRef = {
  parameters: {
    docs: {
      description: {
        story: `To use, add position relative style to your container and pass it as 
        "containerRef" at callAlert function like:

    alert.callAlert({
      // ...YOUR_OPTIONS
      containerRef: this.$refs.YOUR_CONTAINER_REF,
    });

        `,
      },
    },
  },
  render: (args) => ({
    components: { AlertCaller, UnnnicAlert },
    setup() {
      return { args };
    },
    methods: {
      unnnicCallAlert() {
        alert.callAlert({
          props: this.args,
          containerRef: this.$refs.divContainer,
        });
      },
    },
    template: `
      <div ref="divContainer" style="height: 100px; position: relative;">
        <button @click="unnnicCallAlert">Click for alert</button>
      </div>
    `,
  }),
  args: {
    title: 'Title',
    text: 'Text',
    scheme: 'feedback-green',
  },
};

export const Banner = {
  parameters: {
    docs: {
      description: {
        story: `This variation has the additional prop ${'`showCloseButton`'}, false by default.`,
      },
    },
  },
  render: (args) => ({
    components: { AlertBanner },
    setup() {
      return { args };
    },
    methods: {
      unnnicCallAlert() {
        alert.callAlert({
          props: this.args,
          containerRef: this.$refs.divContainer,
        });
      },
    },
    template: '<alert-banner v-bind="args" />',
  }),
  args: {
    text: 'Text',
    showCloseButton: false,
  },
};
