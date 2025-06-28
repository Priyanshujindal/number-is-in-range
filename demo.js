// Simple demo of number-is-in-range package
require('./index.js');

console.log('🎯 number-is-in-range Demo\n');

// Your original examples
console.log('Original Examples:');
console.log(`(10).isInRange(0, 19) = ${(10).isInRange(0, 19)}`);   // true
console.log(`(25).isInRange(0, 19) = ${(25).isInRange(0, 19)}`);   // false
console.log(`(10).isInRange(19, 0) = ${(10).isInRange(19, 0)}`);   // true
console.log(`(10.5).isInRange(10, 11) = ${(10.5).isInRange(10, 11)}`); // true

// Additional examples
console.log('\nAdditional Examples:');
console.log(`(-5).isInRange(-10, 0) = ${(-5).isInRange(-10, 0)}`); // true
console.log(`(0).isInRange(0, 10) = ${(0).isInRange(0, 10)}`);     // true
console.log(`(10).isInRange(0, 10) = ${(10).isInRange(0, 10)}`);   // true

// BigInt examples
if (typeof BigInt !== 'undefined') {
  console.log('\nBigInt Examples:');
  console.log(`(10n).isInRange(0n, 19n) = ${(10n).isInRange(0n, 19n)}`); // true
  console.log(`(25n).isInRange(0n, 19n) = ${(25n).isInRange(0n, 19n)}`); // false
}

console.log('\n✅ Demo completed!'); 