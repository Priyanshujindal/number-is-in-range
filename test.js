// Test file for number-is-in-range package
require('./index.js');

console.log('🧪 Testing number-is-in-range package...\n');

// Test cases
const tests = [
  // Basic number tests
  { test: () => (10).isInRange(0, 19), expected: true, description: '10.isInRange(0, 19)' },
  { test: () => (25).isInRange(0, 19), expected: false, description: '25.isInRange(0, 19)' },
  { test: () => (10).isInRange(19, 0), expected: true, description: '10.isInRange(19, 0) - bidirectional' },
  { test: () => (10.5).isInRange(10, 11), expected: true, description: '10.5.isInRange(10, 11) - floating point' },
  { test: () => (0).isInRange(0, 10), expected: true, description: '0.isInRange(0, 10) - at start boundary' },
  { test: () => (10).isInRange(0, 10), expected: true, description: '10.isInRange(0, 10) - at end boundary' },
  { test: () => (-5).isInRange(-10, 0), expected: true, description: '-5.isInRange(-10, 0) - negative numbers' },
  { test: () => (5).isInRange(5, 5), expected: true, description: '5.isInRange(5, 5) - same start and end' },
  
  // Exclusive range tests
  { test: () => (10).isInRange(0, 19, { exclusive: true }), expected: true, description: '10.isInRange(0, 19, { exclusive: true })' },
  { test: () => (0).isInRange(0, 10, { exclusive: true }), expected: false, description: '0.isInRange(0, 10, { exclusive: true }) - boundary excluded' },
  { test: () => (10).isInRange(0, 10, { exclusive: true }), expected: false, description: '10.isInRange(0, 10, { exclusive: true }) - boundary excluded' },
  { test: () => (5).isInRange(5, 5, { exclusive: true }), expected: false, description: '5.isInRange(5, 5, { exclusive: true }) - same boundaries excluded' },
  
  // BigInt tests (if supported)
  ...(typeof BigInt !== 'undefined' ? [
    { test: () => (10n).isInRange(0n, 19n), expected: true, description: '10n.isInRange(0n, 19n) - BigInt' },
    { test: () => (25n).isInRange(0n, 19n), expected: false, description: '25n.isInRange(0n, 19n) - BigInt' },
    { test: () => (10n).isInRange(19n, 0n), expected: true, description: '10n.isInRange(19n, 0n) - BigInt bidirectional' },
    { test: () => (BigInt(Number.MAX_SAFE_INTEGER) + 1n).isInRange(0n, BigInt(Number.MAX_SAFE_INTEGER) + 100n), expected: true, description: 'Large BigInt in range' },
    { test: () => (10n).isInRange(0n, 19n, { exclusive: true }), expected: true, description: '10n.isInRange(0n, 19n, { exclusive: true }) - BigInt exclusive' },
  ] : []),
  
  // Mixed number/BigInt tests
  ...(typeof BigInt !== 'undefined' ? [
    { test: () => (10).isInRange(0n, 19n), expected: true, description: 'Number with BigInt range' },
    { test: () => (10n).isInRange(0, 19), expected: true, description: 'BigInt with number range' },
  ] : []),
];

// Run tests
let passed = 0;
let failed = 0;

tests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Test ${index + 1}: ${testCase.description} = ${result}`);
      passed++;
    } else {
      console.log(`❌ Test ${index + 1}: ${testCase.description} = ${result} (expected ${testCase.expected})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test the utility functions
console.log('\n🔧 Testing utility functions...');
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
} = require('./index.js');

const utilityTests = [
  { test: () => isInRange(10, 0, 19), expected: true, description: 'isInRange(10, 0, 19)' },
  { test: () => isInRange(25, 0, 19), expected: false, description: 'isInRange(25, 0, 19)' },
  { test: () => isInRange(10.5, 10, 11), expected: true, description: 'isInRange(10.5, 10, 11)' },
  { test: () => isInRange(10, 0, 19, { exclusive: true }), expected: true, description: 'isInRange(10, 0, 19, { exclusive: true })' },
  { test: () => isInRange(0, 0, 10, { exclusive: true }), expected: false, description: 'isInRange(0, 0, 10, { exclusive: true })' },
];

utilityTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Utility Test ${index + 1}: ${testCase.description} = ${result}`);
      passed++;
    } else {
      console.log(`❌ Utility Test ${index + 1}: ${testCase.description} = ${result} (expected ${testCase.expected})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Utility Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test range validators
console.log('\n🎯 Testing createRangeValidator...');
const ageValidator = createRangeValidator(0, 120);
console.log(`Validator Test 1: ageValidator(25) = ${ageValidator(25)}`);
console.log(`Validator Test 2: ageValidator(150) = ${ageValidator(150)}`);
console.log(`Validator Test 3: ageValidator(0) = ${ageValidator(0)}`);
console.log(`Validator Test 4: ageValidator(120) = ${ageValidator(120)}`);

// Test multiple ranges
console.log('\n📊 Testing multiple ranges...');
const ranges = [
  { start: 0, end: 10 },
  { start: 20, end: 30 },
  { start: 40, end: 50 }
];

const multipleRangeTests = [
  { test: () => isInAnyRange(5, ranges), expected: true, description: 'isInAnyRange(5, ranges)' },
  { test: () => isInAnyRange(15, ranges), expected: false, description: 'isInAnyRange(15, ranges)' },
  { test: () => isInAnyRange(25, ranges), expected: true, description: 'isInAnyRange(25, ranges)' },
  { test: () => isInAllRanges(5, ranges), expected: false, description: 'isInAllRanges(5, ranges)' },
  { test: () => isInAllRanges(5, [{ start: 0, end: 10 }, { start: 5, end: 15 }]), expected: true, description: 'isInAllRanges(5, overlapping ranges)' },
];

multipleRangeTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Multiple Range Test ${index + 1}: ${testCase.description} = ${result}`);
      passed++;
    } else {
      console.log(`❌ Multiple Range Test ${index + 1}: ${testCase.description} = ${result} (expected ${testCase.expected})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Multiple Range Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test distanceToRange
console.log('\n📏 Testing distanceToRange...');
const distanceTests = [
  { test: () => distanceToRange(5, 0, 10), expected: 0, description: 'distanceToRange(5, 0, 10) - inside range' },
  { test: () => distanceToRange(15, 0, 10), expected: 5, description: 'distanceToRange(15, 0, 10) - above range' },
  { test: () => distanceToRange(-5, 0, 10), expected: 5, description: 'distanceToRange(-5, 0, 10) - below range' },
  { test: () => distanceToRange(10, 0, 10), expected: 0, description: 'distanceToRange(10, 0, 10) - at boundary' },
];

distanceTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Distance Test ${index + 1}: ${testCase.description} = ${result}`);
      passed++;
    } else {
      console.log(`❌ Distance Test ${index + 1}: ${testCase.description} = ${result} (expected ${testCase.expected})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Distance Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test clampToRange
console.log('\n🔒 Testing clampToRange...');
const clampTests = [
  { test: () => clampToRange(5, 0, 10), expected: 5, description: 'clampToRange(5, 0, 10) - inside range' },
  { test: () => clampToRange(15, 0, 10), expected: 10, description: 'clampToRange(15, 0, 10) - above range' },
  { test: () => clampToRange(-5, 0, 10), expected: 0, description: 'clampToRange(-5, 0, 10) - below range' },
  { test: () => clampToRange(10, 0, 10), expected: 10, description: 'clampToRange(10, 0, 10) - at boundary' },
];

clampTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Clamp Test ${index + 1}: ${testCase.description} = ${result}`);
      passed++;
    } else {
      console.log(`❌ Clamp Test ${index + 1}: ${testCase.description} = ${result} (expected ${testCase.expected})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Clamp Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test range operations
