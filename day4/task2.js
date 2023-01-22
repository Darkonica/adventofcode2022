const fs = require('fs');
const path = require("path");

const input = getInput().split('\n').map(item => item.replace(/-/g, ',').split(',').map(rangeNumb => Number(rangeNumb)));

let totalOverlapPairs = 0;
// 5-7, 7-9 *
// 7-9, 5-7 *
// 5-7, 6-8 *
// 5-7, 2-8 *
// 5-7, 8-9 *
for (let i = 0; i < input.length; i++) {
    const pairOneFirstNumb = input[i][0];
    const pairOneSecondNumb = input[i][1];
    const pairTwoFirstNumb = input[i][2];
    const pairTwoSecondNumb = input[i][3];
    
    // first case, third case, fourth case
    if (pairOneSecondNumb >= pairTwoFirstNumb && pairOneSecondNumb <= pairTwoSecondNumb) {
        totalOverlapPairs++;
        continue;
    };
    
    // 
    if (pairTwoSecondNumb >= pairOneFirstNumb && pairTwoSecondNumb <= pairOneSecondNumb) {
        totalOverlapPairs++;
    };
}

console.log(totalOverlapPairs);

function getInput() {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}