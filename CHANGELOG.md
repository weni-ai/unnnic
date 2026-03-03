# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# 3.24.2 (2026-02-20)

### Added

- **InputDatePicker**: `disabled` prop to show disabled input variation.

# 3.24.1 (2026-02-12)

### Added

- **ChatsMessage**: `highlighted` prop to visually highlight messages.
- **DatePicker**: `hideOptions` prop to hide the period options section (e.g. "Last 7 days", Clear/Filter buttons) when enabled.

# 3.24.0 (2026-02-11)

### Added

- **ToolTip**: Exposed `class` prop and `contentProps` (partial `TooltipContentProps` from reka-ui) so consumers can apply custom styling and override tooltip internal content classes.

# 3.23.0 (2026-02-10)

### Added

- **ModalDialog**: Added `title` named slot to allow custom title content (e.g., buttons, tags, icons, or any Vue component). The existing `title` prop continues to work as a fallback when no slot is provided.

# 3.22.0 (2026-02-10)

### Added

- **Type definitions**: Added `unnnicFormElement`, `unnnicRadioGroup`, and `unnnicCheckboxGroup` component exports.

### Changed

- **ToolTip**: Migrated to Composition API with TypeScript, aligned tooltip text when `side` is `top`/`bottom`, and switched trigger display to `flex`.
- **Form components**: Migrated `FormElement`, `CheckboxGroup`, `RadioGroup`, `Switch`, `Input`, and `TextArea` to Composition API/TypeScript and updated tooltip handling to use object props.
- **Label**: Tooltip now accepts `TooltipProps`; removed `useHtmlTooltip` in favor of unified tooltip props.
- **Tab**: Removed unused tooltip styles.

# 3.21.0 (2026-02-09)

### Added

- **ToolTip**: Close button support via `showClose` prop; tooltip can be controlled with `forceOpen` and `@click:close` when using the close button.
- **Tabs**: Right slot for content on the right side of the tabs; styling adjustments.

# 3.20.0 (2026-02-06)

### Added

- **Design Tokens as JavaScript/TypeScript**:
  - Added ES Module exports for all design tokens (colors, fonts, spaces, radii, shadows, icon-sizes)
  - Tokens are now available as importable JavaScript constants with TypeScript definitions
  - Supports tree-shaking for optimal bundle size
  - Example usage: `import { colorTeal600, colorBlue500 } from '@weni/unnnic-system/tokens/colors'`
  - Package exports added for `@weni/unnnic-system/tokens/colors`, `@weni/unnnic-system/tokens/fonts`, `@weni/unnnic-system/tokens/spaces`, `@weni/unnnic-system/tokens/radii`, `@weni/unnnic-system/tokens/shadows`, and `@weni/unnnic-system/tokens/icon-sizes`
  - All token exports use camelCase naming (e.g., `colorTeal600`, `fontSize`, `space4`)
  - Tokens are generated as `.mjs` files with corresponding `.d.ts` TypeScript definitions

### Changed

- **Build Process**:
  - Updated build script to automatically generate design tokens after Vite build
  - Style Dictionary now generates both SCSS variables and JavaScript/TypeScript exports

# 3.19.0 (2026-02-03)

### Added

- **AudioRecorder**:
  - Added `AudioRecord` transcription support

# 3.18.0 (2026-02-02)

### Added

- **Teleport target configuration**: `Unnnic.install({ teleportTarget })` to route teleported layers to a custom container (CSS selector or `HTMLElement`).
- **Layer manager**: `useLayerZIndex({ offset })` (base z-index 1000, step 5) to keep dialogs/drawers/popovers/tooltips/toasts stacked correctly, including overlay offsets.
- **Dialog primitives**: Introduced `UnnnicDialog*` components with size variants (`small` | `medium` | `large`) and Storybook examples.
- **Drawer primitives**: Introduced `UnnnicDrawer*` components with size variants (`medium` | `large` | `extra-large` | `giant`) and Storybook examples.
- **LayerManager docs/stories**: Added documentation and interactive Storybook stories demonstrating stacking order across overlays.

### Changed

- **ModalDialog**: Rebuilt on top of `UnnnicDialog*`; forwards `$attrs` into content, disables `inheritAttrs`, adds `persistent` handling for Escape/outside-click, and is marked as deprecated in Storybook.
- **Popover/Tooltip/Toast layering**: Popovers/tooltips/toasts now use the configured teleport target and `useLayerZIndex()` instead of hardcoded z-index; related triggers/styles were migrated to SCSS where applicable.
- **InputDatePicker**: Now uses the popover primitives (`UnnnicPopover*`), improving behavior inside dialogs/overlays.

# 3.17.1 (2026-01-20)

### Added

- **Select/MultiSelect Components**:
  - Added `clearable` prop to enable show clear button.

- **Tour Component**:
  - Added missing `pointer-events` css attribute

# 3.17.0 (2026-01-20)

### Added

- **Disclaimer Component**:
  - Added slot support for description in disclaimer component.

# 3.16.0 (2026-01-16)

### Added

- **Switch Component**:
  - Added slot support for extra content in switch component.

# 3.15.0 (2026-01-15)

### Added

- **Select Component**:
  - Added infinite scroll support with new props: `infiniteScroll`, `infiniteScrollDistance`, and `infiniteScrollCanLoadMore` callback.
  - Added `scroll-end` event emitted when scroll reaches the threshold to load more items.
  - Exposed `finishInfiniteScroll()` and `resetInfiniteScroll()` methods for managing infinite scroll state.
  - Added loading indicator (spinner) displayed while loading more items.
  - Integrated `@vueuse/core`'s `useInfiniteScroll` composable for scroll detection.

