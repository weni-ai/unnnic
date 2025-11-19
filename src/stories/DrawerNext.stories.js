import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '../components/ui/drawer';
import UnnnicButton from '../components/Button/Button.vue';

const drawerContent = () => `
<DrawerHeader>
  <DrawerTitle>Drawer Title</DrawerTitle>
  <DrawerDescription>This is a description of the drawer content.</DrawerDescription>
</DrawerHeader>
<section style="padding: 24px;">
  <p style="margin: 0;">
    This is the content of the drawer. You can add any content here, including forms, 
    text, images, or other components. The drawer slides in from the right side of the screen.
  </p>
</section>
<DrawerFooter>
  <DrawerClose>
    <UnnnicButton text="Cancel" type="tertiary" />
  </DrawerClose>
  <UnnnicButton text="Confirm" type="primary" />
</DrawerFooter>
`;

export default {
  title: 'Misc/DrawerNext',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `**Transitional component to replace the [Drawer](?path=/docs/misc-drawer--default) in the future.**
        <br/>
        <br/>
        A drawer component that slides in from the right side of the screen, displaying content in a portal.
          <br/>
          Built on top of Vaul Vue, it provides a modern and accessible way to display drawer panels.
          <br/>
          Supports four sizes (medium, large, extra-large, giant) and can be controlled via the "open" prop for programmatic control.
          <br/>
          API reference: https://github.com/unovue/vaul-vue
          `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['medium', 'large', 'extra-large', 'giant'],
      defaultValue: {
        summary: 'medium',
      },
      description: 'The size of the drawer',
    },
    showOverlay: {
      control: { type: 'boolean' },
      defaultValue: {
        summary: 'true',
      },
      description: 'Whether to show the overlay background',
    },
  },
  args: {
    size: 'medium',
    showOverlay: true,
  },
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story:
          'Default drawer with header, description, body content, and footer with action buttons.',
      },
      source: {
        code: `<UnnnicDrawerNext>
  <UnnnicDrawerTrigger>
    <UnnnicButton text="Open Drawer" />
  </UnnnicDrawerTrigger>
  <UnnnicDrawerContent>
    <UnnnicDrawerHeader>
      <UnnnicDrawerTitle>Drawer Title</UnnnicDrawerTitle>
      <UnnnicDrawerDescription>This is a description of the drawer content.</UnnnicDrawerDescription>
    </UnnnicDrawerHeader>
    <section style="padding: 24px;">
      <p>This is the content of the drawer.</p>
    </section>
    <UnnnicDrawerFooter>
      <UnnnicDrawerClose>
        <UnnnicButton text="Cancel" type="tertiary" />
      </UnnnicDrawerClose>
      <UnnnicButton text="Confirm" type="primary" />
    </UnnnicDrawerFooter>
  </UnnnicDrawerContent>
</UnnnicDrawerNext>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Drawer,
      DrawerContent,
      DrawerTrigger,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      DrawerFooter,
      DrawerClose,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
<Drawer>
  <DrawerTrigger>
    <UnnnicButton text="Open Drawer" />
  </DrawerTrigger>
  <DrawerContent v-bind="args">
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>This is a description of the drawer content.</DrawerDescription>
    </DrawerHeader>
    <section style="padding: 24px;">
      <p style="margin: 0;">
        This is the content of the drawer. You can add any content here, including forms, 
        text, images, or other components. The drawer slides in from the right side of the screen.
      </p>
    </section>
    <DrawerFooter>
      <DrawerClose>
        <UnnnicButton text="Cancel" type="tertiary" />
      </DrawerClose>
      <UnnnicButton text="Confirm" type="primary" />
    </DrawerFooter>
  </DrawerContent>
</Drawer>
    `,
  }),
};

