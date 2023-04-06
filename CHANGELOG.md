# Jexl Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## [devel]

### Changed

- Applying filters to undefined values now results in undefined instead of a
  TypeError.

## [v1.1.1]

### Fixed

- Escaped \ in strings now un-escapes all the \ in the string instead of only
  the first \ in the string.

## [v1.1.0]

### Added

- Applies explicit calling context for functions and transforms.

Full Change Log

## [v1.0.0]

### Added

- Forked from TomFrost/Jexl
- Quoted identifiers can now be used as object properties.

[devel]: https://github.com/firehammersolutions/jexl/compare/v1.1.1...HEAD
[v1.1.1]: https://github.com/firehammersolutions/jexl/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/firehammersolutions/jexl/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/TomFrost/Jexl