# 3.14.0 (2025-01-12)

### Added

- **MultiSelect**:
  - Rebuilt on Popover primitives with inline search, localized empty state, width syncing, checkbox options, and `returnObject` support.

# 3.13.0 (2025-01-12)

### Added

- **Select Component**:
  - Introduced `UnnnicSelect`, a popover-backed single select that mirrors `UnnnicInput`, supports keyboard navigation, disabled items, optional search input, custom `itemLabel`/`itemValue`, `returnObject`, auto width syncing, dynamic `optionsLines` height, clear action, and localized empty states.

### Changed

- **Input Family**:
  - Reintroduced focus transition styling and added `readonly`, `useFocusProp`, `focus`, and `showClear` props across `UnnnicInput`, `TextInput`, and `BaseInput` so programmatic focus and inline clear affordances are available without losing sanitization.

# 3.12.8 (2025-12-30)

### Fixed

- **Popover Content**:
  - Fixed padding space
  - Fixed scrollbar visual
  - Fixed borders visual

### Added

- **Popover Content**:
  - Added width prop to support custom sizes

# 3.12.7 (2025-12-26)

### Fixed

- **RadioGroup exports**:
  - Exposed `unnnicRadioGroup`/`UnnnicRadioGroup`.

# 3.12.6 (2025-12-26)

### Changed

- **Disclaimer Component**:
  - Replaced the icon names and normalized icon sizes to align with the latest design tokens.
  - Refactored the component classes to simplify the structure and keep styling consistent across variations.
  - Unified `DisclaimerV2` into `Disclaimer`, introducing an adapter layer so legacy props continue to work without breaking changes.
  - Updated the related test suites to reflect the consolidated component API.

# 3.12.5 (2025-12-26)

### Fixed

- **Type Declarations**:
  - Exported `FunnelStep` so Chart Funnel typings remain publicly accessible.
  - Cast `unnnicInputDatePicker` to `VueComponent` to prevent leaking SFC-only prop types.
  - Typed `PopoverContent` slots using `Slots` to restore `slots.default` inference.
  - Enabled `rollupTypes` (using the project `tsconfig`) so `vite-plugin-dts` emits a resolvable `dist/index.d.ts`.

# 3.12.4 (2025-12-23)

### Added

- **ChatsContact**:
  - Change yesterday translations logic
  - Added empty contact name tratative

# 3.12.3 (2025-12-12)

### Added

- **DisclaimerV2 Component**:
  - Introduced the new `UnnnicDisclaimerV2` component using `<script setup lang="ts">` and Composition API.
  - Added support for multiple semantic variants (`informational`, `success`, `attention`, `error`, `neutral`) with dedicated icon and color mappings.
  - Added unit tests covering default content, conditional title/description rendering, center alignment behavior, and variant-specific icon/scheme selection.
  - Documented the component in Storybook under `Example/DisclaimerV2` with stories for each variant.

# 3.12.2 (2025-12-05)

### Fixed

- **Popover module exports**:
  - Exposed `unnnicPopoverOption`/`UnnnicPopoverOption`.
  - Added the missing `unnnicPopoverFooter` exports.
  - `UnnnicInputDatePicker` as `VueComponent` at exports to fixes Typescript issue.

# 3.12.1 (2025-12-04)

### Added

- **PopoverOption Component**:
  - Added `PopoverOption` component.

# 3.12.0 (2025-12-03)

### Added

- **SegmentedControl Component**:
  - Introduced a segmented-control built on top of the `reka-ui` tabs primitives, composed by `SegmentedControl`, `SegmentedControlList`, `SegmentedControlTrigger`, and `SegmentedControlContent`.
  - Documented the component in Storybook under `Navigation/SegmentedControl`, covering default, disabled, adaptive-width, and small examples to guide adoption.

# 3.11.2 (2025-11-27)

### Added

- **DatePicker Component**:
  - Added `periodBaseDate` prop to allow custom reference dates for predefined periods (e.g. `last-7-days`, `last-12-months`, `current-month`, `previous-month`), enabling use cases like "Last 7 days (up to 24h ago)".
  - Added `data-testid` attributes to key interactive elements (root, navigation buttons, day/month/year cells, options, clear/apply buttons) to improve testability and coverage quality.
  - Added new Storybook stories demonstrating multiple usage patterns:
    - `SmallDayPicker` (type `day`, size `small`)
    - `MonthView` (type `month`)
    - `YearView` (type `year`)
    - `WithMinAndMaxDateRange` (date range constrained by `minDate` and `maxDate`)
    - `WithCustomLabelsAndDisableClear` (custom action/clear labels and `disableClear`)
    - `CustomRelativePeriodsWithBaseDate` (custom relative filters backed by `periodBaseDate`).
- **InputDatePicker Component**:
  - Added `periodBaseDate` prop passthrough so external consumers can leverage the new relative date presets from `UnnnicDatePicker` (e.g. "Last 7 days (up to 24h ago)").
  - Added new Storybook story `WithCustomRelativePeriodsAndBaseDate` showcasing InputDatePicker with relative filters backed by `periodBaseDate`.
  - Added focused unit tests for InputDatePicker covering integration with DatePicker, v-model behavior, formatting, and dropdown open/close logic.

