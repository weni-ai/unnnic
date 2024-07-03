import AlertCaller from '../components/Alert/AlertCaller.vue';
import alert from '../utils/call';
import UnnnicAlert from '../components/Alert/Alert.vue';
import AlertBanner from '../components/Alert/AlertBanner.vue';

export default {
  title: 'example/Alert',
  component: UnnnicAlert,
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
  },
};

export const Normal = {
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

      showAlertAsInlineComponent() {
        this.alert = {
          ...this.args,
        };
      },
    },
    template: `
    <div>
      <button @click="unnnicCallAlert">Click for alert as callAlert function</button>

      <br />

      <button @click="showAlertAsInlineComponent">Click for alert as inline component</button>

      <UnnnicAlert
        v-if="alert"
        v-bind="alert"
        @close="alert = null"
      />

      <pre>{{ alert }}</pre>

    <h3>Refactoring changes:</h3>

    <ul>
      <li>Removed props: title, icon, hide-close-text, close-text, position</li>
      <li>Added props: link-text, link-href, link-target (default: '_blank'), type (default, success, error)</li>
      <li>Avoid using scheme prop, instead use the 'type' prop to change the color variant</li>
      <li>Avoid using on-close prop to listen to close event, instead use the '@close' event</li>
    </ul>

    <pre>
    Recommended use:

    &lt;unnnic-alert
      type            String default 'default' ('default', 'success', 'error')
      text            String required
      @close          Event
      link-href       String
      ┠ link-text    String default 'Learn more'
      ┖ link-target  String default '_blank'
    /&gt;
    </pre>
    </div>`,
  }),
  args: {
    title: 'Title',
    text: 'Text',
  },
};

export const WithContainerRef = {
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
      <div ref="divContainer" style="height: 200px; position: relative; border: 1px solid black">
        <button @click="unnnicCallAlert">Click for alert</button>

        <pre>
        To use, add position relative style to your container
        and pass it as "containerRef" at callAlert function like:

        alert.callAlert({
          containerRef: this.$refs,
        });
        </pre>
      </div>
    `,
  }),
  args: {
    title: 'Title',
    text: 'Text',
    icon: 'check-circle-1-1',
    scheme: 'feedback-green',
  },
};

export const Banner = {
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
    template: `
    <div>
      <alert-banner v-bind="args" />

    <pre>
    Recommended use:

    &lt;unnnic-alert-banner
      type            String default 'info' ('info', 'warning', 'danger')
      text            String required
      showCloseButton Boolean default false
      @close          Event
      link-href       String
      ┠ link-text    String default 'Learn more'
      ┖ link-target  String default '_blank'
    /&gt;
    </pre>
    </div>`,
  }),
  args: {
    text: 'Text',
    showCloseButton: false,
  },
};
