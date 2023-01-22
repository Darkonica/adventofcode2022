const fs = require('fs');
const path = require("path");

const input = getInput().split('\n').map(item => item.replace(/-/g, ',').split(',').map(rangeNumb => Number(rangeNumb)));

let totalContainPairs = 0;

// 2, 7, 3, 6
for (let i = 0; i < input.length; i++) {
    const pairOneFirstNumb = input[i][0];
    const pairOneSecondNumb = input[i][1];
    const pairTwoFirstNumb = input[i][2];
    const pairTwoSecondNumb = input[i][3];
    
    if (pairOneFirstNumb >= pairTwoFirstNumb && pairOneSecondNumb <= pairTwoSecondNumb) {
        totalContainPairs++;
        continue;
    };

    if (pairTwoFirstNumb >= pairOneFirstNumb && pairTwoSecondNumb <= pairOneSecondNumb) {
        totalContainPairs++;
    };
}

console.log(totalContainPairs);

function getInput() {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}