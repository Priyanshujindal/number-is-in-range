#!/usr/bin/env node

/**
 * Advanced Example - number-is-in-range
 * 
 * This example demonstrates advanced features of the number-is-in-range package:
 * - Exclusive ranges
 * - Range operations (intersection, union, overlap)
 * - Distance calculations
 * - Range analysis
 * - Cache management
 */

// Import the package
require('number-is-in-range');

// Import utility functions
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

console.log('🚀 Advanced Example - number-is-in-range Package\n');

// ============================================================================
// 1. Exclusive Ranges
// ============================================================================
console.log('🚫 1. Exclusive Ranges:');
console.log('=======================');

const exclusiveTests = [
    [5, 0, 10, { exclusive: true }],
    [0, 0, 10, { exclusive: true }],   // Boundary excluded
    [10, 0, 10, { exclusive: true }],  // Boundary excluded
    [5, 5, 5, { exclusive: true }],    // Same boundaries excluded
    [15, 0, 10, { exclusive: true }]   // Outside range
];

exclusiveTests.forEach(([value, start, end, options]) => {
    const result = value.isInRange(start, end, options);
    console.log(`   ${value}.isInRange(${start}, ${end}, { exclusive: true }) = ${result}`);
});

// ============================================================================
// 2. Range Operations
// ============================================================================
console.log('\n🔗 2. Range Operations:');
console.log('======================');

// Overlap detection
console.log('\n   📊 Overlap Detection:');
const overlapTests = [
    [[0, 10], [5, 15]],    // Overlapping
    [[0, 10], [15, 25]],   // Non-overlapping
    [[0, 10], [10, 20]],   // Touching
    [[0, 10], [10, 20], { exclusive: true }]  // Exclusive touching
];

overlapTests.forEach(([range1, range2, options]) => {
    const overlaps = rangesOverlap(range1[0], range1[1], range2[0], range2[1], options);
    console.log(`   rangesOverlap([${range1}], [${range2}]) = ${overlaps}`);
});

// Intersection
console.log('\n   🔗 Range Intersection:');
const intersectionTests = [
    [[0, 10], [5, 15]],    // Overlapping
    [[0, 10], [15, 25]]    // Non-overlapping
];

intersectionTests.forEach(([range1, range2]) => {
    const intersection = rangeIntersection(range1[0], range1[1], range2[0], range2[1]);
    console.log(`   rangeIntersection([${range1}], [${range2}]) = ${JSON.stringify(intersection)}`);
});

// Union
console.log('\n   🔗 Range Union:');
const unionTests = [
    [[0, 10], [5, 15]],    // Overlapping
    [[0, 10], [15, 25]]    // Non-overlapping
];

unionTests.forEach(([range1, range2]) => {
    const union = rangeUnion(range1[0], range1[1], range2[0], range2[1]);
    console.log(`   rangeUnion([${range1}], [${range2}]) = ${JSON.stringify(union)}`);
});

// ============================================================================
// 3. Distance and Clamping
// ============================================================================
console.log('\n📏 3. Distance and Clamping:');
console.log('============================');

const distanceTests = [
    [5, 0, 10],   // Inside range
    [15, 0, 10],  // Above range
    [-5, 0, 10],  // Below range
    [10, 0, 10]   // At boundary
];

distanceTests.forEach(([value, start, end]) => {
    const distance = distanceToRange(value, start, end);
    const clamped = clampToRange(value, start, end);
    console.log(`   Value ${value}: distance = ${distance}, clamped = ${clamped}`);
});

// ============================================================================
// 4. Range Analysis
// ============================================================================
console.log('\n📐 4. Range Analysis:');
console.log('====================');

const analysisTests = [
    [0, 10],
    [10, 0],   // Reversed
    [5, 5],    // Same values
    [-10, 10]  // Negative to positive
];

analysisTests.forEach(([start, end]) => {
    const size = rangeSize(start, end);
    const center = rangeCenter(start, end);
    console.log(`   Range [${start}, ${end}]: size = ${size}, center = ${center}`);
});

// ============================================================================
// 5. Range Containment
// ============================================================================
console.log('\n📦 5. Range Containment:');
console.log('========================');

const containmentTests = [
    [[0, 10], [2, 8]],     // Inner range
    [[0, 10], [5, 15]],    // Overlapping
    [[0, 10], [0, 10]],    // Same range
    [[0, 10], [0, 10], { exclusive: true }]  // Exclusive same range
];

