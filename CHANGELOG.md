# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.26.0 (2024-08-28)

### Added

- Update `SideBar` visual

## 1.25.0 (2024-08-16)

### Added

- `DropArea.vue` component from `UploadArea` component.

### Changed

- Update `ImportCard.vue` design.

## 1.24.22 (2024-06-20)

### Fixed

- The slider component had a bug in the tooltip positioning when initialized with an initialValue. This was fixed in this version by normalizing the tooltip positioning.

## 1.24.21 (2024-06-18)

### Fixed

- The interval of TableNext component automatically calculated the pagination interval, generating a bug when the request was on the last page and it did not return the rows.length of other requests. This was fixed by adding a prop to receive the range in a fixed way.

## 1.24.20 (2024-06-18)

### Added

- Project changelog file.
- Created `Publish Pre Release Package to npmjs` workflow to publish alpha versions when a new version goes up to the develop environment from tags with the pattern `x.x.x-develop`.
