const fs = require('fs');
const path = require("path");

// A - rock, 1
// B - paper, 2
// C - scissors, 3
// X - lose, 0
// Y - draw, 3
// Z - win, 6

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

const winConditionMap = {
    'A': 'C',
    'B': 'A',
    'C': 'B',
};

const choiceScoreObj = {
    'A': 1,
    'B': 2,
    'C': 3,
};

const roundResultMap = {
    'X': 0,
    'Y': 3,
    'Z': 6,
};

const input = getInput().split('\n').map(item => item.split(' '));

// console.log(input);
let totalScore = 0;

for (let i = 0; i < input.length; i++) {
    const opponentChoice = input[i][0];
    const roundResult = roundResultMap[input[i][1]];

    let yourChoice;
    if (roundResult === 6) yourChoice = getKeyByValue(winConditionMap, opponentChoice);
    if (roundResult === 3) yourChoice = opponentChoice;
    if (roundResult === 0) yourChoice = winConditionMap[opponentChoice];

    totalScore += choiceScoreObj[yourChoice] + roundResult;
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