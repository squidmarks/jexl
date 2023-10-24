# Jexl Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## [devel]

Nothing Yet

## [v1.3.0]

### Changed

- Added `toString` method on `Expression` to turn compiled expression AST back
  into a parsable JEXL string.

## [v1.2.0]

### Fixed

- Parsing of strings now properly handles escaped \ characters at the end of a
  string instead of assuming every " or ' with a \ immediately before it is
  escaped.

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

[devel]: https://github.com/firehammersolutions/jexl/compare/v1.2.0...HEAD
[v1.2.0]: https://github.com/firehammersolutions/jexl/compare/v1.1.0...v1.2.0
[v1.1.1]: https://github.com/firehammersolutions/jexl/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/firehammersolutions/jexl/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/TomFrost/Jexl
