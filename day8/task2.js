const fs = require('fs');
const path = require("path");

const input = getInput('input').split('\n').map(line => line.split('').map(tree => Number(tree)));

function findVisibilityScoreForDirection(arr, currentTree) {
    const score = arr.findIndex(tree => tree >= currentTree) + 1;
    return score || arr.length;
}

let maxScenicScore = 0;

for (let i = 1; i < input.length - 1; i++) {
    for (let k = 1; k < input[0].length - 1; k++) {
        const currentTree = input[i][k];

        let lineFromTopToBottom = [];
        for (let m = 0; m < input.length; m++) {
            lineFromTopToBottom.push(input[m][k]);
        }

        const rightSideVisibility = findVisibilityScoreForDirection(input[i].slice(k + 1), currentTree);
        const leftSideVisibility = findVisibilityScoreForDirection(input[i].slice(0, k).reverse(), currentTree);
        const topSideVisibility = findVisibilityScoreForDirection(lineFromTopToBottom.slice(0, i).reverse(), currentTree);
        const bottomSideVisibility = findVisibilityScoreForDirection(lineFromTopToBottom.slice(i + 1), currentTree);

        const scenicScore = rightSideVisibility * leftSideVisibility * topSideVisibility * bottomSideVisibility;

        if (scenicScore > maxScenicScore) maxScenicScore = scenicScore;

    }
}

console.log(maxScenicScore);

function getInput(fileName) {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './' + fileName + '.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}