console.log('\n🔄 Testing range operations...');
const rangeOpTests = [
  { test: () => rangesOverlap({ start: 0, end: 10 }, { start: 5, end: 15 }), expected: true, description: 'rangesOverlap - overlapping ranges' },
  { test: () => rangesOverlap({ start: 0, end: 10 }, { start: 20, end: 30 }), expected: false, description: 'rangesOverlap - non-overlapping ranges' },
  { test: () => rangesOverlap({ start: 0, end: 10 }, { start: 10, end: 20 }), expected: true, description: 'rangesOverlap - touching ranges' },
  { test: () => rangesOverlap({ start: 0, end: 10 }, { start: 10, end: 20 }, { exclusive: true }), expected: false, description: 'rangesOverlap - exclusive touching ranges' },
];

rangeOpTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Range Op Test ${index + 1}: ${testCase.description} = ${result}`);
      passed++;
    } else {
      console.log(`❌ Range Op Test ${index + 1}: ${testCase.description} = ${result} (expected ${testCase.expected})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Range Op Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test range intersection
console.log('\n🔗 Testing range intersection...');
const intersectionTests = [
  { test: () => rangeIntersection({ start: 0, end: 10 }, { start: 5, end: 15 }), expected: { start: 5, end: 10 }, description: 'rangeIntersection - overlapping ranges' },
  { test: () => rangeIntersection({ start: 0, end: 10 }, { start: 20, end: 30 }), expected: null, description: 'rangeIntersection - non-overlapping ranges' },
];

intersectionTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = JSON.stringify(result) === JSON.stringify(testCase.expected);
    
    if (success) {
      console.log(`✅ Intersection Test ${index + 1}: ${testCase.description} = ${JSON.stringify(result)}`);
      passed++;
    } else {
      console.log(`❌ Intersection Test ${index + 1}: ${testCase.description} = ${JSON.stringify(result)} (expected ${JSON.stringify(testCase.expected)})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Intersection Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test range union
console.log('\n🔗 Testing range union...');
const unionTests = [
  { test: () => rangeUnion({ start: 0, end: 10 }, { start: 5, end: 15 }), expected: { start: 0, end: 15 }, description: 'rangeUnion - overlapping ranges' },
  { test: () => rangeUnion({ start: 0, end: 10 }, { start: 20, end: 30 }), expected: { start: 0, end: 30 }, description: 'rangeUnion - non-overlapping ranges' },
];

unionTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = JSON.stringify(result) === JSON.stringify(testCase.expected);
    
    if (success) {
      console.log(`✅ Union Test ${index + 1}: ${testCase.description} = ${JSON.stringify(result)}`);
      passed++;
    } else {
      console.log(`❌ Union Test ${index + 1}: ${testCase.description} = ${JSON.stringify(result)} (expected ${JSON.stringify(testCase.expected)})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Union Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test range size and center
console.log('\n📐 Testing range size and center...');
const sizeCenterTests = [
  { test: () => rangeSize(0, 10), expected: 10, description: 'rangeSize(0, 10)' },
  { test: () => rangeSize(10, 0), expected: 10, description: 'rangeSize(10, 0) - reversed' },
  { test: () => rangeCenter(0, 10), expected: 5, description: 'rangeCenter(0, 10)' },
  { test: () => rangeCenter(10, 0), expected: 5, description: 'rangeCenter(10, 0) - reversed' },
];

sizeCenterTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Size/Center Test ${index + 1}: ${testCase.description} = ${result}`);
      passed++;
    } else {
      console.log(`❌ Size/Center Test ${index + 1}: ${testCase.description} = ${result} (expected ${testCase.expected})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Size/Center Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test range contains
console.log('\n📦 Testing range contains...');
const containsTests = [
  { test: () => rangeContains({ start: 0, end: 20 }, { start: 5, end: 15 }), expected: true, description: 'rangeContains - inner range' },
  { test: () => rangeContains({ start: 0, end: 10 }, { start: 5, end: 15 }), expected: false, description: 'rangeContains - overlapping range' },
  { test: () => rangeContains({ start: 0, end: 20 }, { start: 0, end: 20 }), expected: true, description: 'rangeContains - same range' },
  { test: () => rangeContains({ start: 0, end: 20 }, { start: 0, end: 20 }, { exclusive: true }), expected: false, description: 'rangeContains - exclusive same range' },
];

containsTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Contains Test ${index + 1}: ${testCase.description} = ${result}`);
      passed++;
    } else {
      console.log(`❌ Contains Test ${index + 1}: ${testCase.description} = ${result} (expected ${testCase.expected})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Contains Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test rangeFromValues
console.log('\n📊 Testing rangeFromValues...');
const fromValuesTests = [
  { test: () => rangeFromValues([1, 5, 10, 3, 8]), expected: { start: 1, end: 10 }, description: 'rangeFromValues - numbers' },
  { test: () => rangeFromValues([10, 5, 1, 8, 3]), expected: { start: 1, end: 10 }, description: 'rangeFromValues - mixed order' },
];

fromValuesTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = JSON.stringify(result) === JSON.stringify(testCase.expected);
    
    if (success) {
      console.log(`✅ FromValues Test ${index + 1}: ${testCase.description} = ${JSON.stringify(result)}`);
      passed++;
    } else {
      console.log(`❌ FromValues Test ${index + 1}: ${testCase.description} = ${JSON.stringify(result)} (expected ${JSON.stringify(testCase.expected)})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 FromValues Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test isAtBoundary
console.log('\n🎯 Testing isAtBoundary...');
const boundaryTests = [
  { test: () => isAtBoundary(0, 0, 10), expected: true, description: 'isAtBoundary(0, 0, 10) - start boundary' },
  { test: () => isAtBoundary(10, 0, 10), expected: true, description: 'isAtBoundary(10, 0, 10) - end boundary' },
  { test: () => isAtBoundary(5, 0, 10), expected: false, description: 'isAtBoundary(5, 0, 10) - inside range' },
  { test: () => isAtBoundary(15, 0, 10), expected: false, description: 'isAtBoundary(15, 0, 10) - outside range' },
];

boundaryTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Boundary Test ${index + 1}: ${testCase.description} = ${result}`);
      passed++;
    } else {
      console.log(`❌ Boundary Test ${index + 1}: ${testCase.description} = ${result} (expected ${testCase.expected})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Boundary Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test cache operations
console.log('\n💾 Testing cache operations...');
const cacheTests = [
  { test: () => { clearCache(); return getCacheStats().size; }, expected: 0, description: 'clearCache and getCacheStats' },
];

cacheTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Cache Test ${index + 1}: ${testCase.description} = ${result}`);
      passed++;
    } else {
      console.log(`❌ Cache Test ${index + 1}: ${testCase.description} = ${result} (expected ${testCase.expected})`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Cache Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Test error handling (strict mode)
console.log('\n⚠️ Testing error handling...');
const errorTests = [
  { 
    test: () => {
      try {
        (10).isInRange(null, 19, { strict: true });
        return 'no-error';
      } catch (error) {
        return error.message;
      }
    }, 
    expected: 'Range boundaries cannot be null or undefined', 
    description: 'strict mode with null start' 
  },
  { 
    test: () => {
      try {
        (10).isInRange(0, undefined, { strict: true });
        return 'no-error';
      } catch (error) {
        return error.message;
      }
    }, 
    expected: 'Range boundaries cannot be null or undefined', 
    description: 'strict mode with undefined end' 
  },
  {
    test: () => {
      try {
        rangeFromValues([]);
        return 'no-error';
      } catch (error) {
        return error.message;
      }
    },
    expected: 'Values must be a non-empty array',
    description: 'rangeFromValues with empty array'
  },
];

errorTests.forEach((testCase, index) => {
  try {
    const result = testCase.test();
    const success = result === testCase.expected;
    
    if (success) {
      console.log(`✅ Error Test ${index + 1}: ${testCase.description} = "${result}"`);
      passed++;
    } else {
      console.log(`❌ Error Test ${index + 1}: ${testCase.description} = "${result}" (expected "${testCase.expected}")`);
      failed++;
    }
  } catch (error) {
    console.log(`💥 Error Test ${index + 1}: ${testCase.description} - Error: ${error.message}`);
    failed++;
  }
});

// Summary
console.log('\n📊 Test Summary:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

if (failed === 0) {
  console.log('\n🎉 All tests passed! The package is working correctly.');
} else {
  console.log('\n⚠️  Some tests failed. Please check the implementation.');
} 