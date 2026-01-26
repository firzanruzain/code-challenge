

class SumToN {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    calculate(n) {
        throw new Error("calculate() must be implemented by subclass");
    }

    _measureSingleExecution(n) {
        let start = performance.now();
        let result = this.calculate(n);
        let end = performance.now();
        return { result, time: end - start };
    }

    getStats(n, iterations = 1) {
        try {
            if (iterations === 1) {
                const { result, time } = this._measureSingleExecution(n);
                return { name: this.name, description: this.description, result, time, iterations: 1 };
            } else {
                let times = [];
                let result;
                
                for (let i = 0; i < iterations; i++) {
                    const execution = this._measureSingleExecution(n);
                    result = execution.result;
                    times.push(execution.time);
                }
                
                const average = times.reduce((sum, time) => sum + time, 0) / iterations;
                const min = Math.min(...times);
                const max = Math.max(...times);
                
                return { 
                    name: this.name, 
                    description: this.description, 
                    result, 
                    time: average, 
                    iterations,
                    min,
                    max
                };
            }
        } catch (error) {
            return { name: this.name, description: this.description, error: error.message, time: Infinity };
        }
    }
}

class SumToN_A extends SumToN {
    constructor() {
        super("method A", "Iterative approach using for loop - O(n) time, O(1) space");
    }

    calculate(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    }
}

class SumToN_B extends SumToN {
    constructor() {
        super("method B", "Mathematical formula n(n+1)/2 - O(1) time, O(1) space");
    }

    calculate(n) {
        return n * (n + 1) / 2;
    }
}

class SumToN_C extends SumToN {
    constructor() {
        super("method C", "Functional array-based using reduce - O(n) time, O(n) space");
    }

    calculate(n) {
        return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, num) => acc + num, 0);
    }
}

const methods = [
    new SumToN_A(),
    new SumToN_B(),
    new SumToN_C()
];

// Export functions for backward compatibility
var sum_to_n_a = (n) => methods[0].calculate(n);
var sum_to_n_b = (n) => methods[1].calculate(n);
var sum_to_n_c = (n) => methods[2].calculate(n);

function main() {
    var n = 100;
    var iterations = 1;
    input = process.argv.slice(2);
    
    if (input.length >= 1) {
        n = parseInt(input[0]);
    }
    if (input.length >= 2) {
        iterations = parseInt(input[1]);
    }
    
    if (input.length === 0) {
        console.log("Usage: node sum-to-n.js [n] [iterations]");
        console.log("Defaulting to n =", n, "and iterations =", iterations);
    }
    
    // Validate input early
    if (n < 0) {
        console.log("Error: n must be a non-negative integer");
        return;
    }
    
    console.log("\n=== Performance Comparison ===\n");
    
    // Collect stats from all methods
    const results = methods.map(method => method.getStats(n, iterations));
    
    // Print individual results
    results.forEach(stat => {
        if (stat.error) {
            console.log(`${stat.name}: ${stat.error}`);
        } else {
            console.log(`\n${stat.name}: ${stat.description}`);
            console.log(`  Result: ${stat.result}`);
            if (iterations === 1) {
                console.log(`  Time: ${stat.time.toFixed(4)} ms`);
            } else {
                console.log(`  Iterations: ${stat.iterations}`);
                console.log(`  Average: ${stat.time.toFixed(4)} ms`);
                console.log(`  Min: ${stat.min.toFixed(4)} ms`);
                console.log(`  Max: ${stat.max.toFixed(4)} ms`);
            }
        }
    });
    
    // Display ranking
    console.log("\n=== Performance Ranking ===\n");
    const sorted = [...results].sort((a, b) => a.time - b.time);
    sorted.forEach((stat, index) => {
        const unit = iterations === 1 ? "ms" : "ms (avg)";
        console.log(`${index + 1}. ${stat.name}: ${stat.time.toFixed(4)} ${unit}`);
    });
}

if (require.main === module) {
    main();
}

module.exports = {
    sum_to_n_a,
    sum_to_n_b,
    sum_to_n_c
};