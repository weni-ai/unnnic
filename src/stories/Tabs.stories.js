import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import UnnnicToolTip from '@/components/ToolTip/ToolTip.vue';
import UnnnicIcon from '@/components/Icon.vue';
import '@/assets/scss/tailwind.scss';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  render: (args) => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      return { args };
    },
    template: `
      <Tabs v-bind="args">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div>Make changes to your account here.</div>
        </TabsContent>
        <TabsContent value="password">
          <div>Change your password here.</div>
        </TabsContent>
        <TabsContent value="settings">
          <div>Update your application settings here.</div>
        </TabsContent>
      </Tabs>
    `,
  }),
  args: {
    defaultValue: 'account',
  },
  argTypes: {
    defaultValue: {
      control: { type: 'select' },
      options: ['account', 'password', 'settings'],
    },
  },
};

export const Default = {
  args: {
    defaultValue: 'account',
  },
};

export const Disabled = {
  render: (args) => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      return { args };
    },
    template: `
      <Tabs v-bind="args">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password" disabled>Password</TabsTrigger>
          <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div>Make changes to your account here.</div>
        </TabsContent>
        <TabsContent value="password">
          <div>Change your password here.</div>
        </TabsContent>
        <TabsContent value="settings">
          <div>Update your application settings here.</div>
        </TabsContent>
      </Tabs>
    `,
  }),
  args: {
    defaultValue: 'account',
  },
};

export const WithTooltip = {
  render: (args) => ({
    components: {
      Tabs,
      TabsList,
      TabsTrigger,
      TabsContent,
      UnnnicToolTip,
      UnnnicIcon,
    },
    setup() {
      return { args };
    },
    template: `
      <Tabs v-bind="args">
        <TabsList>
          <TabsTrigger value="account">
              Account
              <UnnnicToolTip enabled text="Manage your account settings" side="bottom" class="!inline-flex items-center">
                <UnnnicIcon icon="help" size="sm" scheme="fg-base"/>
              </UnnnicToolTip>
          </TabsTrigger>
          <TabsTrigger value="password">
            <span>Password</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div>Make changes to your account here.</div>
        </TabsContent>
        <TabsContent value="password">
          <div>Change your password here.</div>
        </TabsContent>
        <TabsContent value="settings">
          <div>Update your application settings here.</div>
        </TabsContent>
      </Tabs>
    `,
  }),
  args: {
    defaultValue: 'account',
  },
};
