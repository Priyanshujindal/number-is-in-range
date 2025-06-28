#!/usr/bin/env node

/**
 * Validation Example - number-is-in-range
 * 
 * This example demonstrates form validation scenarios using the number-is-in-range package:
 * - Age validation
 * - Score validation
 * - Custom validators
 * - Error handling
 * - Real-world validation scenarios
 */

// Import the package
require('number-is-in-range');

// Import utility functions
const {
    createRangeValidator,
    isInRange,
    clampToRange,
    distanceToRange
} = require('number-is-in-range');

console.log('✅ Validation Example - number-is-in-range Package\n');

// ============================================================================
// 1. Age Validation System
// ============================================================================
console.log('👤 1. Age Validation System:');
console.log('============================');

// Create age validators for different contexts
const childAgeValidator = createRangeValidator(0, 12, { exclusive: false });
const teenAgeValidator = createRangeValidator(13, 19, { exclusive: false });
const adultAgeValidator = createRangeValidator(18, 65, { exclusive: false });
const seniorAgeValidator = createRangeValidator(65, 120, { exclusive: false });

const ages = [0, 5, 12, 13, 18, 25, 65, 80, 120, 150];

ages.forEach(age => {
    const categories = [];
    if (childAgeValidator(age)) categories.push('Child');
    if (teenAgeValidator(age)) categories.push('Teen');
    if (adultAgeValidator(age)) categories.push('Adult');
    if (seniorAgeValidator(age)) categories.push('Senior');
    
    const status = categories.length > 0 ? `✅ ${categories.join(', ')}` : '❌ Invalid Age';
    console.log(`   Age ${age}: ${status}`);
});

// ============================================================================
// 2. Score Validation System
// ============================================================================
console.log('\n📊 2. Score Validation System:');
console.log('==============================');

// Create score validators for different grading systems
const percentageValidator = createRangeValidator(0, 100, { exclusive: false });
const letterGradeValidator = (score) => {
    if (!percentageValidator(score)) return 'Invalid';
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
};

const scores = [-10, 0, 50, 75, 85, 95, 100, 110];

scores.forEach(score => {
    const isValid = percentageValidator(score);
    const grade = letterGradeValidator(score);
    const status = isValid ? `✅ ${grade}` : '❌ Invalid';
    console.log(`   Score ${score}: ${status}`);
});

// ============================================================================
// 3. Temperature Validation
// ============================================================================
console.log('\n🌡️ 3. Temperature Validation:');
console.log('============================');

// Create temperature validators for different scales
const celsiusValidator = createRangeValidator(-273.15, 100, { exclusive: false });
const fahrenheitValidator = createRangeValidator(-459.67, 212, { exclusive: false });
const kelvinValidator = createRangeValidator(0, 373.15, { exclusive: false });

const temperatures = [
    { celsius: -300, fahrenheit: -508, kelvin: -26.85 },
    { celsius: -273.15, fahrenheit: -459.67, kelvin: 0 },
    { celsius: 0, fahrenheit: 32, kelvin: 273.15 },
    { celsius: 25, fahrenheit: 77, kelvin: 298.15 },
    { celsius: 100, fahrenheit: 212, kelvin: 373.15 },
    { celsius: 150, fahrenheit: 302, kelvin: 423.15 }
];

temperatures.forEach(temp => {
    const celsiusValid = celsiusValidator(temp.celsius);
    const fahrenheitValid = fahrenheitValidator(temp.fahrenheit);
    const kelvinValid = kelvinValidator(temp.kelvin);
    
    console.log(`   ${temp.celsius}°C, ${temp.fahrenheit}°F, ${temp.kelvin}K: ${celsiusValid ? '✅' : '❌'} ${fahrenheitValid ? '✅' : '❌'} ${kelvinValid ? '✅' : '❌'}`);
});

// ============================================================================
// 4. Form Validation Class
// ============================================================================
console.log('\n📝 4. Form Validation Class:');
console.log('============================');

class FormValidator {
    constructor() {
        this.errors = [];
        this.validators = {
            age: createRangeValidator(0, 120, { exclusive: false, strict: true }),
            score: createRangeValidator(0, 100, { exclusive: false }),
            temperature: createRangeValidator(-50, 50, { exclusive: false }),
            percentage: createRangeValidator(0, 100, { exclusive: false }),
            rating: createRangeValidator(1, 5, { exclusive: false })
        };
    }

    validate(field, value, customRange = null) {
        const validator = customRange ? 
            createRangeValidator(customRange[0], customRange[1], { exclusive: false }) :
            this.validators[field];
        
        if (!validator) {
            this.errors.push(`Unknown field: ${field}`);
            return false;
        }

        const isValid = validator(value);
        if (!isValid) {
            this.errors.push(`${field}: ${value} is not in valid range`);
        }
        return isValid;
    }

    getErrors() {
        return this.errors;
    }

    clearErrors() {
        this.errors = [];
    }

    isValid() {
        return this.errors.length === 0;
    }
}

// Test the form validator
const formValidator = new FormValidator();