### Changed

- **DatePicker Component**:
  - Migrated implementation to `<script setup lang="ts">` with Vue 3 Composition API while preserving the existing public API (props, events, and behavior) for backward compatibility.
  - Normalized internal date-handling logic to use typed helpers (`dateToString`, `stringToTime`, etc.) for safer arithmetic across day, month, and year views.
- **InputDatePicker Component**:
  - Migrated implementation to `<script setup lang="ts">` Composition API while preserving existing props (`modelValue`, `type`, `format`, `inputFormat`, etc.), events, and visual behavior for backward compatibility.

### Fixed

- **DatePicker Component**:
  - Corrected month label rendering in `type="month"` view by aligning month indices with the localized `monthsLocale` array (fixes incorrect labels and potential indexing errors).

# 3.11.0 (2025-11-24)

### Added

- **Toast Component**: New inline notification system with ToastManager for programmatic toast display
  - **Component**: Complete Toast component with multiple variants (success, info, warning, error)
  - **Toast Manager**: Programmatic API for displaying toasts via `this.$unnnicCallToast()`
  - **Storybook Documentation**: Complete documentation with interactive examples

- **PageHeader Component**: New page header component for consistent page layouts
  - **Flexible Layout**: Support for title, subtitle, and custom content slots
  - **Slot Support**: Left and right content slots for custom elements

- **Form Group Components**: New wrapper components for better form organization
  - **CheckboxGroup**: Group multiple checkboxes with shared label and tooltip support
  - **RadioGroup**: Group radio buttons with helper text and label styling

- **Form Elements Enhancement**: Major improvements to all form components
  - **Tooltip Support**: Added to Input, TextArea, Label, and Radio components
  - **Helper Text**: Added to Radio and RadioGroup components
  - **MaxLength Support**: Added to Input component with visual feedback
  - **Disabled State**: Improved disabled state styling across all form elements

- **New Icons**: Added dedicated SVG icons for form states
  - `checkbox-checked.svg` and `checkbox-checked-disabled.svg`
  - `checkbox-less.svg` and `checkbox-less-disabled.svg`
  - `radio-checked.svg`
  - `switch-checked.svg` and `switch-checked-disabled.svg`

- **Icon Component**: New foreground color types added to color scheme

### Changed

- **Form Elements Redesign**: Complete visual and structural redesign of form components
  - **Button**: Updated to use new design tokens, removed 'alternative' type, added transition effects
  - **Checkbox**: Redesigned with improved styling, restored intermediate state, new disabled state handling, also removed size prop
  - **Radio**: Complete redesign with improved structure and styling, also removed size prop
  - **Switch**: Redesigned with updated icons and improved component styles
  - **Input**: Enhanced with computed error handling, improved layout, dynamic styling based on size
  - **TextArea**: Restructured with improved error handling and message display
  - **Label**: Refactored with tooltip support and improved structure

- **FormElement Component**: Major refactoring for better structure and maintainability
  - **Label Integration**: Now uses UnnnicLabel component for improved consistency
  - **Error Handling**: Updated to allow null type for TextArea errors
  - **Improved Layout**: Restructured for better clarity and usability
  - **Spacing Updates**: Enhanced spacing for improved visual hierarchy

- **Tag Component**: Restructured and simplified
  - **Default Variation**: Consolidated to contain only default variation
  - **Improved Styling**: Enhanced with fit-content width and text overflow handling
  - **Type Safety**: Added comprehensive prop type definitions

- **Alert Component**: Simplified architecture
  - **Toast Integration**: Integrated with new UnnnicToast component
  - **Removed Deprecated**: Removed version variation 1.0 and AlertBanner and AlertCaller components
  - **Streamlined version 1.1**: Removed link (linkHref prop) variation
  - **Updated Tests**: Reflected version changes and removed deprecated props

- **Tab Component**: Enhanced functionality
  - **Disabled State**: Added support for disabled tabs
  - **Dynamic Tooltip**: Tooltip icon size now adjusts based on tab size

- **SelectSmart Component**: Improved consistency
  - **Border Styling**: Updated border radius and border styling
  - **Layout Adjustments**: Improved margin properties for better layout

- **ChatsContact Component**: Changed to have its own tag instead of using UnnnicTag

### Fixed

- **Input Component**: Added transition effect for smoother border color change on focus
- **Icon Component**: Fixed cursor styling for better UX

### Refactored

- **Button Component**: Replaced 'next' prop with 'clickable' for icon buttons, standardized text across stories
- **Input Component**: Replaced label section with UnnnicLabel component for improved structure
- **Label Component**: Renamed Props interface to LabelProps for clarity

# 3.10.0 (2025-11-24)

### Added

- **Icon Component**: Added filled attribute to rating component in MarketplaceCard.

### Changed

- **Refactor**: Replace old font files with a new material-symbols font.

### Fixed

- **Collapse Component**: Update icon size in Collapse component from 'xs' to 'ant'.

# 3.9.4 (2025-11-21)

### Changed

- **Border Radius Tokens**: Updated `$unnnic-radius-full` token from percentage-based to fixed pixel value. Changed from `100%` to `1000px` for more consistent circular shapes.

# 3.9.3 (2025-11-18)

### Added

- **ChatsContact Component**: Added the `lastInteractionTimePrefix` prop, which allows adding text preceding the time of the last interaction.

# 3.9.2 (2025-11-13)

### Added

