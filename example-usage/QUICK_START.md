# Quick Start Guide - number-is-in-range

## 🚀 Get Started in 30 Seconds

### 1. Install the Package
```bash
npm install number-is-in-range
```

### 2. Basic Usage
```javascript
// Import the package
require('number-is-in-range');

// Basic range checking
console.log(10.isInRange(0, 20));  // true
console.log(25.isInRange(0, 20));  // false

// Bidirectional ranges
console.log(15.isInRange(20, 10)); // true

// BigInt support
console.log(10n.isInRange(0n, 20n)); // true
```

### 3. Advanced Features
```javascript
const { createRangeValidator, clampToRange } = require('number-is-in-range');

// Create custom validators
const ageValidator = createRangeValidator(0, 120);
console.log(ageValidator(25)); // true

// Clamp values to range
console.log(clampToRange(150, 0, 100)); // 100
```

## 📚 Examples Included

This directory contains comprehensive examples:

- **`basic-example.js`** - Fundamental features
- **`advanced-example.js`** - Exclusive ranges, operations
- **`validation-example.js`** - Form validation scenarios
- **`game-example.js`** - Game development use cases
- **`form-validation-example.js`** - Real-world form validation

## 🎯 Run Examples

```bash
# Install dependencies
npm install

# Run all examples
npm run all

# Run individual examples
npm run basic      # Basic features
npm run advanced   # Advanced features
npm run validation # Form validation
npm run game       # Game development
npm run form       # Real-world forms
```

## 🔧 Key Features

- ✅ **Bidirectional Ranges** - Works regardless of start/end order
- ✅ **BigInt Support** - Handle large numbers
- ✅ **Exclusive Ranges** - Exclude boundaries
- ✅ **Range Operations** - Intersection, union, overlap detection
- ✅ **Performance Optimized** - Caching for repeated operations
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Zero Dependencies** - Lightweight and fast

## 📖 Documentation

- [Full API Reference](https://github.com/Priyanshujindal/number-is-in-range#readme)
- [NPM Package](https://www.npmjs.com/package/number-is-in-range)
- [GitHub Repository](https://github.com/Priyanshujindal/number-is-in-range)

## 🎉 Ready to Use!

Your `number-is-in-range` package is now ready for production use! 🚀 