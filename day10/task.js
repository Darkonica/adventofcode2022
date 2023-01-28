const fs = require('fs');
const path = require("path");

const input = getInput('input').split('\n').map(item => item.split(' '));

// noop -- 1 cycle
// addx -- 2 cycles

let sumOfStrengths = 0;
let cycleCount = 1;
let register = 1;

for (let i = 0; i < input.length; i++) {
    const instruction = input[i][0];
    const registerChange = Number(input[i]?.[1]) || 0;
    
    let cycleSkips = instruction === 'addx' ? 2 : 1;
    
    while (cycleSkips) {
        switch (cycleCount) {
            case 20:
            case 60:
            case 100:
            case 140:
            case 180:
            case 220: {
                sumOfStrengths += cycleCount * register;
            }
            default: {
                
            }
        }
        cycleSkips--;
        cycleCount++;
        console.log(cycleCount, register);
    }


    register += registerChange;
}

console.log(sumOfStrengths);

function getInput(fileName) {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './' + fileName + '.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}