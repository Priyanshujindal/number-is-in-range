declare global {
  interface Number {
    /**
     * Checks if a number is within a given range (inclusive by default)
     * @param start - The start of the range
     * @param end - The end of the range
     * @param options - Optional configuration
     * @param options.exclusive - If true, excludes boundaries (default: false)
     * @param options.strict - If true, throws errors for invalid inputs (default: false)
     * @param options.cache - If true, caches range calculations (default: false)
     * @returns True if the number is within the range, false otherwise
     */
    isInRange(start: number | bigint, end: number | bigint, options?: RangeOptions): boolean;
  }
  
  interface BigInt {
    /**
     * Checks if a BigInt is within a given range (inclusive by default)
     * @param start - The start of the range
     * @param end - The end of the range
     * @param options - Optional configuration
     * @param options.exclusive - If true, excludes boundaries (default: false)
     * @param options.strict - If true, throws errors for invalid inputs (default: false)
     * @param options.cache - If true, caches range calculations (default: false)
     * @returns True if the BigInt is within the range, false otherwise
     */
    isInRange(start: number | bigint, end: number | bigint, options?: RangeOptions): boolean;
  }
}

export interface RangeOptions {
  /** If true, excludes boundaries (default: false) */
  exclusive?: boolean;
  /** If true, throws errors for invalid inputs (default: false) */
  strict?: boolean;
  /** If true, caches range calculations (default: false) */
  cache?: boolean;
}

export interface RangeDefinition {
  start: number | bigint;
  end: number | bigint;
  options?: RangeOptions;
}

export interface Range {
  start: number | bigint;
  end: number | bigint;
}

export interface CacheStats {
  size: number;
  entries: [string, any][];
}

export interface IsInRangeModule {
  /**
   * Utility function to check if a value is within a range
   * @param value - The value to check
   * @param start - The start of the range
   * @param end - The end of the range
   * @param options - Optional configuration
   * @returns True if the value is within the range, false otherwise
   */
  isInRange(value: number | bigint, start: number | bigint, end: number | bigint, options?: RangeOptions): boolean;

  /**
   * Create a range validator function
   * @param start - The start of the range
   * @param end - The end of the range
   * @param options - Optional configuration
   * @returns A function that validates if a value is in range
   */
  createRangeValidator(start: number | bigint, end: number | bigint, options?: RangeOptions): (value: number | bigint) => boolean;

  /**
   * Check if a value is within multiple ranges (any of them)
   * @param value - The value to check
   * @param ranges - Array of range objects
   * @returns True if the value is within any of the ranges
   */
  isInAnyRange(value: number | bigint, ranges: RangeDefinition[]): boolean;

  /**
   * Check if a value is within all specified ranges
   * @param value - The value to check
   * @param ranges - Array of range objects
   * @returns True if the value is within all ranges
   */
  isInAllRanges(value: number | bigint, ranges: RangeDefinition[]): boolean;

  /**
   * Get the distance from a value to the nearest boundary of a range
   * @param value - The value to check
   * @param start - The start of the range
   * @param end - The end of the range
   * @returns Distance to nearest boundary (0 if inside range)
   */
  distanceToRange(value: number | bigint, start: number | bigint, end: number | bigint): number | bigint;

  /**
   * Get the closest value within a range
   * @param value - The value to clamp
   * @param start - The start of the range
   * @param end - The end of the range
   * @returns The closest value within the range
   */
  clampToRange(value: number | bigint, start: number | bigint, end: number | bigint): number | bigint;

  /**
   * Check if two ranges overlap
   * @param range1 - First range
   * @param range2 - Second range
   * @param options - Optional configuration
   * @returns True if ranges overlap
   */
  rangesOverlap(range1: Range, range2: Range, options?: RangeOptions): boolean;

  /**
   * Get the intersection of two ranges
   * @param range1 - First range
   * @param range2 - Second range
   * @returns Intersection range or null if no overlap
   */
  rangeIntersection(range1: Range, range2: Range): Range | null;

  /**
   * Get the union of two ranges
   * @param range1 - First range
   * @param range2 - Second range
   * @returns Union range
   */
  rangeUnion(range1: Range, range2: Range): Range;

  /**
   * Get the size/width of a range
   * @param start - The start of the range
   * @param end - The end of the range
   * @returns The size of the range
   */
  rangeSize(start: number | bigint, end: number | bigint): number | bigint;

  /**
   * Get the center/midpoint of a range
   * @param start - The start of the range
   * @param end - The end of the range
   * @returns The center of the range
   */
  rangeCenter(start: number | bigint, end: number | bigint): number | bigint;

  /**
   * Check if a range contains another range
   * @param outerRange - The outer range
   * @param innerRange - The inner range
   * @param options - Optional configuration
   * @returns True if outer range contains inner range
   */
  rangeContains(outerRange: Range, innerRange: Range, options?: RangeOptions): boolean;

  /**
   * Create a range from an array of values
   * @param values - Array of numbers or BigInts
   * @returns Range object
   */
  rangeFromValues(values: (number | bigint)[]): Range;

  /**
   * Check if a value is at the boundary of a range
   * @param value - The value to check
   * @param start - The start of the range
   * @param end - The end of the range
   * @returns True if value is at boundary
   */
  isAtBoundary(value: number | bigint, start: number | bigint, end: number | bigint): boolean;

  /**
   * Clear the range cache (useful for memory management)
   */
  clearCache(): void;

  /**
   * Get cache statistics
   * @returns Cache statistics
   */
  getCacheStats(): CacheStats;
}

declare const module: IsInRangeModule;
export = module; 