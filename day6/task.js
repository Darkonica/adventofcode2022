const fs = require('fs');
const path = require("path");

const input = getInput('input');

const SUBSTRING_LENGTH = 4;

let result;

for (let i = 0; i < input.length; i++) {
    const substring = input.slice(i, i + SUBSTRING_LENGTH);
    if (new Set(substring).size === SUBSTRING_LENGTH) {
        result = i + SUBSTRING_LENGTH;
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