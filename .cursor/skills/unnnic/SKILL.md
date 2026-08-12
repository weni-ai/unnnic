# Unnnic Design System

Use this skill when implementing UI with Weni's Unnnic Design System (`@weni/unnnic-system`).

## Import

```vue
<script setup>
import { UnnnicButton, UnnnicInput, UnnnicFormElement } from '@weni/unnnic-system';
</script>
```

## Priority Components

These are the most commonly used components. Use these first before looking for alternatives.

### Form Controls

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `UnnnicButton` | Actions | `type`: primary/secondary/tertiary/warning/attention, `size`: large/small, `loading`, `disabled`, `iconLeft`, `iconRight` |
| `UnnnicInput` | Text input | `type`: normal/error, `size`: md/sm, `iconLeft`, `iconRight`, `placeholder` |
| `UnnnicFormElement` | Form wrapper | `label`, `error`, `message`, `disabled` — wrap inputs with this |
| `UnnnicTextArea` | Multiline text | `modelValue`, `maxlength` |
| `UnnnicSelect` | Dropdown select | `options`, `modelValue` |
| `UnnnicCheckbox` | Boolean toggle | `modelValue`, `label` |
| `UnnnicCheckboxGroup` | Checkbox list | `options`, `modelValue` |
| `UnnnicRadio` | Single option | `modelValue`, `value` |
| `UnnnicRadioGroup` | Radio list | `options`, `modelValue` |
| `UnnnicSwitch` | Toggle switch | `modelValue`, `label` |
| `UnnnicDatePicker` | Date selection | `modelValue`, `format` |

### Feedback & Overlays

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `UnnnicDialog` | Modern dialog | Composable: `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogClose` |
| `UnnnicDrawerNext` | Modern drawer | Composable: `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerClose` |
| `UnnnicToast` | Notification | Use `unnnicToastManager.show({ type, message })` |
| `UnnnicPopover` | Popover | Composable: `PopoverTrigger`, `PopoverContent` |
| `UnnnicToolTip` | Tooltip | `text`, `side` |

### Display

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `UnnnicIcon` | Icon | `icon`, `scheme`, `size`: ant/sm/md/lg/xl |
| `UnnnicChip` | Chip | `text`, `removable` |
| `UnnnicTag` | Label | `text`, `type` |
| `UnnnicSkeletonLoading` | Loading | `width`, `height` |
| `UnnnicTabs` | Modern tabs | Composable: `TabsList`, `TabsTrigger`, `TabsContent` |
| `UnnnicPageHeader` | Page header | `title`, `description`, slots for actions |

## Other Components

### Legacy (use modern alternatives when possible)

| Legacy | Modern Alternative |
|--------|-------------------|
| `UnnnicModal` | `UnnnicDialog` |
| `UnnnicDrawer` | `UnnnicDrawerNext` |
| `UnnnicTab` | `UnnnicTabs` |

### Additional Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `UnnnicSelectSmart` | Advanced select | `options`, `modelValue`, `multiple`, `autocomplete` |
| `UnnnicMultiSelect` | Multi-select | `options`, `modelValue` |
| `UnnnicTable` | Legacy table | `headers`, use `UnnnicTableRow` for rows |
| `UnnnicTableNext` | Modern table | `headers`, `items`, `@row-click`, `@sort` |
| `UnnnicDataTable` | Data table | `headers`, `items`, with pagination |
| `UnnnicCard` | Container | Generic card wrapper |
| `UnnnicAlert` | Inline message | `type`: info/success/warning/error, `message` |
| `UnnnicBanner` | Page alert | `type`, `message` |
| `UnnnicSidebar` | App sidebar | Contains `UnnnicSidebarItem` |
| `UnnnicBreadcrumb` | Breadcrumbs | `crumbs` array |
| `UnnnicPagination` | Page nav | `modelValue`, `total`, `perPage` |
| `UnnnicDropdown` | Dropdown menu | Contains `UnnnicDropdownItem` |
| `UnnnicAvatarIcon` | User avatar | `username`, `size` |

## Tokens

