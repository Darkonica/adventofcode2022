const fs = require('fs');
const path = require("path");

const input = getInput('input').split('\n').map(item => item.split(' '));

// noop -- 1 cycle
// addx -- 2 cycles

// 40x6
const crtMatrix = [];
for (let i = 0; i < 6; i++) {
    crtMatrix.push(new Array(40).fill(' '));
}

let currentPixel = 0;
let currentRow = 0;
// ### position, number is a middle of three pixels
let register = [0, 1, 2];

for (let i = 0; i < input.length; i++) {
    const instruction = input[i][0];
    const registerChange = Number(input[i]?.[1]) || 0;
    
    let cycleSkips = instruction === 'addx' ? 2 : 1;
    
    while (cycleSkips) {
        // condition if current pixel must be lit
        crtMatrix[currentRow][currentPixel] = register.includes(currentPixel) ? '#' : '.';

        cycleSkips--;

        if (currentPixel === 39) {
            currentPixel = 0;
            currentRow++;
        } else {
            currentPixel++;
        }
    }

    register = register.map(item => item + registerChange);
}

crtMatrix.forEach(item => console.log(item));

function getInput(fileName) {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './' + fileName + '.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}