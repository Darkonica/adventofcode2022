const fs = require('fs');
const path = require("path");

const input = getInput().split('\n');

// console.log(input);
let totalScore = 0;

// it can be much more optimized, but I'm a bit lazy right now
for (let i = 0; i < input.length; i += + 3) {
    const firstBackpack = input[i].split('');
    const secondBackpack = input[i+1].split('');
    const thirdBackpack = input[i+2].split('');

    const commonSymbol = firstBackpack.filter(item => secondBackpack.includes(item) && thirdBackpack.includes(item))[0];

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