import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import UnnnicButton from '../components/Button/Button.vue';
import UnnnicInput from '../components/Input/Input.vue';
import UnnnicLabel from '../components/Label/Label.vue';

export default {
  title: 'Misc/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A popover component that displays rich content in a portal, floating on top of other content.
          <br/>
          It supports three sizes (small, medium, large) and optional footer slot for action buttons, for example.
          <br/>
          API reference: https://www.reka-ui.com/docs/components/popover
          `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the popover',
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The preferred side of the trigger to render against',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'The preferred alignment against the trigger',
    },
  },
  args: {
    size: 'medium',
    side: 'bottom',
    align: 'center',
  },
};

export const Default = {
  render: (args) => ({
    components: { Popover, PopoverContent, PopoverTrigger, UnnnicButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Open Popover" />
          </PopoverTrigger>
          <PopoverContent v-bind="args">
            <p style="margin: 0;">This is a simple popover with some content inside.</p>
          </PopoverContent>
        </Popover>
      </div>
    `,
  }),
};

export const WithFooter = {
  parameters: {
    docs: {
      description: {
        story:
          'Popover with action buttons in the footer using the `#footer` slot.',
      },
    },
  },
  render: (args) => ({
    components: { Popover, PopoverContent, PopoverTrigger, UnnnicButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Open Popover" />
          </PopoverTrigger>
          <PopoverContent v-bind="args">
            <p style="margin: 0;">This popover has a footer with action buttons.</p>
            <template #footer>
              <UnnnicButton text="Cancel" type="tertiary" />
              <UnnnicButton text="Save" type="primary" />
            </template>
          </PopoverContent>
        </Popover>
      </div>
    `,
  }),
};

export const WithForm = {
  parameters: {
    docs: {
      description: {
        story: 'Popover containing a form with inputs and footer actions.',
      },
    },
  },
  render: (args) => ({
    components: {
      Popover,
      PopoverContent,
      PopoverTrigger,
      UnnnicButton,
      UnnnicInput,
      UnnnicLabel,
    },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 400px;">
        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Edit Profile" iconLeft="edit" />
          </PopoverTrigger>
          <PopoverContent v-bind="args">
            <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700;">Edit Profile</h3>
            <form>
              <UnnnicLabel label="Name" />
              <UnnnicInput placeholder="Enter your name" />
              <br />
              <UnnnicLabel label="Email" />
              <UnnnicInput placeholder="Enter your email" type="email" />
            </form>
            <template #footer>
              <UnnnicButton text="Cancel" type="tertiary" />
              <UnnnicButton text="Save" type="primary" />
            </template>
          </PopoverContent>
        </Popover>
      </div>
    `,
  }),
};

export const Sizes = {
  parameters: {
    docs: {
      description: {
        story:
          'The popover comes in three sizes: small (240px), medium (320px), and large (400px).',
      },
    },
  },
  render: (args) => ({
    components: { Popover, PopoverContent, PopoverTrigger, UnnnicButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: space-around; align-items: center; min-height: 400px; gap: 32px;">
        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Small" />
          </PopoverTrigger>
          <PopoverContent size="small">
            <p style="margin: 0;">Small popover (240px)</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Medium" />
          </PopoverTrigger>
          <PopoverContent size="medium">
            <p style="margin: 0;">Medium popover (320px)</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Large" />
          </PopoverTrigger>
          <PopoverContent size="large">
            <p style="margin: 0;">Large popover (400px)</p>
          </PopoverContent>
        </Popover>
      </div>
    `,
  }),
};

export const Placements = {
  parameters: {
    docs: {
      description: {
        story:
          'The popover can be positioned on any side of the trigger: top, bottom, left, or right.',
      },
    },
  },
  render: (args) => ({
    components: { Popover, PopoverContent, PopoverTrigger, UnnnicButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; padding: 100px;">
        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Top" style="width: 100%;" />
          </PopoverTrigger>
          <PopoverContent side="top" align="center">
            <p style="margin: 0;">Popover on top</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Bottom" style="width: 100%;" />
          </PopoverTrigger>
          <PopoverContent side="bottom" align="center">
            <p style="margin: 0;">Popover on bottom</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Right" style="width: 100%;" />
          </PopoverTrigger>
          <PopoverContent side="right" align="center">
            <p style="margin: 0;">Popover on right</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Left" style="width: 100%;" />
          </PopoverTrigger>
          <PopoverContent side="left" align="center">
            <p style="margin: 0;">Popover on left</p>
          </PopoverContent>
        </Popover>
      </div>
    `,
  }),
};

export const RichContent = {
  args: {
    size: 'large',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example of a popover with rich, structured content and footer actions.',
      },
    },
  },
  render: (args) => ({
    components: { Popover, PopoverContent, PopoverTrigger, UnnnicButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 400px;">
        <Popover>
          <PopoverTrigger>
            <UnnnicButton text="Show Details" iconLeft="info" />
          </PopoverTrigger>
          <PopoverContent v-bind="args">
            <div>
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700;">User Information</h3>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; gap: 8px;">
                  <span style="font-weight: 600;">Name:</span>
                  <span>John Doe</span>
                </div>
                <div style="display: flex; gap: 8px;">
                  <span style="font-weight: 600;">Email:</span>
                  <span>john.doe@example.com</span>
                </div>
                <div style="display: flex; gap: 8px;">
                  <span style="font-weight: 600;">Role:</span>
                  <span>Administrator</span>
                </div>
                <div style="display: flex; gap: 8px;">
                  <span style="font-weight: 600;">Status:</span>
                  <span style="color: #4CAF50;">Active</span>
                </div>
              </div>
            </div>
            <template #footer>
              <UnnnicButton text="View Profile" type="primary" />
            </template>
          </PopoverContent>
        </Popover>
      </div>
    `,
  }),
};
