# 🔢 number-is-in-range

[![npm version](https://badge.fury.io/js/number-is-in-range.svg)](https://badge.fury.io/js/number-is-in-range)
[![npm downloads](https://img.shields.io/npm/dm/number-is-in-range.svg)](https://www.npmjs.com/package/number-is-in-range)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

> **The Ultimate JavaScript Range Validation Library** - Extend Number and BigInt prototypes with powerful range checking, validation, and manipulation utilities. Perfect for form validation, game development, scientific computing, and data analysis.

## 🚀 Features

- ✅ **Intuitive Method Syntax**: `(10).isInRange(0, 19)` returns `true`
- ✅ **Bidirectional Ranges**: Works with both increasing and decreasing ranges
- ✅ **Multi-Type Support**: Handles integers, floating-point numbers, and BigInt values
- ✅ **TypeScript Ready**: Includes comprehensive TypeScript declarations
- ✅ **Zero Dependencies**: Lightweight with no external dependencies
- ✅ **Advanced Options**: Inclusive/exclusive ranges with strict validation
- ✅ **Performance Optimized**: Efficient implementation with intelligent caching
- ✅ **Comprehensive API**: 15+ utility functions for all range operations
- ✅ **Cross-Platform**: Works in Node.js, browsers, and modern JavaScript environments

## 📦 Installation

```bash
npm install number-is-in-range
```

```bash
yarn add number-is-in-range
```

```bash
pnpm add number-is-in-range
```

## 🎯 Quick Start

### Basic Range Validation

```javascript
require('number-is-in-range');

// Simple range checking
console.log((10).isInRange(0, 19));   // true
console.log((25).isInRange(0, 19));   // false
console.log((10).isInRange(19, 0));   // true (bidirectional)
console.log((10.5).isInRange(10, 11)); // true (floating-point)

// BigInt support
console.log((10n).isInRange(0n, 19n)); // true
console.log((25n).isInRange(0n, 19n)); // false
```

### Advanced Range Options

```javascript
require('number-is-in-range');

// Exclusive ranges (excludes boundaries)
console.log((10).isInRange(0, 19, { exclusive: true })); // true
console.log((0).isInRange(0, 10, { exclusive: true }));  // false
console.log((10).isInRange(0, 10, { exclusive: true })); // false

// Strict mode (throws errors for invalid inputs)
try {
  (10).isInRange(null, 19, { strict: true });
} catch (error) {
  console.log(error.message); // "Range boundaries cannot be null or undefined"
}

// Combined options with caching
console.log((5).isInRange(0, 10, { exclusive: true, strict: true, cache: true })); // true
```

### ES Modules Support

```javascript
import 'number-is-in-range';

console.log((42).isInRange(40, 50)); // true
```

## 🔧 Advanced Usage

### Utility Functions

```javascript
const { 
  isInRange, 
  createRangeValidator, 
  isInAnyRange, 
  isInAllRanges, 
  distanceToRange,
  clampToRange,
  rangesOverlap,
  rangeIntersection,
  rangeUnion,
  rangeSize,
  rangeCenter,
  rangeContains,
  rangeFromValues,
  isAtBoundary,
  clearCache,
  getCacheStats
} = require('number-is-in-range');

// Direct function usage
console.log(isInRange(10, 0, 19));   // true
console.log(isInRange(10.5, 10, 11)); // true

// Create reusable validators
const ageValidator = createRangeValidator(0, 120);
const temperatureValidator = createRangeValidator(-273.15, 100, { exclusive: true });

console.log(ageValidator(25));        // true
console.log(ageValidator(150));       // false
console.log(temperatureValidator(20)); // true

// Multiple range checking
const ranges = [
  { start: 0, end: 10 },
  { start: 20, end: 30 },
  { start: 40, end: 50 }
];

console.log(isInAnyRange(5, ranges));   // true (in first range)
console.log(isInAnyRange(15, ranges));  // false (not in any range)
console.log(isInAnyRange(25, ranges));  // true (in second range)

// Check if value is in ALL ranges
const overlappingRanges = [
  { start: 0, end: 10 },
  { start: 5, end: 15 }
];

console.log(isInAllRanges(5, overlappingRanges)); // true (in both ranges)
console.log(isInAllRanges(15, overlappingRanges)); // false (only in second range)

// Distance calculation
console.log(distanceToRange(5, 0, 10));  // 0 (inside range)
console.log(distanceToRange(15, 0, 10)); // 5 (5 units above range)
console.log(distanceToRange(-5, 0, 10)); // 5 (5 units below range)

// Clamping values to range
console.log(clampToRange(5, 0, 10));  // 5 (inside range)
console.log(clampToRange(15, 0, 10)); // 10 (clamped to upper bound)
console.log(clampToRange(-5, 0, 10)); // 0 (clamped to lower bound)

// Range operations
const range1 = { start: 0, end: 10 };
const range2 = { start: 5, end: 15 };
const range3 = { start: 20, end: 30 };

console.log(rangesOverlap(range1, range2)); // true
console.log(rangesOverlap(range1, range3)); // false
console.log(rangesOverlap(range1, range2, { exclusive: true })); // true

// Range intersection and union
console.log(rangeIntersection(range1, range2)); // { start: 5, end: 10 }
console.log(rangeIntersection(range1, range3)); // null
console.log(rangeUnion(range1, range2)); // { start: 0, end: 15 }
console.log(rangeUnion(range1, range3)); // { start: 0, end: 30 }

// Range size and center
console.log(rangeSize(0, 10)); // 10
console.log(rangeSize(10, 0)); // 10 (reversed)
console.log(rangeCenter(0, 10)); // 5
console.log(rangeCenter(10, 0)); // 5 (reversed)

// Range containment
const outerRange = { start: 0, end: 20 };
const innerRange = { start: 5, end: 15 };

console.log(rangeContains(outerRange, innerRange)); // true
console.log(rangeContains(outerRange, outerRange, { exclusive: true })); // false

// Create range from values
const values = [1, 5, 10, 3, 8, -2, 15];
const rangeFromValues = rangeFromValues(values);
console.log(rangeFromValues); // { start: -2, end: 15 }

// Boundary checking
console.log(isAtBoundary(0, 0, 10)); // true (start boundary)
console.log(isAtBoundary(10, 0, 10)); // true (end boundary)
console.log(isAtBoundary(5, 0, 10)); // false (inside range)

// Cache management
console.log(getCacheStats().size); // 0
clearCache();
```

## 🎮 Real-World Examples

### Form Validation

```javascript
require('number-is-in-range');

// Age validation
function validateAge(age) {
  if (!(age).isInRange(0, 120, { strict: true })) {
    throw new Error('Age must be between 0 and 120');
  }
  return true;
}

// Temperature validation
function validateTemperature(temp) {
  if (!(temp).isInRange(-273.15, 1000, { exclusive: true })) {
    throw new Error('Temperature must be above absolute zero and below 1000°C');
  }
  return true;
}

// Percentage validation
function validatePercentage(value) {
  if (!(value).isInRange(0, 100, { strict: true })) {
    throw new Error('Percentage must be between 0 and 100');
  }
  return true;
}

// Test the validators
try {
  validateAge(25);        // ✅ Valid
  validateAge(150);       // ❌ Error
  validateTemperature(20); // ✅ Valid
  validatePercentage(75); // ✅ Valid
} catch (error) {
  console.error(error.message);
}
```

### Game Development

```javascript
require('number-is-in-range');

// Player health system
class Player {
  constructor(maxHealth = 100) {
    this.maxHealth = maxHealth;
    this.health = maxHealth;
  }

  takeDamage(damage) {
    const newHealth = this.health - damage;
    this.health = clampToRange(newHealth, 0, this.maxHealth);
    return this.health;
  }

  heal(amount) {
    const newHealth = this.health + amount;
    this.health = clampToRange(newHealth, 0, this.maxHealth);
    return this.health;
  }

  isAlive() {
    return (this.health).isInRange(1, this.maxHealth, { exclusive: false });
  }

  getHealthPercentage() {
    return (this.health / this.maxHealth) * 100;
  }
}

// Game boundaries
class GameWorld {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  isValidPosition(x, y) {
    return (x).isInRange(0, this.width, { exclusive: true }) &&
           (y).isInRange(0, this.height, { exclusive: true });
  }

  clampPosition(x, y) {
    return {
      x: clampToRange(x, 0, this.width, { exclusive: true }),
      y: clampToRange(y, 0, this.height, { exclusive: true })
    };
  }
}

// Usage
const player = new Player(100);
const world = new GameWorld(800, 600);

console.log(player.takeDamage(30)); // 70
console.log(player.isAlive()); // true
console.log(world.isValidPosition(400, 300)); // true
console.log(world.isValidPosition(900, 700)); // false
```

### Scientific Computing

```javascript
require('number-is-in-range');

// Statistical analysis
class DataAnalyzer {
  constructor(data) {
    this.data = data;
    this.range = rangeFromValues(data);
  }

  isOutlier(value, threshold = 2) {
    const mean = this.data.reduce((a, b) => a + b, 0) / this.data.length;
    const stdDev = Math.sqrt(
      this.data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / this.data.length
    );
    
    const lowerBound = mean - threshold * stdDev;
    const upperBound = mean + threshold * stdDev;
    
    return !(value).isInRange(lowerBound, upperBound, { exclusive: true });
  }

  getConfidenceInterval(confidence = 0.95) {
    const zScore = 1.96; // 95% confidence
    const mean = this.data.reduce((a, b) => a + b, 0) / this.data.length;
    const stdError = Math.sqrt(
      this.data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / 
      (this.data.length * (this.data.length - 1))
    );
    
    return {
      lower: mean - zScore * stdError,
      upper: mean + zScore * stdError
    };
  }

  isInConfidenceInterval(value, confidence = 0.95) {
    const interval = this.getConfidenceInterval(confidence);
    return (value).isInRange(interval.lower, interval.upper, { exclusive: false });
  }
}

// Usage
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100]; // 100 is an outlier
const analyzer = new DataAnalyzer(data);

console.log(analyzer.isOutlier(100)); // true
console.log(analyzer.isOutlier(5)); // false
console.log(analyzer.isInConfidenceInterval(5)); // true
console.log(analyzer.isInConfidenceInterval(100)); // false
```

## 📚 API Reference

### Core Methods

#### `Number.prototype.isInRange(start, end, options?)`
#### `BigInt.prototype.isInRange(start, end, options?)`

Checks if a number is within the specified range.

**Parameters:**
- `start` (number | bigint): The start of the range
- `end` (number | bigint): The end of the range
- `options` (Object, optional): Configuration options
  - `exclusive` (boolean): If true, excludes boundaries (default: false)
  - `strict` (boolean): If true, throws errors for invalid inputs (default: false)
  - `cache` (boolean): If true, caches range calculations (default: false)

**Returns:** boolean - `true` if the number is within the range, `false` otherwise

**Examples:**
```javascript
(10).isInRange(0, 19);                    // true
(10).isInRange(0, 19, { exclusive: true }); // true
(0).isInRange(0, 10, { exclusive: true });  // false
```

### Utility Functions

#### `isInRange(value, start, end, options?)`
Direct function version of the prototype method.

#### `createRangeValidator(start, end, options?)`
Creates a reusable validator function for a specific range.

#### `isInAnyRange(value, ranges, options?)`
Checks if a value is within any of the provided ranges.

#### `isInAllRanges(value, ranges, options?)`
Checks if a value is within all of the provided ranges.

#### `distanceToRange(value, start, end)`
Calculates the distance from a value to the nearest range boundary.

#### `clampToRange(value, start, end, options?)`
Clamps a value to the specified range boundaries.

#### `rangesOverlap(range1, range2, options?)`
Checks if two ranges overlap.

#### `rangeIntersection(range1, range2)`
Finds the intersection of two ranges.

#### `rangeUnion(range1, range2)`
Finds the union of two ranges.

#### `rangeSize(start, end)`
Calculates the size of a range.

#### `rangeCenter(start, end)`
Finds the center point of a range.

#### `rangeContains(outerRange, innerRange, options?)`
Checks if one range contains another.

#### `rangeFromValues(values)`
Creates a range from an array of values.

#### `isAtBoundary(value, start, end)`
Checks if a value is at a range boundary.

#### `clearCache()`
Clears the internal cache.

#### `getCacheStats()`
Returns cache statistics.

## 🏗️ Browser Support

This package works in all modern browsers and Node.js environments:

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Node.js 10.4.0+

## 📊 Performance

The library is optimized for performance with:

- **Intelligent Caching**: Optional caching for repeated range calculations
- **Efficient Algorithms**: Optimized range checking algorithms
- **Minimal Overhead**: Lightweight implementation with zero dependencies
- **Memory Efficient**: Smart memory management for large datasets

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/Priyanshujindal/number-is-in-range.git
cd number-is-in-range
npm install
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for better range validation in JavaScript
- Built with modern JavaScript best practices
- Tested across multiple environments and use cases

## 🔗 Related Packages

- [lodash.range](https://www.npmjs.com/package/lodash.range) - Range generation
- [validator.js](https://www.npmjs.com/package/validator) - String validation
- [joi](https://www.npmjs.com/package/joi) - Schema validation

## 📈 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

---

**Made with ❤️ for the JavaScript community**

[![npm](https://img.shields.io/npm/v/number-is-in-range.svg)](https://www.npmjs.com/package/number-is-in-range)
[![GitHub stars](https://img.shields.io/github/stars/Priyanshujindal/number-is-in-range.svg)](https://github.com/Priyanshujindal/number-is-in-range/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Priyanshujindal/number-is-in-range.svg)](https://github.com/Priyanshujindal/number-is-in-range/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/Priyanshujindal/number-is-in-range.svg)](https://github.com/Priyanshujindal/number-is-in-range/pulls) 