/**
 * 1. Inputs - Weather Data
 * 2. Forward Propagation
 * 3. Outputs - 
 */

const num = -1231
const k = 1000

function sigmoid(x) {
    const sigmoid = 1/ (1 + Math.exp(-x/k))
    console.log(sigmoid)
    return sigmoid
}

sigmoid(num)

