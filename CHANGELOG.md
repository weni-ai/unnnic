# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.6.2 (2024-08-13)

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


