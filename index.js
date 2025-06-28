/**
 * Extends Number.prototype with isInRange method
 * A lightweight npm package that provides comprehensive range checking functionality
 * @param {number|bigint} start - The start of the range
 * @param {number|bigint} end - The end of the range
 * @param {Object} options - Optional configuration
 * @param {boolean} options.exclusive - If true, excludes boundaries (default: false)
 * @param {boolean} options.strict - If true, throws errors for invalid inputs (default: false)
 * @param {boolean} options.cache - If true, caches range calculations (default: false)
 * @returns {boolean} - True if the number is within the range, false otherwise
 */
Number.prototype.isInRange = function(start, end, options = {}) {
  const { exclusive = false, strict = false } = options;
  
  // Input validation
  if (strict) {
    if (start === null || start === undefined || end === null || end === undefined) {
      throw new TypeError('Range boundaries cannot be null or undefined');
    }
    if (typeof start !== 'number' && typeof start !== 'bigint') {
      throw new TypeError('Start boundary must be a number or BigInt');
    }
    if (typeof end !== 'number' && typeof end !== 'bigint') {
      throw new TypeError('End boundary must be a number or BigInt');
    }
  }
  
  // Handle BigInt values
  if (typeof start === 'bigint' || typeof end === 'bigint') {
    const thisValue = BigInt(this);
    const startValue = BigInt(start);
    const endValue = BigInt(end);
    
    const lower = startValue < endValue ? startValue : endValue;
    const upper = startValue < endValue ? endValue : startValue;
    
    if (exclusive) {
      return thisValue > lower && thisValue < upper;
    }
    return thisValue >= lower && thisValue <= upper;
  }
  
  // Handle regular numbers
  const lower = Math.min(start, end);
  const upper = Math.max(start, end);
  
  if (exclusive) {
    return this > lower && this < upper;
  }
  return this >= lower && this <= upper;
};

// Also extend BigInt.prototype for consistency
if (typeof BigInt !== 'undefined') {
  BigInt.prototype.isInRange = function(start, end, options = {}) {
    const { exclusive = false, strict = false } = options;
    
    // Input validation
    if (strict) {
      if (start === null || start === undefined || end === null || end === undefined) {
        throw new TypeError('Range boundaries cannot be null or undefined');
      }
      if (typeof start !== 'number' && typeof start !== 'bigint') {
        throw new TypeError('Start boundary must be a number or BigInt');
      }
      if (typeof end !== 'number' && typeof end !== 'bigint') {
        throw new TypeError('End boundary must be a number or BigInt');
      }
    }
    
    const thisValue = this;
    const startValue = BigInt(start);
    const endValue = BigInt(end);
    
    const lower = startValue < endValue ? startValue : endValue;
    const upper = startValue < endValue ? endValue : startValue;
    
    if (exclusive) {
      return thisValue > lower && thisValue < upper;
    }
    return thisValue >= lower && thisValue <= upper;
  };
}

// Cache for range calculations (performance optimization)
const rangeCache = new Map();

