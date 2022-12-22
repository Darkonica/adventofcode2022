const fs = require('fs');
const path = require("path");

// X - rock, 1
// Y - paper, 2
// Z - scissors, 3
// 0 - lose
// 3 - draw
// 6 - win

const opponentChoiceMap = {
    'A': 'X',
    'B': 'Y',
    'C': 'Z',
}

const winConditionMap = {
    'X': 'C',
    'Y': 'A',
    'Z': 'B',
};

const choiceScoreObj = {
    'X': 1,
    'Y': 2,
    'Z': 3,
};

const input = getInput().split('\n').map(item => item.split(' '));

// console.log(input);
let totalScore = 0;

for (let i = 0; i < input.length; i++) {
    const opponentChoice = input[i][0];
    const yourChoice = input[i][1];

    let roundResult = 0;
    if (winConditionMap[yourChoice] === opponentChoice) roundResult = 6;
    if (opponentChoiceMap[opponentChoice] === yourChoice) roundResult = 3;

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