// Comprehensive example usage of number-is-in-range package v3.0.0
require('./index.js');

console.log('🚀 number-is-in-range v3.0.0 - Comprehensive Examples\n');

// Basic usage examples
console.log('📊 Basic Examples:');
console.log(`(10).isInRange(0, 19) = ${(10).isInRange(0, 19)}`);   // true
console.log(`(25).isInRange(0, 19) = ${(25).isInRange(0, 19)}`);   // false
console.log(`(10).isInRange(19, 0) = ${(10).isInRange(19, 0)}`);   // true (bidirectional)
console.log(`(10.5).isInRange(10, 11) = ${(10.5).isInRange(10, 11)}`); // true

// Advanced options
console.log('\n⚙️ Advanced Options:');
console.log(`(10).isInRange(0, 19, { exclusive: true }) = ${(10).isInRange(0, 19, { exclusive: true })}`); // true
console.log(`(0).isInRange(0, 10, { exclusive: true }) = ${(0).isInRange(0, 10, { exclusive: true })}`);   // false
console.log(`(10).isInRange(0, 10, { exclusive: true }) = ${(10).isInRange(0, 10, { exclusive: true })}`); // false

// Boundary testing
console.log('\n🎯 Boundary Testing:');
console.log(`(0).isInRange(0, 10) = ${(0).isInRange(0, 10)}`);     // true (at start)
console.log(`(10).isInRange(0, 10) = ${(10).isInRange(0, 10)}`);   // true (at end)
console.log(`(5).isInRange(5, 5) = ${(5).isInRange(5, 5)}`);       // true (same start/end)

// Negative numbers
console.log('\n➖ Negative Numbers:');
console.log(`(-5).isInRange(-10, 0) = ${(-5).isInRange(-10, 0)}`); // true
console.log(`(-15).isInRange(-10, 0) = ${(-15).isInRange(-10, 0)}`); // false

// BigInt examples (if supported)
if (typeof BigInt !== 'undefined') {
  console.log('\n🔢 BigInt Examples:');
  console.log(`(10n).isInRange(0n, 19n) = ${(10n).isInRange(0n, 19n)}`); // true
  console.log(`(25n).isInRange(0n, 19n) = ${(25n).isInRange(0n, 19n)}`); // false
  console.log(`(10n).isInRange(0n, 19n, { exclusive: true }) = ${(10n).isInRange(0n, 19n, { exclusive: true })}`); // true
  
  // Large numbers
  const largeNumber = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
  console.log(`Large BigInt in range = ${largeNumber.isInRange(0n, largeNumber + 100n)}`); // true
}

// Advanced utility functions
console.log('\n🔧 Advanced Utility Functions:');
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

console.log(`isInRange(10, 0, 19) = ${isInRange(10, 0, 19)}`);     // true
console.log(`isInRange(10.5, 10, 11) = ${isInRange(10.5, 10, 11)}`); // true
console.log(`isInRange(10, 0, 19, { exclusive: true }) = ${isInRange(10, 0, 19, { exclusive: true })}`); // true

// Create reusable validators
console.log('\n🎯 Range Validators:');
const ageValidator = createRangeValidator(0, 120);
const temperatureValidator = createRangeValidator(-273.15, 100, { exclusive: true });
const scoreValidator = createRangeValidator(0, 100, { strict: true });

console.log(`ageValidator(25) = ${ageValidator(25)}`);        // true
console.log(`ageValidator(150) = ${ageValidator(150)}`);       // false
console.log(`temperatureValidator(20) = ${temperatureValidator(20)}`); // true
console.log(`temperatureValidator(-273.15) = ${temperatureValidator(-273.15)}`); // false (exclusive)

// Multiple range checking
console.log('\n📊 Multiple Ranges:');
const ranges = [
  { start: 0, end: 10 },
  { start: 20, end: 30 },
  { start: 40, end: 50 }
];

console.log(`isInAnyRange(5, ranges) = ${isInAnyRange(5, ranges)}`);   // true (in first range)
console.log(`isInAnyRange(15, ranges) = ${isInAnyRange(15, ranges)}`);  // false (not in any range)
console.log(`isInAnyRange(25, ranges) = ${isInAnyRange(25, ranges)}`);  // true (in second range)

// Check if value is in ALL ranges
const overlappingRanges = [
  { start: 0, end: 10 },
  { start: 5, end: 15 }
];

console.log(`isInAllRanges(5, overlappingRanges) = ${isInAllRanges(5, overlappingRanges)}`); // true (in both ranges)
console.log(`isInAllRanges(15, overlappingRanges) = ${isInAllRanges(15, overlappingRanges)}`); // false (only in second range)

// Distance calculation
console.log('\n📏 Distance Calculation:');
console.log(`distanceToRange(5, 0, 10) = ${distanceToRange(5, 0, 10)}`);  // 0 (inside range)
console.log(`distanceToRange(15, 0, 10) = ${distanceToRange(15, 0, 10)}`); // 5 (5 units above range)
console.log(`distanceToRange(-5, 0, 10) = ${distanceToRange(-5, 0, 10)}`); // 5 (5 units below range)
console.log(`distanceToRange(10, 0, 10) = ${distanceToRange(10, 0, 10)}`); // 0 (at boundary)

