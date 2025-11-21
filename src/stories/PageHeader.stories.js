import { action } from '@storybook/addon-actions';

import PageHeader from '../components/PageHeader/PageHeader.vue';
import UnnnicButton from '../components/Button/Button.vue';
import UnnnicTag from '../components/Tag/Tag.vue';
import UnnnicSelectSmart from '../components/SelectSmart/SelectSmart.vue';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A page header component to standardize the header of pages.
          <br/>
          It supports title, description, actions, tabs, tags, and back navigation.
          <br/>
          This component provides multiple variations to handle different page header scenarios.
          `,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The title of the page',
    },
    description: {
      control: { type: 'text' },
      description: 'The description text below the title',
    },
    hasBackButton: {
      control: { type: 'boolean' },
      description: 'Show back navigation button',
    },
  },
  args: {
    title: 'Page Name',
    description: 'Description',
    hasBackButton: false,
  },
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'A simple page header with title and description.',
      },
      source: {
        code: `
<UnnnicPageHeader 
  title="Page Name"
  description="Description"
/>
        `,
      },
    },
  },
  render: (args) => ({
    components: { PageHeader },
    setup() {
      return { args };
    },
    template: `
      <PageHeader v-bind="args" />
    `,
  }),
};

export const WithActions = {
  parameters: {
    docs: {
      description: {
        story:
          'Page header with action buttons on the right side. Supports primary and secondary actions.',
      },
      source: {
        code: `
<UnnnicPageHeader 
  title="Page Name"
  description="Description"
>
  <template #actions>
    <UnnnicButton text="Button" type="secondary" />
    <UnnnicButton text="Button" type="primary" />
  </template>
</UnnnicPageHeader>
        `,
      },
    },
  },
  render: (args) => ({
    components: {
      PageHeader,
      UnnnicButton,
      Tabs,
      TabsList,
      TabsTrigger,
      TabsContent,
    },
    setup() {
      return { args };
    },
    template: `
      <PageHeader v-bind="args">
        <template #actions>
          <UnnnicButton text="Button" type="secondary" />
          <UnnnicButton text="Button" type="primary" />
        </template>
      </PageHeader>
    `,
  }),
};

export const WithTabs = {
  parameters: {
    docs: {
      description: {
        story:
          'Page header with tabs for navigation. Useful for pages with multiple sections divided by tabs.',
      },
      source: {
        code: `
<UnnnicPageHeader 
  title="Page Name"
  description="Description"
>
  <template #actions>
    <UnnnicButton text="Button" type="secondary" />
    <UnnnicButton text="Button" type="primary" />
  </template>
  <template #tabs>
    <UnnnicTabs defaultValue="label1">
      <UnnnicTabsList>
        <UnnnicTabsTrigger value="label1">Label</UnnnicTabsTrigger>
        <UnnnicTabsTrigger value="label2">Label</UnnnicTabsTrigger>
        <UnnnicTabsTrigger value="label3">Label</UnnnicTabsTrigger>
      </UnnnicTabsList>
    </UnnnicTabs>
  </template>
</UnnnicPageHeader>
        `,
      },
    },
  },
  render: (args) => ({
    components: {
      PageHeader,
      UnnnicButton,
      Tabs,
      TabsList,
      TabsTrigger,
      TabsContent,
    },
    setup() {
      return { args };
    },
    template: `
      <PageHeader v-bind="args">
        <template #actions>
          <UnnnicButton text="Button" type="secondary" />
          <UnnnicButton text="Button" type="primary" />
        </template>
        <template #tabs>
          <Tabs defaultValue="label1">
            <TabsList>
              <TabsTrigger value="label1">Label</TabsTrigger>
              <TabsTrigger value="label2">Label</TabsTrigger>
              <TabsTrigger value="label3">Label</TabsTrigger>
            </TabsList>
          </Tabs>
        </template>
      </PageHeader>
    `,
  }),
};

export const WithSelect = {
  parameters: {
    docs: {
      description: {
        story: 'Page header with a select dropdown on the right side.',
      },
      source: {
        code: `
<UnnnicPageHeader 
  title="Page Name"
  description="Description"
>
  <template #actions>
    <UnnnicSelectSmart />
  </template>
</UnnnicPageHeader>
        `,
      },
    },
  },
  render: (args) => ({
    components: { PageHeader, UnnnicSelectSmart },
    setup() {
      return { args };
    },
    template: `
      <PageHeader v-bind="args">
        <template #actions>
          <UnnnicSelectSmart />
        </template>
      </PageHeader>
    `,
  }),
};

export const WithTag = {
  parameters: {
    docs: {
      description: {
        story: 'Page header with a tag next to the title and action buttons.',
      },
      source: {
        code: `
<UnnnicPageHeader 
  title="Page Name"
  description="Description"
>
  <template #tag>
    <UnnnicTag text="Tag name" scheme="gray" />
  </template>
  <template #actions>
    <UnnnicButton text="Button" type="secondary" />
    <UnnnicButton text="Button" type="primary" />
  </template>
</UnnnicPageHeader>
        `,
      },
    },
  },
  render: (args) => ({
    components: { PageHeader, UnnnicButton, UnnnicTag },
    setup() {
      return { args };
    },
    template: `
      <PageHeader v-bind="args">
        <template #tag>
          <UnnnicTag text="Tag name" scheme="gray" />
        </template>
        <template #actions>
          <UnnnicButton text="Button" type="secondary" />
          <UnnnicButton text="Button" type="primary" />
        </template>
      </PageHeader>
    `,
  }),
};

export const WithMenuButton = {
  parameters: {
    docs: {
      description: {
        story: 'Page header with a menu button (three dots) on the right side.',
      },
      source: {
        code: `
<UnnnicPageHeader 
  title="Page Name"
  description="Description"
>
  <template #actions>
    <UnnnicButton type="tertiary" iconCenter="more_vert" />
  </template>
</UnnnicPageHeader>
        `,
      },
    },
  },
  render: (args) => ({
    components: { PageHeader, UnnnicButton },
    setup() {
      return { args };
    },
    template: `
      <PageHeader v-bind="args">
        <template #actions>
          <UnnnicButton type="tertiary" iconCenter="more_vert" />
        </template>
      </PageHeader>
    `,
  }),
};

export const WithBackButton = {
  parameters: {
    docs: {
      description: {
        story: 'Page header with a back navigation button.',
      },
      source: {
        code: `
<UnnnicPageHeader 
  title="Page Name"
  :hasBackButton="true"
/>
        `,
      },
    },
  },
  render: (args) => ({
    components: { PageHeader },
    setup() {
      const handleBack = () => {
        action('back')();
      };

      return {
        args: {
          ...args,
          hasBackButton: true,
          description: '',
        },
        handleBack,
      };
    },
    template: `
      <PageHeader v-bind="args" @back="handleBack" />
    `,
  }),
};
