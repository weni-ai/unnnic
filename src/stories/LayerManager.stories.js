import { ref } from 'vue';
import UnnnicButton from '../components/Button/Button.vue';
import UnnnicToast from '../components/Toast/Toast.vue';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../components/ui/dialog';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '../components/ui/drawer';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../components/ui/popover';

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '../components/ui/tooltip';

export default {
  title: 'Utilities/Layer Manager',
  parameters: {
    docs: {
      description: {
        component:
          'Minimal stories that prove the global layer manager keeps dialogs, drawers, tooltips, popovers and toasts in the right stacking order.',
      },
    },
  },
};

export const DialogWithTooltipAndPopover = {
  name: 'Dialog > Tooltip + Popover',
  render: () => ({
    components: {
      Dialog,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogFooter,
      DialogClose,
      Tooltip,
      TooltipTrigger,
      TooltipContent,
      Popover,
      PopoverTrigger,
      PopoverContent,
      UnnnicButton,
    },
    template: `
      <Dialog>
        <DialogTrigger>
          <UnnnicButton text="Open dialog" type="primary" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog surface</DialogTitle>
          </DialogHeader>

          <div style="padding: 24px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
            <Tooltip>
              <TooltipTrigger>
                <UnnnicButton text="Tooltip" type="secondary" />
              </TooltipTrigger>
              <TooltipContent>This tooltip should appear above the dialog.</TooltipContent>
            </Tooltip>

            <Popover>
              <PopoverTrigger>
                <UnnnicButton text="Popover" type="primary" />
              </PopoverTrigger>
              <PopoverContent>
                <section style="padding: 16px;">
                  <p style="margin: 0; color: #67738B;">
                    Popover content should also float above.
                  </p>
                </section>
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <DialogClose>
              <UnnnicButton text="Close" type="tertiary" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
};

export const DrawerWithTooltipAndPopover = {
  name: 'Drawer > Tooltip + Popover',
  render: () => ({
    components: {
      Drawer,
      DrawerTrigger,
      DrawerContent,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      DrawerFooter,
      DrawerClose,
      Tooltip,
      TooltipTrigger,
      TooltipContent,
      Popover,
      PopoverTrigger,
      PopoverContent,
      UnnnicButton,
    },
    template: `
      <Drawer>
        <DrawerTrigger>
          <UnnnicButton text="Open drawer" type="primary" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer surface</DrawerTitle>
            <DrawerDescription>Interact with floating layers.</DrawerDescription>
          </DrawerHeader>

          <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
            <Tooltip>
              <TooltipTrigger>
                <UnnnicButton text="Tooltip" type="secondary" />
              </TooltipTrigger>
              <TooltipContent>Tooltip should appear above the drawer.</TooltipContent>
            </Tooltip>

            <Popover>
              <PopoverTrigger>
                <UnnnicButton text="Popover" type="primary" />
              </PopoverTrigger>
              <PopoverContent>
                <section style="padding: 16px;">
                  <p style="margin: 0; color: #67738B;">
                    Popover content should remain on top too.
                  </p>
                </section>
              </PopoverContent>
            </Popover>
          </div>

          <DrawerFooter>
            <DrawerClose>
              <UnnnicButton text="Close drawer" type="tertiary" />
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    `,
  }),
};

export const DrawerNextToDialog = {
  name: 'Drawer > Dialog',
  render: () => ({
    components: {
      Drawer,
      DrawerContent,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      DrawerFooter,
      DrawerClose,
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      UnnnicButton,
    },
    setup() {
      const drawerOpen = ref(false);
      const dialogOpen = ref(false);
      return { drawerOpen, dialogOpen };
    },
    template: `
      <div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
          <UnnnicButton text="Open drawer" type="primary" @click="drawerOpen = true" />
        </div>

        <Drawer v-model:open="drawerOpen">
          <DrawerContent size="large">
            <DrawerHeader>
              <DrawerTitle>Drawer</DrawerTitle>
            </DrawerHeader>
            <div style="padding: 24px; color: #67738B; display: grid; gap: 16px;">
              Keep this drawer open and toggle the dialog.

              <UnnnicButton text="Open dialog" @click="dialogOpen = true" />
            </div>
          </DrawerContent>
        </Drawer>

        <Dialog v-model:open="dialogOpen">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog overlay</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px; color: #67738B;">
              This dialog must appear above the drawer and its overlay.
            </div>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const DrawerOpenedFromDialog = {
  name: 'Dialog > Drawer',
  render: () => ({
    components: {
      UnnnicButton,
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      Drawer,
      DrawerContent,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
    },
    setup() {
      const dialogOpen = ref(false);
      const drawerOpen = ref(false);
      return { dialogOpen, drawerOpen };
    },
    template: `
      <div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
          <UnnnicButton text="Open dialog" type="primary" @click="dialogOpen = true" />
        </div>
        <Dialog v-model:open="dialogOpen">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
            </DialogHeader>
            <div style="padding: 24px; color: #67738B;">
              <UnnnicButton text="Open drawer" type="primary" @click="drawerOpen = true" /> 
            </div>
          </DialogContent>
        </Dialog>
        <Drawer v-model:open="drawerOpen">
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer</DrawerTitle>
            </DrawerHeader>
            <div style="padding: 24px; color: #67738B;">
              Drawer should appear above the dialog.
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    `,
  }),
};

export const NestedDialogs = {
  name: 'Dialog nested',
  render: () => ({
    components: {
      Dialog,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogFooter,
      DialogClose,
      Tooltip,
      TooltipTrigger,
      TooltipContent,
      UnnnicButton,
    },
    setup() {
      const parentOpen = ref(false);
      const childOpen = ref(false);
      return { parentOpen, childOpen };
    },
    template: `
      <Dialog v-model:open="parentOpen">
        <DialogTrigger>
          <UnnnicButton text="Open parent dialog" type="primary" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Parent dialog</DialogTitle>
          </DialogHeader>
          <div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
            <p style="margin: 0; color: #67738B;">Open the child dialog to stack overlays.</p>
            <UnnnicButton text="Open child dialog" type="primary" @click="childOpen = true" />
          </div>
          <DialogFooter>
            <DialogClose>
              <UnnnicButton text="Close parent" type="tertiary" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog v-model:open="childOpen">
        <DialogContent size="small">
          <DialogHeader>
            <DialogTitle>Child dialog</DialogTitle>
          </DialogHeader>
          <div style="padding: 24px; display: flex; flex-direction: column; gap: 8px;">
            <Tooltip>
              <TooltipTrigger>
                <UnnnicButton text="Tooltip here" type="secondary" />
              </TooltipTrigger>
              <TooltipContent>Tooltip stays on top of both dialogs.</TooltipContent>
            </Tooltip>
          </div>
          <DialogFooter>
            <DialogClose>
              <UnnnicButton text="Close child" type="primary" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
};

export const DialogWithToast = {
  name: 'Dialog > Toast',
  render: () => ({
    components: {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogFooter,
      DialogClose,
      UnnnicToast,
      UnnnicButton,
    },
    setup() {
      const dialogOpen = ref(false);
      const toastVisible = ref(false);
      const toastKey = ref(0);

      const showToast = () => {
        toastKey.value += 1;
        toastVisible.value = true;
      };

      return { dialogOpen, toastVisible, toastKey, showToast };
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <UnnnicButton text="Open dialog" type="primary" @click="dialogOpen = true" />
        <UnnnicButton text="Show toast" type="secondary" @click="showToast" />
      </div>

      <Dialog v-model:open="dialogOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog layer</DialogTitle>
          </DialogHeader>
          <div style="padding: 24px; color: #67738B;">
            Use the buttons to compare dialog and toast layers.
          </div>
          <DialogFooter>
            <DialogClose>
              <UnnnicButton text="Close dialog" type="tertiary" />
            </DialogClose>
            <UnnnicButton text="Show toast" type="primary" @click="showToast" />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UnnnicToast
        v-if="toastVisible"
        :key="toastKey"
        title="Toast layer"
        description="Toasts should always float above dialogs."
        type="success"
        :timeout="0"
        @close="toastVisible = false"
      />
    `,
  }),
};
