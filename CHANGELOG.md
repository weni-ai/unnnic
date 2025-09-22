# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# 3.2.5 (2025-09-19)

### Added

- **Chip Component**: New simplified compact element component for selection and filtering:
  - **Core Features**: Support for text, count badges, and automatic icon handling
  - **Selection States**: Built-in `isSelected` state with automatic styling (teal background when selected)
  - **Type System**: Support for `single` and `multiple` types with context-appropriate icons
  - **Smart Icons**: Automatic add/close icons for multiple type based on selection state
  - **Smart Border Logic**: Automatic border application for unselected state only
  - **TypeScript Support**: Full TypeScript integration with streamlined type definitions (`ChipProps`)
  - **Storybook Documentation**: Complete documentation with interactive examples
  - **Comprehensive Testing**: 11 focused unit tests covering all functionality and state combinations

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
