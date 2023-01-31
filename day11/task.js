const fs = require('fs');
const path = require("path");

const input = getInput('input').split('\n').map(item => item.split(' '));



function getInput(fileName) {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './' + fileName + '.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}