- **DataTable Component - Infinite Scroll Support**:
  - **Infinite Scroll Functionality**: Native infinite scroll using VueUse's `useInfiniteScroll` composable
  - **New Props**:
    - `infiniteScroll` (Boolean, default: false) - Enables infinite scroll functionality
    - `infiniteScrollDistance` (Number, default: 100) - Distance in pixels from bottom to trigger the loadMore event
    - `infiniteScrollDisabled` (Boolean, default: false) - Disables infinite scroll (useful when all data has been loaded)
    - `isLoadingMore` (Boolean, default: false) - Indicates whether more data is being loaded for infinite scroll
  - **New Event**: `loadMore` - Emitted when user scrolls near the bottom of the table
  - **Visual Feedback**: Loading indicator at the bottom of the table during data loading
  - **Seamless Integration**: Works alongside existing pagination system (can be disabled with `hidePagination`)
  - **Fixed Headers Support**: Compatible with `fixedHeaders` prop for optimal scrolling experience

# 3.9.1 (2025-11-12)

### Added

- **SelectSmart Component - Infinite Scroll & External Search**:
  - **Infinite Scroll Support**: Native infinite scroll using VueUse's `useInfiniteScroll` composable
  - **External Search Support**: New `disableInternalFilter` prop for API-based search with debounce
  - **New Props**:
    - `infiniteScroll` (Boolean, default: false) - Enables infinite scroll functionality
    - `infiniteScrollDistance` (Number, default: 10) - Distance in pixels from bottom to trigger loading
    - `infiniteScrollCanLoadMore` (Function, default: () => true) - Callback to determine if more data is available
    - `disableInternalFilter` (Boolean, default: false) - Disables internal filtering for external search control
  - **New Event**: `scroll-end` - Emitted when user scrolls near the bottom of options list
  - **Public Methods**:
    - `finishInfiniteScroll()` - Must be called after loading data to reset loading state
    - `resetInfiniteScroll()` - Resets infinite scroll state completely
  - **Separate Loading States**: 
    - `isLoading` prop now only for initial load (shows centered loading, hides options)
    - Internal `infiniteScrollLoading` state for pagination (shows loading at bottom, keeps options visible)
  - **Visual Feedback**: Dedicated loading indicator at the end of options list during pagination
  - **Performance Optimized**: Automatic cleanup on unmount, prevents memory leaks

# 3.9.0 (2025-11-07)

### Added

- **Tabs Component**: 
  - Add and register Tabs, TabsList, TabsContent, and TabsTrigger components in the main index;
  - Add Tabs stories.

# 3.8.1 (2025-11-06)

### Fixed

- **Tailwind CSS**: Disabled Tailwind CSS container styles to prevent query styles from affecting existing containers

# 3.8.0 (2025-11-05)

### Added

- **Popover Component**: 
  - Add `@vueuse/core` dependency;
  - Add and register Popover, PopoverContent, and PopoverTrigger components in the main index;
  - Add Popover stories.

# 3.7.1 (2025-11-03)

### Fixed

- **Upload Modal**: Fix close event emitter

# 3.7.0 (2025-10-31)

### Added

- **Iconify Integration**: Added the Iconify package to support icons not available in Material Symbols.
- **Icon Component**: Implemented Iconify icon rendering logic in `Icon.vue`, expanding the component’s icon support.

# 3.6.0 (2025-10-31)

### Added

- **Icon Mappings**: Added more mappings for older icons to point to the icons in Material Symbols for better compatibility

### Changed

- **Icon Component**: Updated Icon sizes to use new design tokens

### Removed

- **Font Files**: Deleted 5 unused font files from icomoon pack
- **Icon Files**: Deleted approximately 265 unused icon files
- **Icon Utilities**: Deleted icons util with old icons
- **Icon Props**: Removed unnecessary lineHeight property

# 3.5.2 (2025-10-29)

### Fixed

- **Tailwind CSS**: Disabled Tailwind CSS preflight styles to prevent base styles from affecting existing components (fixes unexpected behavior in TableNext loading icon)

# 3.5.1 (2025-10-29)

### Fixed

- **Color Tokens**: Fixed `brand-weni-soft` color token referencing incorrect color after applying new color tokens (updated from `teal-100` to `teal-600` in scheme-colors)

# 3.5.0 (2025-10-28)

### Added
- **Template Preview**: Add template preview compontents

# 3.4.0 (2025-10-23)

### Added

- **shadcn-vue Integration**: Integrated shadcn-vue component library with Tailwind CSS v3
  - **Tailwind CSS v3**: Added Tailwind CSS v3 with CSS-first configuration approach
  - **shadcn-vue CLI**: Integrated shadcn-vue CLI for component scaffolding
  - **Component Library**: Added Reka UI as the headless component foundation
  - **Utility Libraries**: Added class-variance-authority, clsx, and tailwind-merge for component styling
  - **Design Token Integration**: Mapped unnnic design tokens to Tailwind via CSS variables

### Changed

- **Main Entry**: Updated `src/main.ts` to import Tailwind CSS styles
- **Color System**: Exposed all unnnic color tokens as HSL

### Technical Details

- **Dependencies Added**:
  - `tailwindcss@3.4.18` - CSS framework
  - `postcss` - CSS processor
  - `autoprefixer` - PostCSS plugin
  - `tailwindcss-animate` - Animation utilities
  - `class-variance-authority` - Variant management
  - `clsx` - Class concatenation utility
  - `tailwind-merge` - Smart class merging
  - `reka-ui` - Headless UI components
  - `ajv` - JSON schema validator

