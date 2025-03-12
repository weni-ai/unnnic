# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.25.0 (2025-03-12)

### Added

- Add InputDatePìcker next, fillW, minDate and maxDate props

- Add InputDatePìcker new visual (to this, use next prop)

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