const formData = {
    age: 25,
    score: 85,
    temperature: 22.5,
    percentage: 75,
    rating: 4
};

console.log('   Validating form data...');
Object.entries(formData).forEach(([field, value]) => {
    const isValid = formValidator.validate(field, value);
    console.log(`   ${field}: ${value} - ${isValid ? '✅ Valid' : '❌ Invalid'}`);
});

console.log(`   Form validation result: ${formValidator.isValid() ? '✅ All valid' : '❌ Has errors'}`);
if (!formValidator.isValid()) {
    console.log('   Errors:', formValidator.getErrors());
}

// ============================================================================
// 5. Input Sanitization
// ============================================================================
console.log('\n🧹 5. Input Sanitization:');
console.log('==========================');

const sanitizeInput = (value, min, max, defaultValue = null) => {
    // Convert to number
    const numValue = Number(value);
    
    // Check if it's a valid number
    if (isNaN(numValue)) {
        return defaultValue;
    }
    
    // Clamp to range
    return clampToRange(numValue, min, max);
};

const inputs = [
    'abc',      // Invalid
    '10',       // Valid
    '150',      // Out of range
    '-5',       // Out of range
    '25.5',     // Valid
    '',         // Invalid
    '0'         // Valid
];

const range = [0, 100];
const defaultValue = 50;

inputs.forEach(input => {
    const sanitized = sanitizeInput(input, ...range, defaultValue);
    const original = input === '' ? '(empty)' : input;
    console.log(`   Input: "${original}" → Sanitized: ${sanitized}`);
});

// ============================================================================
// 6. Range-based Feedback System
// ============================================================================
console.log('\n💬 6. Range-based Feedback System:');
console.log('==================================');

const getFeedback = (value, ranges) => {
    for (const [range, feedback] of ranges) {
        if (value.isInRange(...range)) {
            return feedback;
        }
    }
    return 'No feedback available';
};

const performanceRanges = [
    [[0, 50], 'Needs improvement'],
    [[50, 70], 'Average performance'],
    [[70, 85], 'Good performance'],
    [[85, 95], 'Excellent performance'],
    [[95, 100], 'Outstanding performance']
];

const performanceScores = [25, 55, 75, 90, 98];

performanceScores.forEach(score => {
    const feedback = getFeedback(score, performanceRanges);
    console.log(`   Score ${score}: ${feedback}`);
});

// ============================================================================
// 7. Distance-based Validation
// ============================================================================
console.log('\n📏 7. Distance-based Validation:');
console.log('=================================');

const validateWithTolerance = (value, target, tolerance) => {
    const distance = distanceToRange(value, target - tolerance, target + tolerance);
    const isValid = distance === 0;
    const closeness = distance === 0 ? 'exact' : distance <= tolerance ? 'close' : 'far';
    
    return { isValid, distance, closeness };
};

const measurements = [
    { value: 100, target: 100, tolerance: 5 },
    { value: 102, target: 100, tolerance: 5 },
    { value: 107, target: 100, tolerance: 5 },
    { value: 110, target: 100, tolerance: 5 }
];

measurements.forEach(({ value, target, tolerance }) => {
    const result = validateWithTolerance(value, target, tolerance);
    const status = result.isValid ? '✅ Valid' : '❌ Invalid';
    console.log(`   Value ${value} (target: ${target} ± ${tolerance}): ${status} (${result.closeness})`);
});

// ============================================================================
// 8. Real-world Validation Scenario
// ============================================================================
console.log('\n🌍 8. Real-world Validation Scenario:');
console.log('=====================================');

// Simulate a user registration form
const validateUserRegistration = (userData) => {
    const validator = new FormValidator();
    const errors = [];

    // Age validation (must be 13+ for registration)
    if (!validator.validate('age', userData.age, [13, 120])) {
        errors.push('Age must be between 13 and 120 years');
    }

    // Email verification code (6-digit)
    if (!validator.validate('verificationCode', userData.verificationCode, [100000, 999999])) {
        errors.push('Verification code must be a 6-digit number');
    }

    // Account balance (cannot be negative)
    if (!validator.validate('balance', userData.balance, [0, 1000000])) {
        errors.push('Account balance cannot be negative');
    }

    // Rating (1-5 stars)
    if (!validator.validate('rating', userData.rating, [1, 5])) {
        errors.push('Rating must be between 1 and 5 stars');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

const testUsers = [
    { age: 15, verificationCode: 123456, balance: 100, rating: 4 },
    { age: 10, verificationCode: 12345, balance: -50, rating: 6 },
    { age: 25, verificationCode: 999999, balance: 0, rating: 1 }
];

testUsers.forEach((user, index) => {
    const result = validateUserRegistration(user);
    console.log(`   User ${index + 1}: ${result.isValid ? '✅ Valid' : '❌ Invalid'}`);
    if (!result.isValid) {
        result.errors.forEach(error => console.log(`     - ${error}`));
    }
});

console.log('\n🎉 Validation example completed successfully!');
console.log('📚 Check out the other examples for more use cases:');
console.log('   - game-example.js: Game development use cases');
console.log('   - form-validation-example.js: Real-world form validation'); 