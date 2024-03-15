import alertCaller from '../components/Alert/AlertCaller.vue';
import alert from '../utils/call';
import unnnicAlert from '../components/Alert/Alert.vue';
import alertBanner from '../components/Alert/AlertBanner.vue';

export default {
  title: 'example/Alert',
  component: unnnicAlert,
  argTypes: {
    text: { control: { type: 'text' } },
    showCloseButton: { control: { type: 'boolean' } },
    title: { control: { type: 'text' } },
    closeText: { control: { type: 'text' } },
    scheme: {
      control: {
        type: 'select',
        options: [
          'feedback-red',
          'feedback-green',
          'feedback-yellow',
          'feedback-blue',
          'feedback-grey',
          'aux-blue',
          'aux-purple',
          'aux-orange',
          'aux-lemon',
          'aux-pink',
        ],
      },
    },
    position: {
      control: {
        type: 'select',
        options: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'bottom-center'],
      },
    },
    icon: {
      control: {
        type: 'select',
        options: ['check-circle-1-1', 'check-circle-1-1-1', 'alert-circle-1-1'],
      },
    },
    seconds: { control: { type: 'number' } },
    version: {
      control: {
        type: 'select',
        options: ['1.0', '1.1'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { alertCaller, unnnicAlert },
  template: `
<div>
  <button @click="unnnicCallAlert">Click for alert</button>

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
  methods: {
    unnnicCallAlert() {
      alert.callAlert({ props: this.$props, seconds: this.$props.seconds });
    },
  },
});

const TemplateWithContainerRef = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { alertCaller, unnnicAlert },
  template: `
    <div ref="divContainer" style="height: 200px; position: relative; border: 1px solid black">
      <button @click="unnnicCallAlert">Click for alert</button>

      <pre>
      To use, add position relative style to your container
      and pass it as "containerRef" at callAlert function like:

      alert.callAlert({
        containerRef: this.$refs.divContainer,
      });
      </pre>
    </div>`,
  methods: {
    unnnicCallAlert() {
      alert.callAlert({
        props: this.$props,
        containerRef: this.$refs.divContainer,
      });
    },
  },
});

const TemplateBanner = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { alertBanner },
  template: `
    <div>
      <alert-banner v-bind="$props" />

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
    </div>`
});

export const Normal = Template.bind({});
Normal.args = {
  title: 'Title',
  text: 'Text',
  icon: 'check-circle-1-1',
  scheme: 'feedback-green',
};

export const WithContainerRef = TemplateWithContainerRef.bind({});
WithContainerRef.args = {
  title: 'Title',
  text: 'Text',
  icon: 'check-circle-1-1',
  scheme: 'feedback-green',
};

export const Banner = TemplateBanner.bind({});
Banner.args = {
  text: 'Text',
  showCloseButton: false
};
