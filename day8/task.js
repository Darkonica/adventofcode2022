const fs = require('fs');
const path = require("path");

const input = getInput('input').split('\n').map(line => line.split('').map(tree => Number(tree)));

let visibleTreesCount = 0;

for (let i = 1; i < input.length; i++) {
    for (let k = 1; k < input[0].length; k++) {
        const currentTree = input[i][k];

        let lineFromTopToBottom = [];
        for (let m = 0; m < input.length; m++) {
            lineFromTopToBottom.push(input[m][k]);
        }

        const rightSideVisibility = !!input[i].slice(k + 1).filter(item => item >= currentTree).length;
        const leftSideVisibility = !!input[i].slice(0, k).filter(item => item >= currentTree).length;
        const topSideVisibility = !!lineFromTopToBottom.slice(0, i).filter(item => item >= currentTree).length;
        const bottomSideVisibility = !!lineFromTopToBottom.slice(i + 1).filter(item => item >= currentTree).length;

        if (topSideVisibility && rightSideVisibility && bottomSideVisibility && leftSideVisibility) visibleTreesCount++;
    }
}

console.log(99 * 99 - visibleTreesCount);

function getInput(fileName) {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './' + fileName + '.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}