// Clamping values to range
console.log('\n🔒 Clamping Values:');
console.log(`clampToRange(5, 0, 10) = ${clampToRange(5, 0, 10)}`);  // 5 (inside range)
console.log(`clampToRange(15, 0, 10) = ${clampToRange(15, 0, 10)}`); // 10 (clamped to upper bound)
console.log(`clampToRange(-5, 0, 10) = ${clampToRange(-5, 0, 10)}`); // 0 (clamped to lower bound)
console.log(`clampToRange(10, 0, 10) = ${clampToRange(10, 0, 10)}`); // 10 (at boundary)

// Range operations
console.log('\n🔄 Range Operations:');
const range1 = { start: 0, end: 10 };
const range2 = { start: 5, end: 15 };
const range3 = { start: 20, end: 30 };

console.log(`rangesOverlap(range1, range2) = ${rangesOverlap(range1, range2)}`); // true
console.log(`rangesOverlap(range1, range3) = ${rangesOverlap(range1, range3)}`); // false
console.log(`rangesOverlap(range1, range2, { exclusive: true }) = ${rangesOverlap(range1, range2, { exclusive: true })}`); // true

// Range intersection and union
console.log('\n🔗 Range Intersection & Union:');
console.log(`rangeIntersection(range1, range2) = ${JSON.stringify(rangeIntersection(range1, range2))}`); // { start: 5, end: 10 }
console.log(`rangeIntersection(range1, range3) = ${rangeIntersection(range1, range3)}`); // null
console.log(`rangeUnion(range1, range2) = ${JSON.stringify(rangeUnion(range1, range2))}`); // { start: 0, end: 15 }
console.log(`rangeUnion(range1, range3) = ${JSON.stringify(rangeUnion(range1, range3))}`); // { start: 0, end: 30 }

// Range size and center
console.log('\n📐 Range Size & Center:');
console.log(`rangeSize(0, 10) = ${rangeSize(0, 10)}`); // 10
console.log(`rangeSize(10, 0) = ${rangeSize(10, 0)}`); // 10 (reversed)
console.log(`rangeCenter(0, 10) = ${rangeCenter(0, 10)}`); // 5
console.log(`rangeCenter(10, 0) = ${rangeCenter(10, 0)}`); // 5 (reversed)

// Range containment
console.log('\n📦 Range Containment:');
const outerRange = { start: 0, end: 20 };
const innerRange = { start: 5, end: 15 };
const overlappingRange = { start: 15, end: 25 };

console.log(`rangeContains(outerRange, innerRange) = ${rangeContains(outerRange, innerRange)}`); // true
console.log(`rangeContains(outerRange, overlappingRange) = ${rangeContains(outerRange, overlappingRange)}`); // false
console.log(`rangeContains(outerRange, outerRange) = ${rangeContains(outerRange, outerRange)}`); // true
console.log(`rangeContains(outerRange, outerRange, { exclusive: true }) = ${rangeContains(outerRange, outerRange, { exclusive: true })}`); // false

// Create range from values
console.log('\n📊 Range from Values:');
const values = [1, 5, 10, 3, 8, -2, 15];
const rangeFromValues = rangeFromValues(values);
console.log(`rangeFromValues([1, 5, 10, 3, 8, -2, 15]) = ${JSON.stringify(rangeFromValues)}`); // { start: -2, end: 15 }

// Boundary checking
console.log('\n🎯 Boundary Checking:');
console.log(`isAtBoundary(0, 0, 10) = ${isAtBoundary(0, 0, 10)}`); // true (start boundary)
console.log(`isAtBoundary(10, 0, 10) = ${isAtBoundary(10, 0, 10)}`); // true (end boundary)
console.log(`isAtBoundary(5, 0, 10) = ${isAtBoundary(5, 0, 10)}`); // false (inside range)
console.log(`isAtBoundary(15, 0, 10) = ${isAtBoundary(15, 0, 10)}`); // false (outside range)

// Cache management
console.log('\n💾 Cache Management:');
console.log(`Initial cache size: ${getCacheStats().size}`);
clearCache();
console.log(`After clearCache(): ${getCacheStats().size}`);

// Practical examples
console.log('\n💡 Practical Examples:');

// Advanced form validation
function validateAdvancedForm(data) {
  const errors = [];
  
  // Age validation (0-120, inclusive)
  if (!data.age.isInRange(0, 120)) {
    errors.push('Age must be between 0 and 120');
  }
  
  // Temperature validation (exclusive of absolute zero)
  if (!data.temperature.isInRange(-273.15, 100, { exclusive: true })) {
    errors.push('Temperature must be above -273.15°C and below 100°C');
  }
  
  // Score validation (strict mode)
  try {
    if (!data.score.isInRange(0, 100, { strict: true })) {
      errors.push('Score must be between 0 and 100');
    }
  } catch (error) {
    errors.push('Invalid score format');
  }
  
  // Clamp values to valid ranges
  data.age = clampToRange(data.age, 0, 120);
  data.temperature = clampToRange(data.temperature, -273.15, 100);
  data.score = clampToRange(data.score, 0, 100);
  
  return { errors, clampedData: data };
}