### Colors (SCSS)

**Background:** `$unnnic-color-bg-{variant}`
- `base`, `base-soft`, `muted` — neutrals
- `accent-strong` — primary brand (teal)
- `success`, `warning`, `critical`, `info` — semantic

**Foreground:** `$unnnic-color-fg-{variant}`
- `base`, `emphasized`, `muted`, `inverted`
- `accent`, `success`, `warning`, `critical`, `info`

**Border:** `$unnnic-color-border-{variant}`
- `base`, `muted`, `emphasized`
- `accent-strong`, `success`, `warning`, `critical`, `info`

### Spacing (SCSS)

`$unnnic-space-{n}` — Base unit: 4px

| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |

### Typography (SCSS mixins)

```scss
@include unnnic-font-display-1;  // 24px bold
@include unnnic-font-display-2;  // 20px semibold
@include unnnic-font-body;       // 14px regular
@include unnnic-font-caption-1;  // 12px regular
@include unnnic-font-action;     // 14px semibold (buttons)
```

### Radii

`$unnnic-radius-{n}` — 1, 2, 3, 4 (4px increments)

### Shadows

`$unnnic-shadow-{n}` — 1, 2, 3

## Patterns

### Form with Validation

```vue
<UnnnicFormElement label="Email" :error="errors.email">
  <UnnnicInput 
    v-model="email" 
    :type="errors.email ? 'error' : 'normal'"
    placeholder="user@example.com"
  />
</UnnnicFormElement>
```

### Button Hierarchy

- **Primary action:** `type="primary"` — one per section
- **Secondary action:** `type="secondary"`
- **Tertiary/link:** `type="tertiary"`
- **Destructive:** `type="warning"`
- **Caution:** `type="attention"`

### Modal Dialog

```vue
<UnnnicModalDialog
  title="Confirm deletion"
  description="This action cannot be undone"
  primaryAction="Delete"
  secondaryAction="Cancel"
  @click-action-primary="handleDelete"
  @click-action-secondary="closeModal"
/>
```

### Toast Notifications

```typescript
import { unnnicToastManager } from '@weni/unnnic-system';

unnnicToastManager.show({
  type: 'success', // success | error | warning | info
  message: 'Changes saved',
});
```

### Modern Composable Components

Newer components use composable patterns:

```vue
<UnnnicDialog>
  <UnnnicDialogTrigger>
    <UnnnicButton>Open</UnnnicButton>
  </UnnnicDialogTrigger>
  <UnnnicDialogContent>
    <UnnnicDialogHeader>
      <UnnnicDialogTitle>Title</UnnnicDialogTitle>
    </UnnnicDialogHeader>
    <!-- content -->
    <UnnnicDialogFooter>
      <UnnnicDialogClose>
        <UnnnicButton type="secondary">Cancel</UnnnicButton>
      </UnnnicDialogClose>
      <UnnnicButton type="primary">Confirm</UnnnicButton>
    </UnnnicDialogFooter>
  </UnnnicDialogContent>
</UnnnicDialog>
```

## Figma Integration

When implementing from Figma designs:

1. Use Figma MCP `get_design_context` to get component structure
2. Match Figma component names to Unnnic exports (e.g., "Button" → `UnnnicButton`)
3. Use semantic tokens — never hardcode colors
4. Check for Code Connect snippets in Figma Dev Mode

## Common Mistakes to Avoid

- Don't use raw `<input>` — use `UnnnicInput` wrapped in `UnnnicFormElement`
- Don't hardcode colors — use `$unnnic-color-*` tokens
- Don't use multiple `type="primary"` buttons in same section
- Don't forget error states — pass `error` prop to `UnnnicFormElement`
- Don't use legacy `UnnnicModal` for new code — prefer `UnnnicModalNext` or `UnnnicDialog`

## Resources

- **Storybook:** https://unnnic.weni.ai
- **Figma:** https://figma.com/design/YbvOpVPUBxTSEzg4J8pXKu/Weni---unnnic
- **npm:** https://www.npmjs.com/package/@weni/unnnic-system
