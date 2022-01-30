const matColors = require('../matdesigncolorsJSON.json')
// random numbers between 0 and 99
let randomNumberSeed = Math.floor(Math.random() * 100) + 1
let iterations = 0;
let randomNumber = -1;
while (randomNumber !== randomNumberSeed) {
    randomNumber = Math.floor(Math.random() * 100) + 1
    process.stdout.write(`${randomNumber},`)
    iterations++
}
console.log(`\nit took ${iterations} iterations to randomly re-generate the random number ${randomNumberSeed}`)

// random color generator from material design color file
let coloridx = Math.floor(Math.random() * matColors.colors.length ) + 1
console.log(matColors.colors[coloridx])