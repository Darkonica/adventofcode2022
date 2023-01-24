const fs = require('fs');
const path = require("path");

// remove last line *
// remove [ and ] *
// replace 4 spaces for 1 *
// split by 1 space *
const preparedMatrix = getInput('input-matrix')
                .split('\n')
                .slice(0, -1)
                .map(line => line.replace(/(\[|\])/g, '').replace(/\s{4}/g, ' ').split(' '));

// prepare empty matrix
// 90 degrees rotate, will be much easier to work with
let matrix = Array(preparedMatrix[0].length).fill().map(() => []);

for (let i = 0; i < preparedMatrix.length; i++) {
    for (let k = 0; k < preparedMatrix[0].length; k++) {
        const item = preparedMatrix[preparedMatrix.length - i - 1][k];

        if (item) {
            matrix[k].push(item);
        }
    }
}

// Convert to three numbers as an array
const input = getInput('input')
                .split('\n')
                .map(line => line.split(' ').filter(item => /\d/.test(item)).map(item => Number(item)));


// Let's make all necessary moves
for (let i = 0; i < input.length; i++) {
    const amountToMove = input[i][0];
    const fromStack = input[i][1] - 1;
    const toStack = input[i][2] - 1;

    const cratesToMove = matrix[fromStack].splice(-amountToMove).reverse();
    matrix[toStack].push(...cratesToMove);
}

let topCrates = matrix.map(item => item[item.length - 1]).join('');

console.log(topCrates);

function getInput(fileName) {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './' + fileName + '.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}