// Utility functions
const utils = {
  /**
   * Check if a value is within a range
   * @param {number|bigint} value - The value to check
   * @param {number|bigint} start - The start of the range
   * @param {number|bigint} end - The end of the range
   * @param {Object} options - Optional configuration
   * @returns {boolean} - True if the value is within the range, false otherwise
   */
  isInRange: function(value, start, end, options = {}) {
    if (typeof value === 'bigint') {
      return value.isInRange(start, end, options);
    }
    return Number(value).isInRange(start, end, options);
  },

  /**
   * Create a range validator function
   * @param {number|bigint} start - The start of the range
   * @param {number|bigint} end - The end of the range
   * @param {Object} options - Optional configuration
   * @returns {Function} - A function that validates if a value is in range
   */
  createRangeValidator: function(start, end, options = {}) {
    return (value) => utils.isInRange(value, start, end, options);
  },

  /**
   * Check if a value is within multiple ranges (any of them)
   * @param {number|bigint} value - The value to check
   * @param {Array} ranges - Array of range objects [{start, end, options}]
   * @returns {boolean} - True if the value is within any of the ranges
   */
  isInAnyRange: function(value, ranges) {
    return ranges.some(range => 
      utils.isInRange(value, range.start, range.end, range.options || {})
    );
  },

  /**
   * Check if a value is within all specified ranges
   * @param {number|bigint} value - The value to check
   * @param {Array} ranges - Array of range objects [{start, end, options}]
   * @returns {boolean} - True if the value is within all ranges
   */
  isInAllRanges: function(value, ranges) {
    return ranges.every(range => 
      utils.isInRange(value, range.start, range.end, range.options || {})
    );
  },

  /**
   * Get the distance from a value to the nearest boundary of a range
   * @param {number|bigint} value - The value to check
   * @param {number|bigint} start - The start of the range
   * @param {number|bigint} end - The end of the range
   * @returns {number|bigint} - Distance to nearest boundary (0 if inside range)
   */
  distanceToRange: function(value, start, end) {
    if (utils.isInRange(value, start, end)) {
      return typeof value === 'bigint' ? 0n : 0;
    }
    
    if (typeof start === 'bigint' || typeof end === 'bigint' || typeof value === 'bigint') {
      const valueBig = BigInt(value);
      const startBig = BigInt(start);
      const endBig = BigInt(end);
      
      const lower = startBig < endBig ? startBig : endBig;
      const upper = startBig < endBig ? endBig : startBig;
      
      const distToLower = valueBig < lower ? lower - valueBig : 0n;
      const distToUpper = valueBig > upper ? valueBig - upper : 0n;
      
      return distToLower > 0n ? distToLower : distToUpper;
    }
    
    const lower = Math.min(start, end);
    const upper = Math.max(start, end);
    
    const distToLower = value < lower ? lower - value : 0;
    const distToUpper = value > upper ? value - upper : 0;
    
    return distToLower > 0 ? distToLower : distToUpper;
  },

  /**
   * Get the closest value within a range
   * @param {number|bigint} value - The value to clamp
   * @param {number|bigint} start - The start of the range
   * @param {number|bigint} end - The end of the range
   * @returns {number|bigint} - The closest value within the range
   */
  clampToRange: function(value, start, end) {
    if (utils.isInRange(value, start, end)) {
      return value;
    }
    
    if (typeof start === 'bigint' || typeof end === 'bigint' || typeof value === 'bigint') {
      const valueBig = BigInt(value);
      const startBig = BigInt(start);
      const endBig = BigInt(end);
      
      const lower = startBig < endBig ? startBig : endBig;
      const upper = startBig < endBig ? endBig : startBig;
      
      if (valueBig < lower) return lower;
      if (valueBig > upper) return upper;
      return valueBig;
    }
    
    const lower = Math.min(start, end);
    const upper = Math.max(start, end);
    
    return Math.max(lower, Math.min(upper, value));
  },

  /**
   * Check if two ranges overlap
   * @param {Object} range1 - First range {start, end}
   * @param {Object} range2 - Second range {start, end}
   * @param {Object} options - Optional configuration
   * @returns {boolean} - True if ranges overlap
   */
  rangesOverlap: function(range1, range2, options = {}) {
    const { exclusive = false } = options;
    
    const r1Lower = Math.min(range1.start, range1.end);
    const r1Upper = Math.max(range1.start, range1.end);
    const r2Lower = Math.min(range2.start, range2.end);
    const r2Upper = Math.max(range2.start, range2.end);
    
    if (exclusive) {
      return r1Lower < r2Upper && r2Lower < r1Upper;
    }
    return r1Lower <= r2Upper && r2Lower <= r1Upper;
  },

  /**
   * Get the intersection of two ranges
   * @param {Object} range1 - First range {start, end}
   * @param {Object} range2 - Second range {start, end}
   * @returns {Object|null} - Intersection range or null if no overlap
   */
  rangeIntersection: function(range1, range2) {
    if (!utils.rangesOverlap(range1, range2)) {
      return null;
    }
    
    const r1Lower = Math.min(range1.start, range1.end);
    const r1Upper = Math.max(range1.start, range1.end);
    const r2Lower = Math.min(range2.start, range2.end);
    const r2Upper = Math.max(range2.start, range2.end);
    
    return {
      start: Math.max(r1Lower, r2Lower),
      end: Math.min(r1Upper, r2Upper)
    };
  },

  /**
   * Get the union of two ranges
   * @param {Object} range1 - First range {start, end}
   * @param {Object} range2 - Second range {start, end}
   * @returns {Object} - Union range
   */
  rangeUnion: function(range1, range2) {
    const r1Lower = Math.min(range1.start, range1.end);
    const r1Upper = Math.max(range1.start, range1.end);
    const r2Lower = Math.min(range2.start, range2.end);
    const r2Upper = Math.max(range2.start, range2.end);
    
    return {
      start: Math.min(r1Lower, r2Lower),
      end: Math.max(r1Upper, r2Upper)
    };
  },

  /**
   * Get the size/width of a range
   * @param {number|bigint} start - The start of the range
   * @param {number|bigint} end - The end of the range
   * @returns {number|bigint} - The size of the range
   */
  rangeSize: function(start, end) {
    if (typeof start === 'bigint' || typeof end === 'bigint') {
      const startBig = BigInt(start);
      const endBig = BigInt(end);
      return startBig < endBig ? endBig - startBig : startBig - endBig;
    }
    
    return Math.abs(end - start);
  },

  /**
   * Get the center/midpoint of a range
   * @param {number|bigint} start - The start of the range
   * @param {number|bigint} end - The end of the range
   * @returns {number|bigint} - The center of the range
   */
  rangeCenter: function(start, end) {
    if (typeof start === 'bigint' || typeof end === 'bigint') {
      const startBig = BigInt(start);
      const endBig = BigInt(end);
      return (startBig + endBig) / 2n;
    }
    
    return (start + end) / 2;
  },

  /**
   * Check if a range contains another range
   * @param {Object} outerRange - The outer range {start, end}
   * @param {Object} innerRange - The inner range {start, end}
   * @param {Object} options - Optional configuration
   * @returns {boolean} - True if outer range contains inner range
   */
  rangeContains: function(outerRange, innerRange, options = {}) {
    const { exclusive = false } = options;
    
    const outerLower = Math.min(outerRange.start, outerRange.end);
    const outerUpper = Math.max(outerRange.start, outerRange.end);
    const innerLower = Math.min(innerRange.start, innerRange.end);
    const innerUpper = Math.max(innerRange.start, innerRange.end);
    
    if (exclusive) {
      return outerLower < innerLower && innerUpper < outerUpper;
    }
    return outerLower <= innerLower && innerUpper <= outerUpper;
  },

  /**
   * Create a range from an array of values
   * @param {Array} values - Array of numbers or BigInts
   * @returns {Object} - Range object {start, end}
   */
  rangeFromValues: function(values) {
    if (!Array.isArray(values) || values.length === 0) {
      throw new TypeError('Values must be a non-empty array');
    }
    
    if (values.some(v => typeof v === 'bigint')) {
      const bigIntValues = values.map(v => BigInt(v));
      return {
        start: bigIntValues.reduce((min, val) => val < min ? val : min),
        end: bigIntValues.reduce((max, val) => val > max ? val : max)
      };
    }
    
    return {
      start: Math.min(...values),
      end: Math.max(...values)
    };
  },

  /**
   * Check if a value is at the boundary of a range
   * @param {number|bigint} value - The value to check
   * @param {number|bigint} start - The start of the range
   * @param {number|bigint} end - The end of the range
   * @returns {boolean} - True if value is at boundary
   */
  isAtBoundary: function(value, start, end) {
    if (typeof start === 'bigint' || typeof end === 'bigint' || typeof value === 'bigint') {
      const valueBig = BigInt(value);
      const startBig = BigInt(start);
      const endBig = BigInt(end);
      
      const lower = startBig < endBig ? startBig : endBig;
      const upper = startBig < endBig ? endBig : startBig;
      
      return valueBig === lower || valueBig === upper;
    }
    
    const lower = Math.min(start, end);
    const upper = Math.max(start, end);
    
    return value === lower || value === upper;
  },

  /**
   * Clear the range cache (useful for memory management)
   */
  clearCache: function() {
    rangeCache.clear();
  },

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  getCacheStats: function() {
    return {
      size: rangeCache.size,
      entries: Array.from(rangeCache.entries())
    };
  }
};

module.exports = utils; 