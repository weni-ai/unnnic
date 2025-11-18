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

export default {
  title: 'Misc/DrawerNext',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A drawer component that displays rich content in a portal, floating on top of other content.
          <br/>
          It supports three sizes (small, medium, large).
          <br/>
          API reference: https://www.reka-ui.com/docs/components/drawer
          `,
      },
    },
  },
  argTypes: {},
  args: {
    size: 'medium',
    side: 'bottom',
    align: 'center',
  },
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'A simple drawer with some content inside.',
      },
      source: {
        code: `
<Drawer>
  <DrawerTrigger> Open </DrawerTrigger>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Title</DrawerTitle>
        <DrawerDescription>Description</DrawerDescription>
        
      </DrawerHeader>
      <section style="padding: 24px;">
        <p style="margin: 0;">Content</p>
      </section>
      <DrawerFooter>  
        <UnnnicButton text="Button" type="tertiary" />
        <UnnnicButton text="Button" type="primary" />
      </DrawerFooter>
    </DrawerContent>
  </DrawerPortal>
</Drawer>
        `,
      },
    },
  },
  render: (args) => ({
    components: {
      Drawer,
      DrawerContent,
      DrawerTrigger,
      UnnnicButton,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      DrawerFooter,
      DrawerClose,
    },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
        <Drawer>
          <DrawerTrigger> Open </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent v-bind="args">
              <DrawerHeader>
                <DrawerTitle>Title</DrawerTitle>
                <DrawerDescription>Description</DrawerDescription>
              </DrawerHeader>
              <section style="padding: 24px;">
                <p style="margin: 0;">Content</p>
              </section>
              <DrawerFooter>  
                <UnnnicButton text="Button" type="tertiary" />
                <UnnnicButton text="Button" type="primary" />
              </DrawerFooter>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>
    `,
  }),
};