- **Files Created**:
  - `tailwind.config.js` - Tailwind configuration with unnnic token mapping
  - `postcss.config.cjs` - PostCSS configuration
  - `components.json` - shadcn-vue CLI configuration

# 3.3.3 (2025-10-22)

### Fixed

- **Style Dictionary**: Regenerated design tokens to properly export `bg-info` and `bg-success` scheme color updates to the token system

# 3.3.2 (2025-10-17)

### Changed
- **Scheme Colors**:
  - **Updated `bg-info` token**: Changed from blue-100 to blue-50
  - **Updated `bg-success` token**: Changed from green-100 to green-50
  - **Expanded color scheme**: Added missing color token definitions to ensure complete coverage of the design system

# 3.3.1 (2025-10-17)

### Added

- **DataTable**: Added optional `sort` prop for external sort state control:
  - **Controlled Mode**: Pass `sort` prop to control sort state externally
  - **Uncontrolled Mode**: Component manages sort state internally (default behavior)
  - **v-model Support**: Full support for `v-model:sort` pattern
  - **Backward Compatible**: Existing implementations continue working without changes

# 3.3.0 (2025-10-15)
- **Chart Funnel**: Added two items variation

# 3.2.9 (2025-10-14)

### Fixed

- **Chip Component**: Fixed layout shift issue when border state changes:
  - **Consistent Sizing**: Component now maintains consistent dimensions regardless of border visibility
  - **Smooth Transitions**: Eliminated visual "jumps" when toggling between selected/unselected states
- **ESLint Configuration**: Update ESLint configuration and project package.json to use CommonJS

# 3.2.8 (2025-09-25)

### Changed

- **ESLint Configuration Migration**: Migrated from legacy `.eslintrc.js` to modern flat config format (`eslint.config.js`)
  - **Modern Configuration**: Updated to use `@vue/eslint-config-typescript` with flat config structure
  - **Enhanced TypeScript Support**: Improved TypeScript linting rules and configurations
  - **Code Standardization**: Applied consistent code formatting across all components and files
  - **Dependency Updates**: Updated ESLint-related package dependencies for better compatibility
  - **Rule Optimization**: Enhanced linting rules for better code quality and consistency

### Fixed

- **Code Quality**: Standardized formatting across multiple components including AudioRecorder, Button, ChartMultiLine, ChatsHeader, ChatsMessage, DataTable, DatePicker, Drawer, EmojiPicker, FormElement, Input, InputDatePicker, Label, ModalNext, SelectSmart, Tag, and Tour components

# 3.2.7 (2025-09-23)

### Fixed

- **DataTable**:
  - Fixed without results colum grid
  - Fixed loading variation console warnings
  - Add `itemKey` in `update:sort` event

# 3.2.6 (2025-09-22)

### Added

- **SelectSmart Component**: New `onActiveChange` event that emits when dropdown options become active/inactive:
  - **Event Emission**: Emits `true` when dropdown opens and `false` when dropdown closes
  - **Full Integration**: Works seamlessly with all existing SelectSmart functionality (keyboard navigation, click outside, escape key)
  - **Comprehensive Testing**: Added 4 new unit tests covering all scenarios including toggle, escape key, and outside click behaviors

- **Dropdown Component**: Enhanced `forceOpen` functionality with comprehensive test coverage:
  - **Comprehensive Testing**: Added 5 new unit tests covering all `forceOpen` scenarios
  - **Trigger Prevention**: Tests verify that clicking trigger doesn't toggle dropdown when `forceOpen` is enabled
  - **Outside Click Prevention**: Tests confirm dropdown stays open when clicking outside with `forceOpen` enabled
  - **Prop Compatibility**: Tests validate proper behavior with `useOpenProp` combinations
  - **Event Validation**: Tests ensure no unwanted events are emitted when `forceOpen` is active
  
# 3.2.5 (2025-09-19)

### Added

- **Chip Component**: New simplified compact element component for selection and filtering:
  - **Core Features**: Support for text, count badges, and automatic icon handling
  - **Selection States**: Built-in `isSelected` state with automatic styling (teal background when selected)
  - **Type System**: Support for `single` and `multiple` types with context-appropriate icons
  - **Smart Icons**: Automatic add/close icons for multiple type based on selection state
  - **Smart Border Logic**: Automatic border application for unselected state only
  - **Click Interaction**: Built-in click event handling with optional `isClickable` styling (cursor pointer)
  - **TypeScript Support**: Full TypeScript integration with streamlined type definitions (`ChipProps`)
  - **Storybook Documentation**: Complete documentation with interactive examples
  - **Comprehensive Testing**: 15 focused unit tests covering all functionality and interaction patterns

- **Global Scheme Colors System**: Centralized color scheme management to eliminate code duplication:
  - **New File**: `src/assets/scss/scheme-colors.scss` with all color scheme definitions
  - **New Tokens**: Added `bg-base`, `bg-soft`, and complete `teal-*` color scale (teal-50 to teal-950) support
  - **Utility Functions**: Added `generate-scheme-classes()` mixin and `get-scheme-color()` function for easier component development
  - **Legacy Compatibility**: Automatic mapping of legacy color names to new color system

### Changed

- **Color System Refactoring**: Migrated Chip, Icon, and Card components to use global `$unnnic-scheme-colors` instead of local definitions
- **TypeScript Types Centralization**: Moved `SchemeColor` type to global `src/types/scheme-colors.d.ts` for better maintainability
- **Import Optimization**: Updated component imports to use centralized type definitions from `@/types/scheme-colors`