export const Sizes = {
  parameters: {
    docs: {
      description: {
        story:
          'Drawers come in four sizes: medium (33%), large (50%), extra-large (66%), and giant (75%).',
      },
      source: {
        code: `<!-- Medium Drawer -->
<UnnnicDrawerNext>
  ...
  <UnnnicDrawerContent size="medium">
  ...
</UnnnicDrawerNext>

<!-- Large Drawer -->
<UnnnicDrawerNext>
  ...
  <UnnnicDrawerContent size="large">
  ...
</UnnnicDrawerNext>

<!-- Extra Large Drawer -->
<UnnnicDrawerNext>
  ...
  <UnnnicDrawerContent size="extra-large">
  ...
</UnnnicDrawerNext>

<!-- Giant Drawer -->
<UnnnicDrawerNext>
  ...
  <UnnnicDrawerContent size="giant">
  ...
</UnnnicDrawerNext>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Drawer,
      DrawerContent,
      DrawerTrigger,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      DrawerFooter,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <Drawer>
          <DrawerTrigger>
            <UnnnicButton text="Medium Drawer" />
          </DrawerTrigger>
          <DrawerContent size="medium">
            ${drawerContent()}
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger>
            <UnnnicButton text="Large Drawer" />
          </DrawerTrigger>
          <DrawerContent size="large">
            ${drawerContent()}
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger>
            <UnnnicButton text="Extra Large Drawer" />
          </DrawerTrigger>
          <DrawerContent size="extra-large">
            ${drawerContent()}
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger>
            <UnnnicButton text="Giant Drawer" />
          </DrawerTrigger>
          <DrawerContent size="giant">
            ${drawerContent()}
          </DrawerContent>
        </Drawer>
      </div>
    `,
  }),
};

export const WithoutFooter = {
  parameters: {
    docs: {
      description: {
        story:
          'Drawer without a footer. Useful for informational drawers or when actions are inline with content.',
      },
      source: {
        code: `<UnnnicDrawerNext>
  <UnnnicDrawerTrigger>
    <UnnnicButton text="Drawer Without Footer" />
  </UnnnicDrawerTrigger>
  <UnnnicDrawerContent>
    <UnnnicDrawerHeader>
      <UnnnicDrawerTitle>Information</UnnnicDrawerTitle>
      <UnnnicDrawerDescription>This drawer doesn't have a footer section.</UnnnicDrawerDescription>
    </UnnnicDrawerHeader>
    <section style="padding: 24px;">
      <p>This is an informational drawer without a footer.</p>
      <p>The user can close it by clicking the close button or outside the drawer.</p>
    </section>
  </UnnnicDrawerContent>
</UnnnicDrawerNext>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Drawer,
      DrawerContent,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      DrawerTrigger,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
<Drawer>
  <DrawerTrigger>
    <UnnnicButton text="Drawer Without Footer" />
  </DrawerTrigger>
  <DrawerContent v-bind="args">
    <DrawerHeader>
      <DrawerTitle>Information</DrawerTitle>
      <DrawerDescription>This drawer doesn't have a footer section.</DrawerDescription>
    </DrawerHeader>
    <section style="padding: 24px;">
      <p>This is an informational drawer without a footer. The user can close it by clicking the close button or outside the drawer.</p>
      <p>This pattern is useful for simple notifications or information displays that don't require explicit actions.</p>
    </section>
  </DrawerContent>
</Drawer>
    `,
  }),
};

export const CustomHeaderCloseButton = {
  parameters: {
    docs: {
      description: {
        story: 'Drawer with a custom close button in the header.',
      },
      source: {
        code: `<UnnnicDrawerNext>
  <UnnnicDrawerTrigger>
    <UnnnicButton text="Drawer With Custom Close Button" />
  </UnnnicDrawerTrigger>
  <UnnnicDrawerContent>
    <UnnnicDrawerHeader>
      <template #close>
        <DrawerClose>
          <UnnnicButton iconCenter="arrow_forward" size="small" type="tertiary" />
        </DrawerClose>
      </template>
      <UnnnicDrawerTitle>Drawer With Custom Close Button</UnnnicDrawerTitle>
      <UnnnicDrawerDescription>This drawer has a custom close button in the header.</UnnnicDrawerDescription>
    </UnnnicDrawerHeader>
    <div style="padding: 24px;">
      <p>This drawer has a custom close button in the header. User must use footer buttons to close.</p>
    </div>
  </UnnnicDrawerContent>
</UnnnicDrawerNext>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Drawer,
      DrawerContent,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      DrawerTrigger,
      DrawerFooter,
      DrawerClose,
      UnnnicButton,
    },
    setup() {
      return { args };
    },
    template: `
<Drawer>
  <DrawerTrigger>
    <UnnnicButton text="Drawer With Custom Close Button" />
  </DrawerTrigger>
  <DrawerContent v-bind="args">
    <DrawerHeader>
      <template #close>
        <DrawerClose>
          <UnnnicButton iconCenter="arrow_forward" size="small" type="tertiary" />
        </DrawerClose>
      </template>
      <DrawerTitle>Drawer With Custom Close Button</DrawerTitle>
      <DrawerDescription>This drawer has a custom close button in the header.</DrawerDescription>
    </DrawerHeader>
    <section style="padding: 24px;">
      <p>
        This drawer has a custom close button in the header. The user must interact with the footer buttons to close the drawer.
      </p>
    </section>
  </DrawerContent>
</Drawer>
    `,
  }),
};

export const ControlledOpen = {
  parameters: {
    docs: {
      description: {
        story: `Drawer controlled by the "open" prop. This allows you to programmatically open and close the drawer.
          <br/>
          Use v-model:open to bind the open state to a reactive variable in your component.`,
      },
      source: {
        code: `<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const openDrawer = () => {
  isOpen.value = true;
};

const closeDrawer = () => {
  isOpen.value = false;
};
</script>

<template>
  <section>
    <UnnnicButton text="Open Drawer" @click="openDrawer" />
    
    <UnnnicDrawerNext v-model:open="isOpen">
      <UnnnicDrawerContent>
        <UnnnicDrawerHeader>
          <UnnnicDrawerTitle>Controlled Drawer</UnnnicDrawerTitle>
          <UnnnicDrawerDescription>This drawer is controlled by the "open" prop.</UnnnicDrawerDescription>
        </UnnnicDrawerHeader>
        <div style="padding: 24px;">
          <p>This drawer is controlled by the "open" prop.</p>
        </div>
      </UnnnicDrawerContent>
    </UnnnicDrawerNext>
  </section>
</template>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Drawer,
      DrawerContent,
      DrawerFooter,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      UnnnicButton,
      DrawerClose,
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
      openDrawer() {
        this.isOpen = true;
      },
      closeDrawer() {
        this.isOpen = false;
      },
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; gap: 16px; flex-direction: column;">
        <div style="display: flex; gap: 16px;">
          <UnnnicButton text="Open Drawer" @click="openDrawer" />
        </div>
        
        <p style="margin: 0; color: #67738B;">Drawer is currently: <strong>{{ isOpen ? 'OPEN' : 'CLOSED' }}</strong></p>

        <Drawer v-model:open="isOpen">
          <DrawerContent v-bind="args">
            <DrawerHeader>
              <DrawerTitle>Controlled Drawer</DrawerTitle>
              <DrawerDescription>This drawer is controlled by the "open" prop.</DrawerDescription>
            </DrawerHeader>
            <div style="padding: 24px; flex: 1; overflow-y: auto;">
              <p style="margin: 0; color: #67738B;">
                This drawer is controlled by the "open" prop. You can open and close it programmatically using the buttons.
              </p>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    `,
  }),
};

export const LongContent = {
  parameters: {
    docs: {
      description: {
        story:
          'Drawer with scrollable content. The drawer body will scroll when content exceeds the viewport height.',
      },
      source: {
        code: `<UnnnicDrawerNext>
  <UnnnicDrawerTrigger>
    <UnnnicButton text="Long Content Drawer" />
  </UnnnicDrawerTrigger>
  <UnnnicDrawerContent>
    <UnnnicDrawerHeader>
      <UnnnicDrawerTitle>Terms and Conditions</UnnnicDrawerTitle>
      <UnnnicDrawerDescription>Please read the following terms carefully.</UnnnicDrawerDescription>
    </UnnnicDrawerHeader>
    <div style="padding: 24px; flex: 1; overflow-y: auto;">
      <!-- Your long content here -->
      <div v-for="i in 10" :key="i">
        <h4>Section {{ i }}</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </div>
    </div>
    <UnnnicDrawerFooter>
      <UnnnicButton text="Cancel" type="tertiary" />
      <UnnnicButton text="Confirm" type="primary" />
    </UnnnicDrawerFooter>
  </UnnnicDrawerContent>
</UnnnicDrawerNext>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Drawer,
      DrawerContent,
      DrawerFooter,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      DrawerTrigger,
      UnnnicButton,
      DrawerClose,
    },
    setup() {
      return { args };
    },
    template: `
<Drawer>
  <DrawerTrigger>
    <UnnnicButton text="Long Content Drawer" />
  </DrawerTrigger>
  <DrawerContent v-bind="args">
    <DrawerHeader>
      <DrawerTitle>Terms and Conditions</DrawerTitle>
      <DrawerDescription>Please read the following terms carefully.</DrawerDescription>
    </DrawerHeader>
    <div style="padding: 24px; flex: 1; overflow-y: auto;">
      <div v-for="i in 10" :key="i" style="margin-bottom: 16px;">
        <h4 style="margin: 0 0 8px 0; color: #272B33;">Section {{ i }}</h4>
        <p style="margin: 0; color: #67738B; line-height: 1.6;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
    <DrawerFooter>
      <DrawerClose>
        <UnnnicButton text="Cancel" type="tertiary" />
      </DrawerClose>
      <UnnnicButton text="Confirm" type="primary" />
    </DrawerFooter>
  </DrawerContent>
</Drawer>
    `,
  }),
};

export const WithoutOverlay = {
  parameters: {
    docs: {
      description: {
        story: `Drawer without overlay background. Useful when nesting drawers or when you want to allow interaction with the page behind.
          <br/>
          It is recommended to use this variation for contexts where the drawer is used with another drawer or modal.`,
      },
      source: {
        code: `<UnnnicDrawerNext>
  <UnnnicDrawerTrigger>
    <UnnnicButton text="Drawer Without Overlay" />
  </UnnnicDrawerTrigger>
  <UnnnicDrawerContent :showOverlay="false">
    <UnnnicDrawerHeader>
      <UnnnicDrawerTitle>Drawer Without Overlay</UnnnicDrawerTitle>
      <UnnnicDrawerDescription>This drawer doesn't have a background overlay.</UnnnicDrawerDescription>
    </UnnnicDrawerHeader>
    <div style="padding: 24px;">
      <p>You can interact with the page behind this drawer.</p>
    </div>
  </UnnnicDrawerContent>
</UnnnicDrawerNext>`,
      },
    },
  },
  render: (args) => ({
    components: {
      Drawer,
      DrawerContent,
      DrawerTrigger,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      DrawerFooter,
      UnnnicButton,
      DrawerClose,
    },
    setup() {
      return { args };
    },
    template: `
<Drawer>
  <DrawerTrigger>
    <UnnnicButton text="Drawer Without Overlay" />
  </DrawerTrigger>
  <DrawerContent v-bind="args" :showOverlay="false">
    <DrawerHeader>
      <DrawerTitle>Drawer Without Overlay</DrawerTitle>
      <DrawerDescription>This drawer doesn't have a background overlay.</DrawerDescription>
    </DrawerHeader>
    <div style="padding: 24px; flex: 1; overflow-y: auto;">
      <p style="margin: 0; color: #67738B;">
        You can interact with the page behind this drawer. This is useful when nesting drawers or modals, 
        or when you want to allow users to reference content on the page while the drawer is open.
      </p>
    </div>
  </DrawerContent>
</Drawer>
    `,
  }),
};
