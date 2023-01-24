const fs = require('fs');
const path = require("path");

const input = getInput('input');

let checkUniqueObj = {};
let count = 0;
let result;

for (let i = 0; i < input.length; i++) {
    if (!checkUniqueObj[input[i]]) {
        checkUniqueObj[input[i]] = true;
        count++;
    } else {
        checkUniqueObj = {};
        count = 0;
    }
    if (count === 4) {
        result = i;
        break;
    }
}

console.log(result);

function getInput(fileName) {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './' + fileName + '.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}