### Removed

- **Code Duplication**: Eliminated ~136 lines of duplicate `$scheme-colors` definitions across components

# 3.2.4 (2025-09-15)

### Added

- **ChatsContact**: Added `forceShowUnreadMessages` prop to always keep the number of unread messages visible.

# 3.2.3 (2025-09-12)

### Added

- **TypeScript Composition API Migration**: Migrated Icon, Button, and Disclaimer components from Options API to Composition API with full TypeScript support
- **Component Renaming**: Renamed `Icon` component to `UnnnicIcon` for Pascal Case consistency
- **Type Definitions**: Added comprehensive TypeScript interfaces and types:
  - `IconSize`, `LineHeight`, `SchemeColor`, `IconProps` for Icon component
  - `ButtonSize`, `ButtonType`, `ButtonProps` for Button component  
  - `DisclaimerProps` for Disclaimer component
- **Type Safety**: Full compile-time type validation for all component props
- **Modular Types**: Separate type definition files for each component (`types.ts`)

### Changed

- **BREAKING**: Icon component name changed from `Icon` to `UnnnicIcon`
- **BREAKING**: Components migrated to `<script setup lang="ts">` syntax
- **Test Updates**: Updated all component tests to work with new TypeScript structure
- **Prop Validation**: Replaced runtime validators with TypeScript compile-time validation

### Fixed

- CSS warning for `font-feature-settings` compatibility in Icon component
- Style property typing issues in Button component


# 3.2.2 (2025-09-12)

### Added
- **ChatsMessage**: Added automatic message variation

# 3.2.1 (2025-09-11)

### Fixed
- Adjusted the formatting of font tokens to conform to the css font attribute

# 3.2.0 (2025-09-11)

### Added
- Support for **Node.js v22**
- Introduced **Style Dictionary**:
  - Added the Style Dictionary package
  - Migrated all SCSS tokens to Style Dictionary exports

# 3.1.4 (2025-09-05)

- **EmojiPicker Refactoring**: Complete modernization of EmojiPicker component:
  - **Security Enhancement**: Local emoji sprite sheets to eliminate external CDN requests (CORS/CSP compliance)

### Fixed

- **Security**: Eliminated external requests to unpkg.com for emoji sprite sheets
- **CSP Compliance**: EmojiPicker now works with strict Content Security Policy headers
- **Performance**: Reduced bundle size and improved loading times

# 3.1.3 (2025-09-05)

### Added

- Dependency: Added `emoji-mart-vue-fast` as the new emoji provider

### Removed

- Dependencies: Removed `emoji-mart` and `@emoji-mart/data`

### Changed

- EmojiPicker: Refactored to use `emoji-mart-vue-fast` while preserving backward compatibility (public props, events, and slots remain unchanged)

## 3.1.2 (2025-09-03)

### Added

- **Semantic Color Tokens**: Added comprehensive semantic color token system with dedicated `$unnnic-color-` variables:
  - **Background Semantic Tokens**: `$unnnic-color-bg-base`, `$unnnic-color-bg-soft`, `$unnnic-color-bg-muted`, `$unnnic-color-bg-active`, `$unnnic-color-bg-info`, `$unnnic-color-bg-success`, `$unnnic-color-bg-warning`, `$unnnic-color-bg-critical`
  - **Text Semantic Tokens**: `$unnnic-color-fg-base`, `$unnnic-color-fg-muted`, `$unnnic-color-fg-emphasized`, `$unnnic-color-fg-inverted`, `$unnnic-color-fg-active`, `$unnnic-color-fg-info`, `$unnnic-color-fg-success`, `$unnnic-color-fg-warning`, `$unnnic-color-fg-critical`
  - **Border Semantic Tokens**: `$unnnic-color-border-base`, `$unnnic-color-border-soft`, `$unnnic-color-border-muted`, `$unnnic-color-border-emphasized`, `$unnnic-color-border-active`, `$unnnic-color-border-info`, `$unnnic-color-border-success`, `$unnnic-color-border-warning`, `$unnnic-color-border-critical`

### Changed

- **Color System Refactoring**: Updated `$scheme-colors` map to reference the new semantic tokens instead of direct color values for improved maintainability and consistency

## 3.1.1 (2025-08-29)

### Added

- **SelectSmart**: Added `multipleLimit` props to limit items selection
- **SelectSmart**: Added `disableRemove` option attribute to disable remove selected items

## 3.1.0 (2025-08-29)

### Added

- **DataTable**: Added new component

## 3.0.4 (2025-08-27)

### Added

- **Semantic Color Tokens**: Added new active state semantic color tokens:
  - `bg-active`: Background color for active states using teal-600
  - `fg-active`: Foreground/text color for active states using teal-600  
  - `border-active`: Border color for active states using teal-600

## 3.0.3 (2025-08-25)

### Added

- **Chats Header**: Add right content slot

## 3.0.2 (2025-08-25)

### Changed

- **Red Color Tokens**: Updated red color token values for improved design consistency

## 3.0.1 (2025-08-25)

### Added

- **Design Tokens**: New spacing, icon size, border radius, and shadow level tokens
- **Typography Tokens**: New typography tokens and line heights for better consistency
- **Color System**: Complete expansion of the color system with new tokens:
  - Added teal color tokens to the design system
  - Expanded tokens for yellow, orange, red, purple, blue, green, and gray
  - New semantic color tokens for improved design consistency
