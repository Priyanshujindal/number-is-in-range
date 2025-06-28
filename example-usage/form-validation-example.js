#!/usr/bin/env node

/**
 * Form Validation Example - number-is-in-range
 * 
 * This example demonstrates real-world form validation using the number-is-in-range package:
 * - User registration form
 * - Input validation
 * - Error handling
 * - Real-time validation
 * - Form submission
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

console.log('📝 Form Validation Example - number-is-in-range Package\n');

// ============================================================================
// 1. Form Validation Class
// ============================================================================
console.log('🔧 1. Form Validation Class:');
console.log('============================');

class FormValidation {
    constructor() {
        this.errors = {};
        this.validators = {
            age: createRangeValidator(13, 120, { exclusive: false, strict: true }),
            phone: createRangeValidator(1000000000, 9999999999, { exclusive: false }),
            zipCode: createRangeValidator(10000, 99999, { exclusive: false }),
            rating: createRangeValidator(1, 5, { exclusive: false }),
            percentage: createRangeValidator(0, 100, { exclusive: false }),
            temperature: createRangeValidator(-50, 150, { exclusive: false }),
            price: createRangeValidator(0, 10000, { exclusive: false }),
            quantity: createRangeValidator(1, 1000, { exclusive: false })
        };
    }

    validate(field, value, customRange = null) {
        const validator = customRange ? 
            createRangeValidator(customRange[0], customRange[1], { exclusive: false }) :
            this.validators[field];
        
        if (!validator) {
            this.addError(field, `Unknown field: ${field}`);
            return false;
        }

        const isValid = validator(value);
        if (!isValid) {
            this.addError(field, `${field} must be in valid range`);
        } else {
            this.removeError(field);
        }
        
        return isValid;
    }

    addError(field, message) {
        this.errors[field] = message;
    }

    removeError(field) {
        delete this.errors[field];
    }

    getErrors() {
        return this.errors;
    }

    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }

    clearErrors() {
        this.errors = {};
    }

    isValid() {
        return !this.hasErrors();
    }
}

// ============================================================================
// 2. User Registration Form
// ============================================================================
console.log('\n👤 2. User Registration Form:');
console.log('=============================');

class UserRegistrationForm {
    constructor() {
        this.validator = new FormValidation();
        this.formData = {};
    }

    validateAge(age) {
        if (!this.validator.validate('age', age)) {
            return { isValid: false, message: 'Age must be between 13 and 120 years' };
        }
        
        let category = '';
        if (age.isInRange(13, 17)) category = 'Teenager';
        else if (age.isInRange(18, 25)) category = 'Young Adult';
        else if (age.isInRange(26, 64)) category = 'Adult';
        else category = 'Senior';
        
        return { isValid: true, message: `Valid age (${category})` };
    }

    validatePhone(phone) {
        if (!this.validator.validate('phone', phone)) {
            return { isValid: false, message: 'Phone number must be a valid 10-digit number' };
        }
        return { isValid: true, message: 'Valid phone number' };
    }

    validateZipCode(zipCode) {
        if (!this.validator.validate('zipCode', zipCode)) {
            return { isValid: false, message: 'Zip code must be a valid 5-digit number' };
        }
        return { isValid: true, message: 'Valid zip code' };
    }

    validateRating(rating) {
        if (!this.validator.validate('rating', rating)) {
            return { isValid: false, message: 'Rating must be between 1 and 5 stars' };
        }
        
        const stars = '⭐'.repeat(rating);
        return { isValid: true, message: `Valid rating: ${stars}` };
    }

    validateForm(formData) {
        this.formData = formData;
        this.validator.clearErrors();
        
        const results = {
            age: this.validateAge(formData.age),
            phone: this.validatePhone(formData.phone),
            zipCode: this.validateZipCode(formData.zipCode),
            rating: this.validateRating(formData.rating)
        };
        
        return {
            isValid: Object.values(results).every(r => r.isValid),
            results,
            errors: this.validator.getErrors()
        };
    }
}

// Test user registration
const registrationForm = new UserRegistrationForm();

const testUsers = [
    { age: 15, phone: 1234567890, zipCode: 12345, rating: 4 },
    { age: 10, phone: 123456789, zipCode: 1234, rating: 6 },
    { age: 25, phone: 9876543210, zipCode: 54321, rating: 3 }
];

testUsers.forEach((user, index) => {
    console.log(`   User ${index + 1}:`);
    const result = registrationForm.validateForm(user);
    
    Object.entries(result.results).forEach(([field, validation]) => {
        const status = validation.isValid ? '✅' : '❌';
        console.log(`     ${field}: ${status} ${validation.message}`);
    });
    
    console.log(`   Overall: ${result.isValid ? '✅ Valid' : '❌ Invalid'}\n`);
});

// ============================================================================
// 3. E-commerce Product Form
// ============================================================================
console.log('\n🛒 3. E-commerce Product Form:');
console.log('==============================');

class ProductForm {
    constructor() {
        this.validator = new FormValidation();
    }

    validatePrice(price) {
        if (!this.validator.validate('price', price)) {
            return { isValid: false, message: 'Price must be between $0 and $10,000' };
        }
        
        let category = '';
        if (price.isInRange(0, 10)) category = 'Budget';
        else if (price.isInRange(10, 50)) category = 'Affordable';
        else if (price.isInRange(50, 200)) category = 'Mid-range';
        else if (price.isInRange(200, 1000)) category = 'Premium';
        else category = 'Luxury';
        
        return { isValid: true, message: `Valid price (${category} tier)` };
    }

    validateQuantity(quantity) {
        if (!this.validator.validate('quantity', quantity)) {
            return { isValid: false, message: 'Quantity must be between 1 and 1000' };
        }
        
        let stockStatus = '';
        if (quantity.isInRange(1, 10)) stockStatus = 'Low stock';
        else if (quantity.isInRange(11, 100)) stockStatus = 'In stock';
        else stockStatus = 'High stock';
        
        return { isValid: true, message: `Valid quantity (${stockStatus})` };
    }

    validateDiscount(discount) {
        if (!this.validator.validate('percentage', discount)) {
            return { isValid: false, message: 'Discount must be between 0% and 100%' };
        }
        
        let discountType = '';
        if (discount.isInRange(0, 10)) discountType = 'Small discount';
        else if (discount.isInRange(10, 25)) discountType = 'Medium discount';
        else if (discount.isInRange(25, 50)) discountType = 'Large discount';
        else discountType = 'Major discount';
        
        return { isValid: true, message: `Valid discount (${discountType})` };
    }

    validateForm(formData) {
        this.validator.clearErrors();
        
        const results = {
            price: this.validatePrice(formData.price),
            quantity: this.validateQuantity(formData.quantity),
            discount: this.validateDiscount(formData.discount)
        };
        
        return {
            isValid: Object.values(results).every(r => r.isValid),
            results,
            errors: this.validator.getErrors()
        };
    }
}

const productForm = new ProductForm();

const testProducts = [
    { price: 25.99, quantity: 50, discount: 15 },
    { price: -5, quantity: 0, discount: 150 },
    { price: 500, quantity: 2000, discount: 25 }
];

testProducts.forEach((product, index) => {
    console.log(`   Product ${index + 1}:`);
    const result = productForm.validateForm(product);
    
    Object.entries(result.results).forEach(([field, validation]) => {
        const status = validation.isValid ? '✅' : '❌';
        console.log(`     ${field}: ${status} ${validation.message}`);
    });
    
    console.log(`   Overall: ${result.isValid ? '✅ Valid' : '❌ Invalid'}\n`);
});

// ============================================================================
// 4. Real-time Validation System
// ============================================================================
console.log('\n⚡ 4. Real-time Validation System:');
console.log('==================================');

class RealTimeValidator {
    constructor() {
        this.validator = new FormValidation();
        this.validationHistory = [];
    }

    validateInput(field, value, options = {}) {
        const startTime = Date.now();
        
        let result;
        switch (field) {
            case 'temperature':
                result = this.validateTemperature(value, options);
                break;
            case 'score':
                result = this.validateScore(value, options);
                break;
            case 'percentage':
                result = this.validatePercentage(value, options);
                break;
            default:
                result = { isValid: false, message: 'Unknown field' };
        }
        
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        this.validationHistory.push({
            field,
            value,
            result,
            responseTime,
            timestamp: new Date()
        });
        
        return {
            ...result,
            responseTime,
            suggestions: this.getSuggestions(field, value, result)
        };
    }

    validateTemperature(temp, options = {}) {
        const { unit = 'celsius', strict = false } = options;
        
        let range, message;
        if (unit === 'celsius') {
            range = [-273.15, 100];
            message = 'Temperature must be between -273.15°C and 100°C';
        } else if (unit === 'fahrenheit') {
            range = [-459.67, 212];
            message = 'Temperature must be between -459.67°F and 212°F';
        } else {
            range = [0, 373.15];
            message = 'Temperature must be between 0K and 373.15K';
        }
        
        if (!this.validator.validate('temperature', temp, range)) {
            return { isValid: false, message };
        }
        
        let category = '';
        if (temp.isInRange(range[0], 0)) category = 'Freezing';
        else if (temp.isInRange(0, 20)) category = 'Cold';
        else if (temp.isInRange(20, 30)) category = 'Room temperature';
        else if (temp.isInRange(30, 50)) category = 'Warm';
        else category = 'Hot';
        
        return { isValid: true, message: `Valid temperature (${category})` };
    }

    validateScore(score, options = {}) {
        const { maxScore = 100, passingScore = 60 } = options;
        
        if (!this.validator.validate('percentage', score, [0, maxScore])) {
            return { isValid: false, message: `Score must be between 0 and ${maxScore}` };
        }
        
        let grade = '';
        if (score >= passingScore) {
            if (score >= maxScore * 0.9) grade = 'A';
            else if (score >= maxScore * 0.8) grade = 'B';
            else if (score >= maxScore * 0.7) grade = 'C';
            else grade = 'D';
        } else {
            grade = 'F';
        }
        
        const status = score >= passingScore ? 'Passing' : 'Failing';
        return { isValid: true, message: `Valid score: ${grade} (${status})` };
    }

    validatePercentage(percentage, options = {}) {
        if (!this.validator.validate('percentage', percentage)) {
            return { isValid: false, message: 'Percentage must be between 0% and 100%' };
        }
        
        let category = '';
        if (percentage.isInRange(0, 25)) category = 'Very Low';
        else if (percentage.isInRange(25, 50)) category = 'Low';
        else if (percentage.isInRange(50, 75)) category = 'Moderate';
        else if (percentage.isInRange(75, 90)) category = 'High';
        else category = 'Very High';
        
        return { isValid: true, message: `Valid percentage (${category})` };
    }

    getSuggestions(field, value, result) {
        if (result.isValid) return [];
        
        const suggestions = [];
        
        switch (field) {
            case 'temperature':
                if (value < -273.15) suggestions.push('Temperature cannot be below absolute zero');
                if (value > 100) suggestions.push('Consider using a different temperature scale');
                break;
            case 'score':
                if (value < 0) suggestions.push('Score cannot be negative');
                if (value > 100) suggestions.push('Score cannot exceed 100%');
                break;
            case 'percentage':
                if (value < 0) suggestions.push('Percentage cannot be negative');
                if (value > 100) suggestions.push('Percentage cannot exceed 100%');
                break;
        }
        
        return suggestions;
    }

    getValidationStats() {
        const total = this.validationHistory.length;
        const valid = this.validationHistory.filter(h => h.result.isValid).length;
        const avgResponseTime = this.validationHistory.reduce((sum, h) => sum + h.responseTime, 0) / total;
        
        return {
            total,
            valid,
            invalid: total - valid,
            successRate: total > 0 ? (valid / total * 100).toFixed(1) : 0,
            avgResponseTime: avgResponseTime.toFixed(2)
        };
    }
}

const realTimeValidator = new RealTimeValidator();

// Test real-time validation
const testInputs = [
    { field: 'temperature', value: 25, options: { unit: 'celsius' } },
    { field: 'temperature', value: -300, options: { unit: 'celsius' } },
    { field: 'score', value: 85, options: { maxScore: 100, passingScore: 60 } },
    { field: 'score', value: 150, options: { maxScore: 100, passingScore: 60 } },
    { field: 'percentage', value: 75 },
    { field: 'percentage', value: -10 }
];

testInputs.forEach((input, index) => {
    console.log(`   Input ${index + 1} (${input.field}):`);
    const result = realTimeValidator.validateInput(input.field, input.value, input.options);
    
    const status = result.isValid ? '✅' : '❌';
    console.log(`     ${status} ${result.message}`);
    console.log(`     Response time: ${result.responseTime}ms`);
    
    if (result.suggestions.length > 0) {
        console.log(`     Suggestions: ${result.suggestions.join(', ')}`);
    }
    console.log('');
});

// Show validation statistics
const stats = realTimeValidator.getValidationStats();
console.log(`   Validation Statistics:`);
console.log(`     Total validations: ${stats.total}`);
console.log(`     Success rate: ${stats.successRate}%`);
console.log(`     Average response time: ${stats.avgResponseTime}ms`);

// ============================================================================
// 5. Form Submission Handler
// ============================================================================
console.log('\n📤 5. Form Submission Handler:');
console.log('==============================');

class FormSubmissionHandler {
    constructor() {
        this.validator = new FormValidation();
        this.submissions = [];
    }

    async submitForm(formData, formType = 'general') {
        console.log(`   Processing ${formType} form submission...`);
        
        // Simulate validation delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const validationResult = this.validateFormData(formData, formType);
        
        if (validationResult.isValid) {
            const submission = {
                id: Date.now(),
                type: formType,
                data: formData,
                timestamp: new Date(),
                status: 'success'
            };
            
            this.submissions.push(submission);
            console.log(`   ✅ Form submitted successfully (ID: ${submission.id})`);
            
            return {
                success: true,
                submissionId: submission.id,
                message: 'Form submitted successfully'
            };
        } else {
            console.log(`   ❌ Form validation failed`);
            console.log(`   Errors: ${Object.values(validationResult.errors).join(', ')}`);
            
            return {
                success: false,
                errors: validationResult.errors,
                message: 'Please fix the validation errors'
            };
        }
    }

    validateFormData(formData, formType) {
        this.validator.clearErrors();
        
        switch (formType) {
            case 'user':
                return this.validateUserForm(formData);
            case 'product':
                return this.validateProductForm(formData);
            case 'survey':
                return this.validateSurveyForm(formData);
            default:
                return { isValid: false, errors: { general: 'Unknown form type' } };
        }
    }

    validateUserForm(data) {
        const validations = [
            this.validator.validate('age', data.age),
            this.validator.validate('phone', data.phone),
            this.validator.validate('zipCode', data.zipCode)
        ];
        
        return {
            isValid: validations.every(v => v),
            errors: this.validator.getErrors()
        };
    }

    validateProductForm(data) {
        const validations = [
            this.validator.validate('price', data.price),
            this.validator.validate('quantity', data.quantity),
            this.validator.validate('percentage', data.discount)
        ];
        
        return {
            isValid: validations.every(v => v),
            errors: this.validator.getErrors()
        };
    }

    validateSurveyForm(data) {
        const validations = [
            this.validator.validate('rating', data.satisfaction),
            this.validator.validate('percentage', data.recommendation),
            this.validator.validate('age', data.age)
        ];
        
        return {
            isValid: validations.every(v => v),
            errors: this.validator.getErrors()
        };
    }

    getSubmissionHistory() {
        return this.submissions.map(sub => ({
            id: sub.id,
            type: sub.type,
            status: sub.status,
            timestamp: sub.timestamp
        }));
    }
}

const submissionHandler = new FormSubmissionHandler();

// Test form submissions
const testSubmissions = [
    {
        type: 'user',
        data: { age: 25, phone: 1234567890, zipCode: 12345 }
    },
    {
        type: 'product',
        data: { price: 99.99, quantity: 50, discount: 20 }
    },
    {
        type: 'survey',
        data: { satisfaction: 4, recommendation: 85, age: 30 }
    }
];

(async () => {
    for (const submission of testSubmissions) {
        const result = await submissionHandler.submitForm(submission.data, submission.type);
        console.log(`   Result: ${result.message}\n`);
    }
    
    const history = submissionHandler.getSubmissionHistory();
    console.log(`   Submission History:`);
    history.forEach(sub => {
        console.log(`     ${sub.type}: ${sub.status} (${sub.timestamp.toLocaleTimeString()})`);
    });
})();

console.log('\n🎉 Form validation example completed successfully!');
console.log('📚 This example demonstrates real-world form validation scenarios');
console.log('   using the number-is-in-range package for robust input validation.'); 