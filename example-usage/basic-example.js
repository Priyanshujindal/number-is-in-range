#!/usr/bin/env node

/**
 * Basic Example - number-is-in-range
 * 
 * This example demonstrates the fundamental features of the number-is-in-range package:
 * - Basic range checking
 * - Bidirectional ranges
 * - Floating point numbers
 * - BigInt support
 */

// Import the package
require('number-is-in-range');

console.log('🔢 Basic Example - number-is-in-range Package\n');

// ============================================================================
// 1. Basic Range Checking
// ============================================================================
console.log('📊 1. Basic Range Checking:');
console.log('==========================');

const testNumbers = [5, 10, 15, 20, 25];
const rangeStart = 10;
const rangeEnd = 20;

testNumbers.forEach(num => {
    const isInRange = num.isInRange(rangeStart, rangeEnd);
    console.log(`   ${num}.isInRange(${rangeStart}, ${rangeEnd}) = ${isInRange}`);
});

// ============================================================================
// 2. Bidirectional Ranges
// ============================================================================
console.log('\n🔄 2. Bidirectional Ranges:');
console.log('===========================');

const testValue = 15;
const ranges = [
    [10, 20],  // Normal order
    [20, 10],  // Reversed order
    [15, 15],  // Same values
    [0, 30]    // Wide range
];

ranges.forEach(([start, end]) => {
    const isInRange = testValue.isInRange(start, end);
    console.log(`   ${testValue}.isInRange(${start}, ${end}) = ${isInRange}`);
});

// ============================================================================
// 3. Floating Point Numbers
// ============================================================================
console.log('\n🔢 3. Floating Point Numbers:');
console.log('=============================');

const floatTests = [
    [10.5, 10, 11],
    [10.0, 10, 11],
    [10.99, 10, 11],
    [9.99, 10, 11],
    [11.01, 10, 11]
];

floatTests.forEach(([value, start, end]) => {
    const isInRange = value.isInRange(start, end);
    console.log(`   ${value}.isInRange(${start}, ${end}) = ${isInRange}`);
});

// ============================================================================
// 4. BigInt Support
// ============================================================================
console.log('\n🔢 4. BigInt Support:');
console.log('===================');

const bigIntTests = [
    [10n, 0n, 20n],
    [25n, 0n, 20n],
    [10n, 20n, 0n],  // Bidirectional
    [1000000000000000000n, 0n, 2000000000000000000n]  // Large BigInt
];

bigIntTests.forEach(([value, start, end]) => {
    const isInRange = value.isInRange(start, end);
    console.log(`   ${value}.isInRange(${start}, ${end}) = ${isInRange}`);
});

// ============================================================================
// 5. Boundary Testing
// ============================================================================
console.log('\n🎯 5. Boundary Testing:');
console.log('======================');

const boundaryTests = [
    [0, 0, 10],    // At start boundary
    [10, 0, 10],   // At end boundary
    [5, 5, 5],     // Same start and end
    [-5, -10, 0],  // Negative numbers
    [0, -10, 10]   // Mixed negative and positive
];

boundaryTests.forEach(([value, start, end]) => {
    const isInRange = value.isInRange(start, end);
    console.log(`   ${value}.isInRange(${start}, ${end}) = ${isInRange}`);
});

// ============================================================================
// 6. Utility Functions
// ============================================================================
console.log('\n🔧 6. Utility Functions:');
console.log('=======================');

// Import utility functions
const { isInRange: isInRangeUtil } = require('number-is-in-range');

const utilityTests = [
    [15, 10, 20],
    [25, 10, 20],
    [10.5, 10, 11],
    [0, -10, 10]
];

utilityTests.forEach(([value, start, end]) => {
    const result = isInRangeUtil(value, start, end);
    console.log(`   isInRange(${value}, ${start}, ${end}) = ${result}`);
});

// ============================================================================
// 7. Real-world Scenario: Age Validation
// ============================================================================
console.log('\n👤 7. Real-world Scenario: Age Validation');
console.log('==========================================');

const ages = [0, 5, 18, 25, 65, 120, 150];
const validAgeRange = [0, 120];

ages.forEach(age => {
    const isValidAge = age.isInRange(...validAgeRange);
    const status = isValidAge ? '✅ Valid' : '❌ Invalid';
    console.log(`   Age ${age}: ${status}`);
});

// ============================================================================
// 8. Performance Test
// ============================================================================
console.log('\n⚡ 8. Performance Test');
console.log('=====================');

const iterations = 100000;
const testValue2 = 15;
const range2 = [10, 20];

console.log(`   Running ${iterations.toLocaleString()} iterations...`);

const startTime = Date.now();
for (let i = 0; i < iterations; i++) {
    testValue2.isInRange(...range2);
}
const endTime = Date.now();

const duration = endTime - startTime;
console.log(`   ✅ Completed in ${duration}ms`);
console.log(`   📊 Average: ${(duration / iterations * 1000).toFixed(3)}μs per operation`);

console.log('\n🎉 Basic example completed successfully!');
console.log('📚 Check out the other examples for more advanced features:');
console.log('   - advanced-example.js: Exclusive ranges, range operations');
console.log('   - validation-example.js: Form validation scenarios');
console.log('   - game-example.js: Game development use cases');
console.log('   - form-validation-example.js: Real-world form validation'); 