- **Weni Colors**: Restoration and redefinition of weni color tokens

### Changed

- **Color Migration**: Updated color tokens to use teal instead of weni where appropriate
- **Color Consolidation**: Consolidated color tokens for enhanced design consistency
- **Semantic Colors**: Improved semantic color tokens, including bg-muted color token adjustment

## 3.0.0 (2025-08-15)

### Added

- **TypeScript Support**: Full TypeScript integration with complete type definitions
- **Type Exports**: All component types are now exported for external use
- **IntelliSense**: Complete autocomplete support for props, events, and component configuration
- **Backward Compatibility**: 100% compatible with existing JavaScript projects
- **Build System**: Updated Vite configuration with TypeScript support and automatic type generation
- **Component Types**: Comprehensive type definitions for all components starting with Icon component
- **Type Safety**: Runtime type validation and development-time type checking

### Changed

- **BREAKING**: Migrated core files from JavaScript to TypeScript (`src/index.js` → `src/index.ts`, `src/components/index.js` → `src/components/index.ts`)
- **Build Process**: Enhanced build pipeline with TypeScript compilation and type generation
- **Package Exports**: Updated package.json exports to include TypeScript declaration files

## 2.36.0 (2025-07-24)

### Added

- SelectTime: add component.

## 2.35.0 (2025-07-24)

- DatePicker: updates icons, fixes buttons translations, selects the equivalent dates automatically on menu option, prevents the custom option to be selectable.

## 2.34.0 (2025-06-16)

- ChatMessage: Added message status

## 2.33.6 (2025-06-11)

- Alert: Update pointer-events in Alert component for better interaction handling

## 2.33.5 (2025-06-04)

- ChatsContact: Add new pin variant

## 2.33.4 (2025-05-27)

### Fixed

- DatePicker: Fixed current month selection

## 2.33.3 (2025-05-26)

### Added

- ChatMessage: Added click replied message emitter

## 2.33.2 (2025-05-22)

### Fix

- AudioRecorder: Added corrections for NaN values

## 2.33.1 (2025-05-20)

### Fix

- TableNext: Added default case prevention without ordering

### Added

- DatePicker: Added previous month shortcut
- DatePicker: Added emitter to send the selected date

## 2.33.0 (2025-05-12)

### Added

- Added SelectSmart `enableSearchByValue` prop. This allows you to search for items by the value field

## 2.32.0 (2025-04-30)

### Added

- Added support for viewing replied messages in the ChatsMessage component
- Added reply event to ChatsMessage component

## 2.31.0 (2025-04-29)

### Added

- Add project info to ChatsContact component

## 2.30.1 (2025-04-28)

### Added

- Add useOpenProp to dropdown component (Use this if you want to control your state by the prop instead of the internal variable)

### Fixed

- Fix dropdown not open when click project status chip in ProjectCard

## 2.30.0 (2025-04-24)

### Added

- Add contact last message media support

## 2.29.0 (2025-04-23)

### Added

- New CardProject component

## 2.28.0 (2025-04-04)

### Added

- Added XSS security to form components

## 2.27.0 (2025-04-03)

### Added

- Add SelectSmart update:searchValue event
- Add SelectSmart loading variation

## 2.26.0 (2025-03-27)

### Added

- Add DatePicker disableClear prop to ocult clear button

### Fixed

- InputDatePicker mouseover cursor pointer

## 2.25.0 (2025-03-12)

### Added

- Add InputDatePicker next, fillW, minDate and maxDate props

- Add InputDatePicker new visual (to this, use next prop)

### Fixed

- InputDatePicker select dates logic improvements

## 2.24.0 (2025-02-27)

### Added

- Add new initial 'next' type to UnnnicTag component

## 2.23.0 (2025-02-27)

### Added

- Add SelectSmart secondary variation

## 2.22.0 (2025-02-17)

### Added

- Add verify to fix style-errors in Modal
- Upgrade and migrate imports sass to fix warnings
- Fix witdh calculator in CardStatusesContainer
- Add ? to SelectSmart scrollIntoView

## 2.21.2 (2025-02-17)

### Added

- Added ChatMessage geolocation visual variation

## 2.21.1 (2025-02-11)

### Added

- Added HTML support to Disclaimer component

## 2.21.0 (2025-01-30)

### Added

- Drawer giant size and customized title
- Added IconsFilled prop at Button component

## 2.20.0 (2025-01-02)

### Added

- ChatsMessage: Added last interaction time

## 2.19.0 (2024-12-10)

### Added

- TableNext: Added sort rows by columns

## 2.18.1 (2024-11-27)

### Added

- ToolTip: Added Support to HTML

## 2.18.0 (2024-11-27)

### Added

- Exports: package.json

## 2.17.0 (2024-11-25)

### Added

- TableNext: Added row click event

## 2.16.0 (2024-11-08)

### Added

- ChartFunnel: Adjust Chart Funnel variation to not use svg and have better performance

## 2.15.1 (2024-10-31)

### Added

- ChartFunnel: Added new variant's 'default' | 'basic'

## 2.15.0 (2024-10-31)

### Added

- Tag: `leftIcon` and `rightIcon` props;
- TableNext: `hideHeaders` and `size` props;
- TableNext: Added the possibility of column sizes being `'auto'`;
- TableNext: Removed the requirement to pass the headers prop.

## 2.14.2 (2024-10-22)

