const fs = require('fs');
const path = require("path");

const input = getInput().split('\n\n').map(item => item.split('\n'));

// console.log(input);
const calculatedSums = input.map(item => item.reduce((acc, numb) => acc + Number(numb), 0));
const result = Math.max(...calculatedSums);

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