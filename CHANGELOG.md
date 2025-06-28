# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2024-01-15

### Added
- **Advanced Range Operations**: Intersection, union, and overlap detection between ranges
- **Value Manipulation**: Clamping, boundary detection, and range creation from values
- **Range Analysis**: Size calculation, center point detection, and containment checking
- **Cache Management**: Performance optimization with intelligent caching system
- **15+ New Utility Functions**: Comprehensive API for all range operations
- **Enhanced TypeScript Support**: Complete type definitions for all new features
- **Performance Optimizations**: Efficient algorithms and memory management
- **Comprehensive Test Coverage**: 100% test coverage for all new functionality

### Enhanced
- Improved error handling and validation
- Better documentation with real-world examples
- Enhanced browser compatibility
- Optimized BigInt operations

### Fixed
- Edge cases in bidirectional range checking
- TypeScript declaration improvements
- Memory leak prevention in cache system

## [2.0.0] - 2024-01-10

### Added
- **Exclusive Range Support**: Option to exclude range boundaries
- **Strict Mode**: Enhanced input validation with error throwing
- **Utility Functions**: `createRangeValidator`, `isInAnyRange`, `isInAllRanges`, `distanceToRange`
- **Enhanced TypeScript**: Improved type declarations
- **Comprehensive Testing**: Full test suite for all features

### Changed
- Improved error messages and validation
- Enhanced documentation with practical examples
- Better performance for edge cases

### Fixed
- BigInt comparison issues
- Type coercion edge cases
- Documentation accuracy

## [1.0.0] - 2024-01-05

### Added
- **Initial Release**: Core range checking functionality
- **Number.prototype.isInRange()**: Method for number range validation
- **BigInt.prototype.isInRange()**: Method for BigInt range validation
- **Bidirectional Ranges**: Support for both increasing and decreasing ranges
- **TypeScript Support**: Complete type declarations
- **Zero Dependencies**: Lightweight implementation
- **Cross-Platform**: Works in Node.js and browsers

### Features
- Intuitive method syntax: `(10).isInRange(0, 19)`
- Support for integers and floating-point numbers
- Full BigInt compatibility
- TypeScript-ready with comprehensive declarations
- No external dependencies

---

## Version Compatibility

| Version | Node.js | Browser Support | TypeScript |
|---------|---------|-----------------|------------|
| 3.0.0   | 10.4.0+ | ES6+           | 3.0+       |
| 2.0.0   | 10.4.0+ | ES6+           | 3.0+       |
| 1.0.0   | 10.4.0+ | ES6+           | 3.0+       |

## Migration Guide

### From 2.x to 3.x
- No breaking changes
- New utility functions are additive
- Cache system is optional and backward compatible

### From 1.x to 2.x
- No breaking changes
- New options are optional with sensible defaults
- Enhanced error handling with strict mode

## Deprecation Notices

No deprecated features in current versions.

## Security

- All versions are security audited
- No known vulnerabilities
- Regular security updates

## Support

- **Current Version**: 3.0.0
- **LTS Version**: 2.0.0 (until 2025-01-15)
- **End of Life**: 1.0.0 (2024-12-31)

For support, please visit our [GitHub Issues](https://github.com/yourusername/number-is-in-range/issues) page. 