containmentTests.forEach(([outer, inner, options]) => {
    const contains = rangeContains(outer[0], outer[1], inner[0], inner[1], options);
    console.log(`   [${outer}] contains [${inner}] = ${contains}`);
});

// ============================================================================
// 6. Range from Values
// ============================================================================
console.log('\n📊 6. Range from Values:');
console.log('========================');

const valueArrays = [
    [1, 5, 3, 10, 2, 8],
    [10, 20, 15, 5, 25],
    [0.5, 1.2, 0.8, 2.1]
];

valueArrays.forEach(values => {
    const range = rangeFromValues(values);
    console.log(`   Values [${values}]: range = ${JSON.stringify(range)}`);
});

// ============================================================================
// 7. Boundary Detection
// ============================================================================
console.log('\n🎯 7. Boundary Detection:');
console.log('========================');

const boundaryTests = [
    [0, 0, 10],    // Start boundary
    [10, 0, 10],   // End boundary
    [5, 0, 10],    // Inside range
    [15, 0, 10]    // Outside range
];

boundaryTests.forEach(([value, start, end]) => {
    const atBoundary = isAtBoundary(value, start, end);
    console.log(`   ${value} at boundary of [${start}, ${end}] = ${atBoundary}`);
});

// ============================================================================
// 8. Multiple Range Validation
// ============================================================================
console.log('\n📊 8. Multiple Range Validation:');
console.log('================================');

const ranges = [
    [0, 10],
    [20, 30],
    [40, 50]
];

const testValues = [5, 15, 25, 35, 45];

testValues.forEach(value => {
    const inAnyRange = isInAnyRange(value, ranges);
    const inAllRanges = isInAllRanges(value, ranges);
    console.log(`   Value ${value}: inAnyRange = ${inAnyRange}, inAllRanges = ${inAllRanges}`);
});

// ============================================================================
// 9. Custom Range Validator
// ============================================================================
console.log('\n🎯 9. Custom Range Validator:');
console.log('=============================');

// Create a temperature validator (Celsius)
const temperatureValidator = createRangeValidator(-273.15, 100, {
    exclusive: false,
    strict: true
});

const temperatures = [-300, -273.15, 0, 25, 100, 150];

temperatures.forEach(temp => {
    const isValid = temperatureValidator(temp);
    const status = isValid ? '✅ Valid' : '❌ Invalid';
    console.log(`   Temperature ${temp}°C: ${status}`);
});

// ============================================================================
// 10. Cache Management
// ============================================================================
console.log('\n💾 10. Cache Management:');
console.log('=======================');

// Clear cache and get stats
clearCache();
const stats = getCacheStats();
console.log(`   Cache stats after clearing: ${JSON.stringify(stats)}`);

// Run some operations to populate cache
for (let i = 0; i < 100; i++) {
    i.isInRange(0, 100);
}

const statsAfter = getCacheStats();
console.log(`   Cache stats after operations: ${JSON.stringify(statsAfter)}`);

// ============================================================================
// 11. Performance Comparison
// ============================================================================
console.log('\n⚡ 11. Performance Comparison:');
console.log('==============================');

const iterations = 50000;
const testValue = 25;
const range = [10, 30];

// Test with cache
console.log('   Testing with cache enabled...');
const startTime1 = Date.now();
for (let i = 0; i < iterations; i++) {
    testValue.isInRange(...range);
}
const endTime1 = Date.now();
const duration1 = endTime1 - startTime1;

// Clear cache and test without cache
clearCache();
console.log('   Testing with cache disabled...');
const startTime2 = Date.now();
for (let i = 0; i < iterations; i++) {
    testValue.isInRange(...range);
}
const endTime2 = Date.now();
const duration2 = endTime2 - startTime2;

console.log(`   With cache: ${duration1}ms`);
console.log(`   Without cache: ${duration2}ms`);
console.log(`   Performance improvement: ${((duration2 - duration1) / duration2 * 100).toFixed(1)}%`);

console.log('\n🎉 Advanced example completed successfully!');
console.log('📚 Check out the other examples for more use cases:');
console.log('   - validation-example.js: Form validation scenarios');
console.log('   - game-example.js: Game development use cases');
console.log('   - form-validation-example.js: Real-world form validation'); 