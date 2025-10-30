import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../components/ui/dialog';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A dialog component that displays content in a modal overlay. 
          <br/>
          Built on top of Reka UI, it provides a modern and accessible way to display modal dialogs.
          <br/>
          Supports three sizes (small, medium, large) and four types (default, success, warning, attention).
          <br/>
          Can be controlled via the "open" prop for programmatic control.
          <br/>
          API reference: https://www.reka-ui.com/docs/components/dialog
          `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: {
        summary: 'medium',
      },
      description: 'The size of the dialog',
    },
    type: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'attention'],
      defaultValue: {
        summary: 'default',
      },
      description: 'The type of the dialog (affects header icon)',
    },
  },
  args: {
    size: 'medium',
    type: 'default',
  },
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story:
          'Default dialog with header, body content, and footer with action buttons.',
      },
      source: {
        code: `<Dialog>
  <DialogTrigger>
    <UnnnicButton text="Open Dialog" />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <div style="padding: 24px;">
      <p>This is the content of the dialog.</p>
    </div>
    <DialogFooter>
      <DialogClose>
        <UnnnicButton text="Cancel" type="tertiary" />
      </DialogClose>
      <UnnnicButton text="Confirm" type="primary" />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogClose,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
      
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Dialog>
          <DialogTrigger>
            <UnnnicButton text="Open Dialog" />
          </DialogTrigger>
          <DialogContent v-bind="args">
            <DialogHeader :type="args.type">
              <DialogTitle>Dialog Title</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px;">
              <p style="margin: 0; color: #67738B;">
                This is the content of the dialog. You can add any content here, including forms, 
                text, images, or other components.
              </p>
            </div>
            <DialogFooter>
              <DialogClose>
                <UnnnicButton text="Cancel" type="tertiary" />
              </DialogClose>
              <UnnnicButton text="Confirm" type="primary" />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const Success = {
  args: {
    type: 'success',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dialog with success type, displaying a success icon in the header.',
      },
      source: {
        code: `<Dialog>
  <DialogTrigger>
    <UnnnicButton text="Success Dialog" />
  </DialogTrigger>
  <DialogContent size="medium">
    <DialogHeader type="success">
      <DialogTitle>Operation Successful</DialogTitle>
    </DialogHeader>
    <div style="padding: 24px;">
      <p>Your changes have been saved successfully.</p>
    </div>
    <DialogFooter>
      <DialogClose>
        <UnnnicButton text="Close" type="primary" />
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogClose,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
      
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Dialog>
          <DialogTrigger>
            <UnnnicButton text="Success Dialog" />
          </DialogTrigger>
          <DialogContent v-bind="args">
            <DialogHeader :type="args.type">
              <DialogTitle>Operation Successful</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px;">
              <p style="margin: 0; color: #67738B;">
                Your changes have been saved successfully. The system has been updated with your new settings.
              </p>
            </div>
            <DialogFooter>
              <DialogClose>
                <UnnnicButton text="Close" type="primary" />
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const Warning = {
  args: {
    type: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dialog with warning type, useful for destructive actions or critical warnings.',
      },
      source: {
        code: `<Dialog>
  <DialogTrigger>
    <UnnnicButton text="Warning Dialog" type="warning" />
  </DialogTrigger>
  <DialogContent size="medium">
    <DialogHeader type="warning">
      <DialogTitle>Delete Item</DialogTitle>
    </DialogHeader>
    <div style="padding: 24px;">
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </div>
    <DialogFooter>
      <DialogClose>
        <UnnnicButton text="Cancel" type="tertiary" />
      </DialogClose>
      <UnnnicButton text="Delete" type="warning" />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogClose,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
      
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Dialog>
          <DialogTrigger>
            <UnnnicButton text="Warning Dialog" type="warning" />
          </DialogTrigger>
          <DialogContent v-bind="args">
            <DialogHeader :type="args.type">
              <DialogTitle>Delete Item</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px;">
              <p style="margin: 0; color: #67738B;">
                Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed.
              </p>
            </div>
            <DialogFooter>
              <DialogClose>
                <UnnnicButton text="Cancel" type="tertiary" />
              </DialogClose>
              <UnnnicButton text="Delete" type="warning" />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const Attention = {
  args: {
    type: 'attention',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dialog with attention type, useful for important notices or alerts that require user attention.',
      },
      source: {
        code: `<Dialog>
  <DialogTrigger>
    <UnnnicButton text="Attention Dialog" type="attention" />
  </DialogTrigger>
  <DialogContent size="medium">
    <DialogHeader type="attention">
      <DialogTitle>Important Notice</DialogTitle>
    </DialogHeader>
    <div style="padding: 24px;">
      <p>Please review the following information carefully before proceeding.</p>
    </div>
    <DialogFooter>
      <DialogClose>
        <UnnnicButton text="Cancel" type="tertiary" />
      </DialogClose>
      <UnnnicButton text="Continue" type="attention" />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogClose,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
      
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Dialog>
          <DialogTrigger>
            <UnnnicButton text="Attention Dialog" type="attention" />
          </DialogTrigger>
          <DialogContent v-bind="args">
            <DialogHeader :type="args.type">
              <DialogTitle>Important Notice</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px;">
              <p style="margin: 0; color: #67738B;">
                Please review the following information carefully before proceeding. Your account settings will be affected by this change.
              </p>
            </div>
            <DialogFooter>
              <DialogClose>
                <UnnnicButton text="Cancel" type="tertiary" />
              </DialogClose>
              <UnnnicButton text="Continue" type="attention" />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const Sizes = {
  parameters: {
    docs: {
      description: {
        story:
          'Dialogs come in three sizes: small (360px), medium (560px), and large (800px).',
      },
      source: {
        code: `<!-- Small Dialog -->
<Dialog>
  ...
  <DialogContent size="small">
  ...
</Dialog>

<!-- Medium Dialog -->
<Dialog>
  ...
  <DialogContent size="medium">
  ...
</Dialog>

<!-- Large Dialog -->
<Dialog>
  ...
  <DialogContent size="large">
  ...
</Dialog>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
      
      <div style="display: flex; justify-content: center; align-items: center; gap: 16px; min-height: 300px; flex-wrap: wrap;">
        <Dialog>
          <DialogTrigger>
            <UnnnicButton text="Small Dialog" />
          </DialogTrigger>
          <DialogContent size="small">
            <DialogHeader>
              <DialogTitle>Small Dialog</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px;">
              <p style="margin: 0; color: #67738B;">
                This is a small dialog (360px max width).
              </p>
            </div>
            <DialogFooter>
              <UnnnicButton text="Close" type="primary" />
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <UnnnicButton text="Medium Dialog" />
          </DialogTrigger>
          <DialogContent size="medium">
            <DialogHeader>
              <DialogTitle>Medium Dialog</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px;">
              <p style="margin: 0; color: #67738B;">
                This is a medium dialog (560px max width). This is the default size for dialogs.
              </p>
            </div>
            <DialogFooter>
              <UnnnicButton text="Close" type="primary" />
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <UnnnicButton text="Large Dialog" />
          </DialogTrigger>
          <DialogContent size="large">
            <DialogHeader>
              <DialogTitle>Large Dialog</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px;">
              <p style="margin: 0; color: #67738B;">
                This is a large dialog (800px max width). Use this size when you need more space for complex content or forms.
              </p>
            </div>
            <DialogFooter>
              <UnnnicButton text="Close" type="primary" />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const WithoutHeader = {
  parameters: {
    docs: {
      description: {
        story:
          'Dialog without a header. Useful when you need full control over the content layout.',
      },
      source: {
        code: `<Dialog>
  <DialogTrigger>
    <UnnnicButton text="Dialog Without Header" />
  </DialogTrigger>
  <DialogContent>
    <div style="padding: 24px;">
      <h2>Custom Header Content</h2>
      <p>This dialog doesn't use the DialogHeader component.</p>
    </div>
    <DialogFooter>
      <UnnnicButton text="Cancel" type="tertiary" />
      <UnnnicButton text="Confirm" type="primary" />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogFooter,
      DialogTrigger,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
      
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Dialog>
          <DialogTrigger>
            <UnnnicButton text="Dialog Without Header" />
          </DialogTrigger>
          <DialogContent v-bind="args">
            <div style="padding: 24px;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #272B33;">
                Custom Header Content
              </h2>
              <p style="margin: 0; color: #67738B;">
                This dialog doesn't use the DialogHeader component, giving you full control over the content structure.
                You can add any custom layout here.
              </p>
            </div>
            <DialogFooter>
              <UnnnicButton text="Cancel" type="tertiary" />
              <UnnnicButton text="Confirm" type="primary" />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const WithoutFooter = {
  parameters: {
    docs: {
      description: {
        story:
          'Dialog without a footer. Useful for informational dialogs or when actions are inline with content.',
      },
      source: {
        code: `<Dialog>
  <DialogTrigger>
    <UnnnicButton text="Dialog Without Footer" />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Information</DialogTitle>
    </DialogHeader>
    <div style="padding: 24px;">
      <p>This is an informational dialog without a footer.</p>
      <p>The user can close it by clicking outside or pressing ESC.</p>
    </div>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
      
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Dialog>
          <DialogTrigger>
            <UnnnicButton text="Dialog Without Footer" />
          </DialogTrigger>
          <DialogContent v-bind="args">
            <DialogHeader>
              <DialogTitle>Information</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px;">
              <p style="margin: 0 0 16px 0; color: #67738B;">
                This is an informational dialog without a footer. The user can close it by clicking outside or pressing ESC.
              </p>
              <p style="margin: 0; color: #67738B;">
                This pattern is useful for simple notifications or information displays that don't require explicit actions.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const WithoutHeaderCloseButton = {
  parameters: {
    docs: {
      description: {
        story:
          'Dialog without a close button. Useful when you need to prevent the user from closing the dialog.',
      },
      source: {
        code: `<Dialog>
  <DialogTrigger>
    <UnnnicButton text="Dialog Without Header Close Button" />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader :closeButton="false">
      <DialogTitle>Dialog Without Header Close Button</DialogTitle>
    </DialogHeader>
    <div style="padding: 24px;">
      <p>This dialog doesn't have a header close button.</p>
    </div>
    <DialogFooter>
      <UnnnicButton text="Confirm" type="primary" />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  args: {
    closeButton: false,
  },
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogFooter,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
      <Dialog>
        <DialogTrigger>
          <UnnnicButton text="Dialog Without Header Close Button" />
        </DialogTrigger>
        <DialogContent v-bind="args">
          <DialogHeader :closeButton="false">
            <DialogTitle>Dialog Without Header Close Button</DialogTitle>
          </DialogHeader>
          <div style="padding: 24px;">
            <p style="margin: 0; color: #67738B;">This dialog doesn't have a header close button.</p>
          </div>
          <DialogFooter>
            <UnnnicButton text="Confirm" type="primary" />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  `,
  }),
};

export const ControlledOpen = {
  parameters: {
    docs: {
      description: {
        story: `Dialog controlled by the "open" prop. This allows you to programmatically open and close the dialog.
          <br/>
          Use v-model:open to bind the open state to a reactive variable in your component.`,
      },
      source: {
        code: `<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const openDialog = () => {
  isOpen.value = true;
};

const closeDialog = () => {
  isOpen.value = false;
};
</script>

<template>
  <div>
    <UnnnicButton text="Open Dialog" @click="openDialog" />
    
    <Dialog v-model:open="isOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogHeader>
        <div style="padding: 24px;">
          <p>This dialog is controlled by the "open" prop.</p>
        </div>
        <DialogFooter>
          <UnnnicButton text="Close" type="tertiary" @click="closeDialog" />
          <UnnnicButton text="Confirm" type="primary" @click="closeDialog" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      openDialog() {
        this.isOpen = true;
      },
      closeDialog() {
        this.isOpen = false;
      },
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; gap: 16px; min-height: 300px; flex-direction: column;">
        <div style="display: flex; gap: 16px;">
          <UnnnicButton text="Open Dialog" @click="openDialog" />
        </div>
        
        <p style="margin: 0; color: #67738B;">Dialog is currently: <strong>{{ isOpen ? 'OPEN' : 'CLOSED' }}</strong></p>

        <Dialog v-model:open="isOpen">
          <DialogContent v-bind="args">
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px;">
              <p style="margin: 0; color: #67738B;">
                This dialog is controlled by the "open" prop. You can open and close it programmatically using the buttons above.
              </p>
            </div>
            <DialogFooter>
              <UnnnicButton text="Close" type="tertiary" @click="closeDialog" />
              <UnnnicButton text="Confirm" type="primary" @click="closeDialog" />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const LongContent = {
  parameters: {
    docs: {
      description: {
        story:
          'Dialog with scrollable content. The dialog body will scroll when content exceeds the viewport height.',
      },
      source: {
        code: `<Dialog>
  <DialogTrigger>
    <UnnnicButton text="Long Content Dialog" />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Terms and Conditions</DialogTitle>
    </DialogHeader>
    <div style="padding: 24px; max-height: 400px; overflow-y: auto;">
      <!-- Your long content here -->
      <div v-for="i in 10" :key="i">
        <h4>Section {{ i }}</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </div>
    </div>
    <DialogFooter>
      <UnnnicButton text="Decline" type="tertiary" />
      <UnnnicButton text="Accept" type="primary" />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
      
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Dialog>
          <DialogTrigger>
            <UnnnicButton text="Long Content Dialog" />
          </DialogTrigger>
          <DialogContent v-bind="args">
            <DialogHeader>
              <DialogTitle>Terms and Conditions</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px; max-height: 400px; overflow-y: auto;">
              <div v-for="i in 10" :key="i" style="margin-bottom: 16px;">
                <h4 style="margin: 0 0 8px 0; color: #272B33;">Section {{ i }}</h4>
                <p style="margin: 0; color: #67738B; line-height: 1.6;">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <DialogFooter>
              <UnnnicButton text="Decline" type="tertiary" />
              <UnnnicButton text="Accept" type="primary" />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};