### Fixed

- Resolved SelectSmart empty option
- Resolved translate icons issue

## 2.14.1 (2024-10-17)

### Fixed

- Resolved DatePicker addMonth issue

## 2.14.0 (2024-10-17)

### Added

- Navigator Component

### Fixed

- Resolved DatePicker issue showing NaN in safari browser

## 2.13.1 (2024-10-15)

### Fixed

- Resolved an issue where the AudioRecorder player displayed incorrect audio duration. ([Related to this Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=642012))

## 2.13.0 (2024-09-30)

### Added

- Migrated InputNext component to Vue 3

## 2.12.0 (2024-09-25)

### Added

- Added SimpleCard component

## 2.11.0 (2024-08-30)

### Added

- Docs of ChartBar, ChartFunnel, ChartLine, ChartMultiLine, ChartRainbow, ChatsContact, ChatsContact, ChatsDashboardTagLive, ChatsHeader, ChatsMessage, ChatsNavbar, ChatsUserAvatar, ChatText, CircleProgressBar, Collapse, Comment and DataArea.

### Fixed

- Change `autoNavigateSingleChild ` to `autoNavigateFirstChild` in `SideBar` component and logic improvements

## 2.11.0 (2024-08-26)

### Added

- Update `SideBar` visual

## 2.10.0 (2024-08-22)

### Added

- Added Button, Icon, Switch and Tooltip tests;
- Change `wide` to `size` prop in `Drawer.vue` to support extra-large size;
- Added html tags support in `Tour` step description.

## 2.9.0 (2024-08-21)

### Added

- Docs of Checkbox, Radio, Accordion, Alert, AudioRecorder, AvatarIcon, Banner, Breadcrumb, ButtonIcon, Card, CardData, CardImage, CardInformation, CardNumber, CardProject, Carousel and ChartBar;
- EmojiPicker position bottom variation;
- Drawer distinct close and back actions variation.

## 2.8.2 (2024-08-21)

### Added

- Add new iconFilled property to sideBarItem component

## 2.8.1 (2024-08-20)

### Added

- `Tour.vue` component added beforeRender prop, emitting events and dealing with hiding the understood button if desired by step.

## 2.8.0 (2024-08-16)

### Added

- `DropArea.vue` component from `UploadArea` component.

### Changed

- Update `ImportCard.vue` design.

## 2.7.0 (2024-08-14)

### Added

- Added Tour component;
- Added Tour story.

## 2.6.2 (2024-08-13)

### Added

- Added returnName prop in EmojiPicker component to return the id/name instead of its native

## 2.6.1 (2024-08-02)

### Fixed

- Fixed CI workflow to create pre-release versions

## 2.6.0 (2024-08-02)

### Added

- Added Vitest
- Added Checkbox and Label components tests

## 2.5.0 (2024-07-29)

### Added

- Added Drawer without overlay variation and its story.

### Fixed

- Fixed close icon of Drawer to be dynamic.

## 2.4.0 (2024-07-23)

### Added

- `leftSidebar` slot in the `ModalDialog` component;
- Boolean `hideSecondaryButton` prop in the `ModalDialog` component.

## 2.3.0 (2024-07-19)

### Added

- Added auto docs template to stories;
- Usage autodocs at Button story.

### Changed

- Fixed button props defaults;
- Improve Button story it.

## 2.2.0 (2024-07-19)

### Added

- Customizing the size of each column in `TableNext` via props.

## 2.1.1 (2024-07-18)

### Added

- Added `ModalDialog` all button props support and remove 'buttonType' and 'buttonText' props. Now, all button props should come in a single object.

## 2.1.0 (2024-07-08)

### Added

- Added `ModalDialog` component.

## 2.0.31 (2024-07-03)

### Fixed

- Export `UnnnicAlert` component.

## 2.0.30 (2024-06-28)

### Fixed

- When started with an item selected, that item was duplicated in the selection of the smart select when multiple selection was enabled.

## 2.0.29 (2024-06-25)

### Fixed

- Correction in the visual of the remove file button in the file upload modal.

## 2.0.28 (2024-06-21)

### Fixed

- Correction in the listener check on $attrs. This was preventing the correct operation of the listeners.

## 2.0.27 (2024-06-20)

### Fixed

- Adding ModalNext export component, before this it is not possible to use the component.

## 2.0.26 (2024-06-20)

### Added

- Migrated ModalNext to Vue 3.

## 2.0.25 (2024-06-20)

### Fixed

- The slider component had a bug in the tooltip positioning when initialized with an initialValue. This was fixed in this version by normalizing the tooltip positioning.

## 2.0.24 (2024-06-18)

### Fixed

- The interval of TableNext component automatically calculated the pagination interval, generating a bug when the request was on the last page and it did not return the rows.length of other requests. This was fixed by adding a prop to receive the range in a fixed way.

## 2.0.23 (2024-06-14)

### Fixed

- Bug fix in the ChatsContact component that triggered the click event twice.

## 2.0.22 (2024-06-12)

### Added

- Tag creation in the workflow when a new official version is released on npmjs.

## 2.0.21 (2024-06-12)

### Added

- Project changelog file.
- Created `Publish Pre Release Package to npmjs` workflow to publish alpha versions when a new version goes up to the staging environment from tags with the pattern `x.x.x-staging`.

### Fixed

- Updated the eslint version to fix dependency conflicts and ran lint again.

### Changed

- Node version of Dockerfile to `20.14.0`.
