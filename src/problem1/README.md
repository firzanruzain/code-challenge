# Problem 1: Sum to N

## Problem Description

Provide 3 unique implementations of a function that calculates the summation to `n`.

**Input**: `n` - any integer

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`

**Constraint**: Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`.

## Solution Overview

Three distinct approaches to solving the summation problem:

### Method A: Iterative Approach
Uses a traditional `for` loop to accumulate the sum from 1 to n.

```javascript
calculate(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

### Method B: Mathematical Formula
Uses the closed-form formula: `n × (n + 1) / 2`

```javascript
calculate(n) {
    return n * (n + 1) / 2;
}
```

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Method C: Functional Array-Based
Creates an array of numbers and uses `reduce()` to calculate the sum.

```javascript
calculate(n) {
    return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, num) => acc + num, 0);
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(n) - requires array allocation

## Time Complexity Comparison

| Method | Time | Space | Notes |
|--------|------|-------|-------|
| A (Iterative) | O(n) | O(1) | Simple and space-efficient |
| B (Formula) | O(1) | O(1) | Fastest - constant time |
| C (Functional) | O(n) | O(n) | Demonstrates functional paradigm |

## How to Run

### Basic Usage

Run with default parameters (n=100, single iteration):

```bash
node src/problem1/sum-to-n.js
```

### With Custom Input

Specify the value of `n`:

```bash
node src/problem1/sum-to-n.js 1000
```

### Performance Benchmarking

Run multiple iterations to measure average performance:

```bash
node src/problem1/sum-to-n.js 1000000 100
```

This will:
- Calculate sum to 1,000,000
- Run 100 iterations for each method
- Display average, minimum, and maximum times
- Rank methods by performance

### Examples

**Example 1: Single run with n=100**
```bash
$ node src/problem1/sum-to-n.js 100

=== Performance Comparison ===

method A: Iterative approach using for loop - O(n) time, O(1) space
  Result: 5050
  Time: 0.0123 ms

method B: Mathematical formula n(n+1)/2 - O(1) time, O(1) space
  Result: 5050
  Time: 0.0045 ms

method C: Functional array-based using reduce - O(n) time, O(n) space
  Result: 5050
  Time: 0.0234 ms

=== Performance Ranking ===

1. method B: 0.0045 ms
2. method A: 0.0123 ms
3. method C: 0.0234 ms
```

**Example 2: Benchmark with n=1,000,000 and 100 iterations**
```bash
$ node src/problem1/sum-to-n.js 1000000 100

=== Performance Comparison ===

method A: Iterative approach using for loop - O(n) time, O(1) space
  Result: 500000500000
  Iterations: 100
  Average: 2.5432 ms
  Min: 2.1234 ms
  Max: 3.8901 ms

method B: Mathematical formula n(n+1)/2 - O(1) time, O(1) space
  Result: 500000500000
  Iterations: 100
  Average: 0.0087 ms
  Min: 0.0045 ms
  Max: 0.0234 ms

method C: Functional array-based using reduce - O(n) time, O(n) space
  Result: 500000500000
  Iterations: 100
  Average: 5.6234 ms
  Min: 5.1234 ms
  Max: 7.8901 ms

=== Performance Ranking ===

1. method B: 0.0087 ms (avg)
2. method A: 2.5432 ms (avg)
3. method C: 5.6234 ms (avg)
```

## Function Exports

All three implementations are exported as CommonJS modules:

```javascript
const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require('./sum-to-n.js');

console.log(sum_to_n_a(5));  // 15
console.log(sum_to_n_b(5));  // 15
console.log(sum_to_n_c(5));  // 15
```

## Key Insights

1. **Formula is Fastest**: Method B is dramatically faster due to constant-time complexity, regardless of input size.

2. **Space Trade-off**: Method C demonstrates a classic space-time trade-off—it's more concise and functional but uses extra memory.

3. **JIT Warmup Effects**: When running benchmarks, you may notice larger variance in the first few iterations due to JavaScript JIT (Just-In-Time) compilation optimization. Running multiple iterations helps average out these effects.

4. **Practical Preference**: While Method B is theoretically and practically the best, each approach has value:
   - Method A: Clear, traditional, widely understood
   - Method B: Optimal performance
   - Method C: Functional programming pattern, demonstrates array methods

## Implementation Notes

- Input validation: Negative values return 0
- All methods produce identical results
- Performance benchmarking uses `performance.now()` for high-resolution timing
- Results are valid for any safe integer (< `Number.MAX_SAFE_INTEGER`)
