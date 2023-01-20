const fs = require('fs');
const path = require("path");

const input = getInput().split('\n');

// console.log(input);
let totalScore = 0;

for (let i = 0; i < input.length; i++) {
    const firstBackpack = input[i].slice(0, input[i].length / 2);
    const secondBackpack = input[i].slice(input[i].length / 2);

    const commonSymbol = firstBackpack.split('').filter(item => secondBackpack.indexOf(item) !== -1)[0];
    const charCode = commonSymbol.charCodeAt(0);
    const priority = /[a-z]/.test(commonSymbol) ? charCode - 96 : charCode - 38;

    totalScore += priority;
}


console.log(totalScore);






function getInput() {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}