const formData = { age: 25, temperature: 20, score: 85 };
const validationResult = validateAdvancedForm(formData);
console.log('Advanced form validation:', validationResult.errors.length === 0 ? 'Valid' : validationResult.errors);

// Data processing with range operations
console.log('\n📈 Data Processing with Range Operations:');
const dataPoints = [25, 30, 150, -10, 500, 75, 200];
const validRanges = [
  { start: 0, end: 120 },    // Age range
  { start: -50, end: 50 },   // Temperature range
  { start: 0, end: 1000 }    // Pressure range
];

// Find valid data points
const validData = dataPoints.filter(point => isInAnyRange(point, validRanges));
console.log(`Valid data points: ${validData.join(', ')}`);

// Create range from valid data
const dataRange = rangeFromValues(validData);
console.log(`Data range: ${JSON.stringify(dataRange)}`);

// Check if data range overlaps with expected ranges
const expectedRange = { start: 0, end: 100 };
console.log(`Data range overlaps with expected: ${rangesOverlap(dataRange, expectedRange)}`);

// Advanced game development example
console.log('\n🎮 Advanced Game Development:');
class AdvancedPlayer {
  constructor() {
    this.health = 100;
    this.position = { x: 0, y: 0 };
    this.safeZones = [
      { start: 0, end: 100 },
      { start: 200, end: 300 },
      { start: 500, end: 600 }
    ];
  }
  
  takeDamage(amount) {
    const newHealth = this.health - amount;
    this.health = clampToRange(newHealth, 0, 100);
  }
  
  moveTo(x, y) {
    const gameBounds = { start: -1000, end: 1000 };
    if (x.isInRange(gameBounds.start, gameBounds.end) && 
        y.isInRange(gameBounds.start, gameBounds.end)) {
      this.position = { x, y };
    }
  }
  
  isInSafeZone() {
    return this.position.x.isInAnyRange(this.safeZones) && 
           this.position.y.isInAnyRange(this.safeZones);
  }
  
  getDistanceToSafeZone() {
    const safeZoneUnion = this.safeZones.reduce((union, zone) => 
      rangeUnion(union, zone), { start: 0, end: 0 });
    
    const xDistance = distanceToRange(this.position.x, safeZoneUnion.start, safeZoneUnion.end);
    const yDistance = distanceToRange(this.position.y, safeZoneUnion.start, safeZoneUnion.end);
    
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  }
}

const player = new AdvancedPlayer();
player.takeDamage(20);
player.moveTo(50, 50);
console.log(`Player health: ${player.health}`);
console.log(`Player in safe zone: ${player.isInSafeZone()}`);
console.log(`Distance to safe zone: ${player.getDistanceToSafeZone().toFixed(2)}`);

// Scientific computing with advanced range operations
console.log('\n🔬 Scientific Computing:');
class AdvancedSensorData {
  constructor(value, expectedRange, tolerance = 5) {
    this.value = value;
    this.expectedRange = expectedRange;
    this.tolerance = tolerance;
  }
  
  isNormal() {
    return this.value.isInRange(this.expectedRange.start, this.expectedRange.end);
  }
  
  getDeviation() {
    return distanceToRange(this.value, this.expectedRange.start, this.expectedRange.end);
  }
  
  getSeverity() {
    const deviation = this.getDeviation();
    if (deviation === 0) return 'normal';
    if (deviation.isInRange(0, this.tolerance)) return 'warning';
    if (deviation.isInRange(this.tolerance, this.tolerance * 2)) return 'critical';
    return 'severe';
  }
  
  getClampedValue() {
    return clampToRange(this.value, this.expectedRange.start, this.expectedRange.end);
  }
  
  isAtBoundary() {
    return isAtBoundary(this.value, this.expectedRange.start, this.expectedRange.end);
  }
}

const temperatureSensor = new AdvancedSensorData(25, { start: 20, end: 30 });
console.log(`Temperature sensor normal: ${temperatureSensor.isNormal()}`);
console.log(`Temperature sensor severity: ${temperatureSensor.getSeverity()}`);
console.log(`Temperature sensor clamped: ${temperatureSensor.getClampedValue()}`);
console.log(`Temperature sensor at boundary: ${temperatureSensor.isAtBoundary()}`);

// Error handling demonstration
console.log('\n⚠️ Error Handling:');
try {
  (10).isInRange(null, 19, { strict: true });
} catch (error) {
  console.log(`Strict mode error: ${error.message}`);
}

try {
  (10).isInRange(0, undefined, { strict: true });
} catch (error) {
  console.log(`Strict mode error: ${error.message}`);
}

try {
  rangeFromValues([]);
} catch (error) {
  console.log(`rangeFromValues error: ${error.message}`);
}

console.log('\n✅ All comprehensive examples completed successfully!'); 