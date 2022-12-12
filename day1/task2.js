const fs = require('fs');
const path = require("path");

const input = getInput().split('\n\n').map(item => item.split('\n'));

const startTime = performance.now();
// console.log(input);
const calculatedSums = input.map(item => item.reduce((acc, numb) => acc + Number(numb), 0)).sort((a, b) => b - a);
const result = calculatedSums.slice(0, 3).reduce((acc, item) => acc + item, 0);

const endTime = performance.now();
console.log(`Execution time: ${endTime - startTime} ms`);

console.log(result);






function getInput() {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}