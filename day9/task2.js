const fs = require('fs');
const path = require("path");

const input = getInput('input').split('\n').map(item => item.split(' '));

const START_POS = 499;

const bridgeMatrix = [];
for (let i = 0; i < START_POS * 2; i++) {
    bridgeMatrix.push(Array(START_POS * 2).fill(0));
}

bridgeMatrix[START_POS][START_POS] = 1;

const knotsPositions = [];
for (let i = 0; i < 10; i++) {
    knotsPositions.push([START_POS, START_POS]);
}

// CASES:
// knot right behind on the same column, do nothing *
// 1
// 2

// knot on the same spot, do nothing *
// 1/2

// knot connected diagonaly, do nothing *
// 0 1
// 2 0

// knot on the same column, line gap, need to move it up *
// 1
// 0
// 2
// knot[0]--

// knot on right/left column, line gap, need to move it up and behind
// 0 1  ||  1 0
// 0 0  ||  0 0
// 2 0  ||  0 2
// knot[0]--;
// knot[1]++;  ||  knot[1]--;

// And this can happen too
// 0 0 1  ||  1 0 0
// 2 0 0  ||  0 0 2

// column AND line gap, move it diagonally *
// 0 0 1  ||  1 0 0
// 0 0 0  ||  0 0 0
// 2 0 0  ||  0 0 2
// knot[0]--;
// knot[1]++;  ||  knot[1]--;

// And... MAYBE it could go down. Yeah. But I'll check it later
// Smth like that
// 0 7 0 0 1
// 8 0 6 0 2
// 9 0 5 0 3
// 9 0 0 4 0

// [0] -- 0
//        0
//        0
// [1] -- 0 0 0

let tailPositionsCount = 0;

for (let i = 0; i < input.length; i++) {
    const stepsDirection = input[i][0];
    const stepsCount = Number(input[i][1]);
    const headPosition = knotsPositions[0];
    const tailPosition = knotsPositions[knotsPositions.length - 1];

    for (let k = 0; k < stepsCount; k++) {
        switch (stepsDirection) {
            case 'U': {
                headPosition[0]--;
                break;
            }
            case 'R': {
                headPosition[1]++;
                break;
            }
            case 'D': {
                headPosition[0]++;
                break;
            }
            case 'L': {
                headPosition[1]--;
                break;
            }
            default:
                console.error('Pfffff'); 
        }

        knotsPositions.forEach((knot, index) => {
            if (index === 0) {
                return;
            }

            const prevKnot = knotsPositions[index - 1];

            const upDownPlaneDiff = prevKnot[0] - knot[0];
            const leftRightPlaneDiff = prevKnot[1] - knot[1];

            if (Math.abs(upDownPlaneDiff) > 1) {
                knot[0] += Math.sign(upDownPlaneDiff);

                if (Math.abs(leftRightPlaneDiff) === 1) {
                    knot[1] += Math.sign(leftRightPlaneDiff);

                }
            }

            if(Math.abs(leftRightPlaneDiff) > 1) {
                knot[1] += Math.sign(leftRightPlaneDiff);

                if (Math.abs(upDownPlaneDiff) === 1) {
                    knot[0] += Math.sign(upDownPlaneDiff);
                }
            }

        });

        bridgeMatrix[tailPosition[0]][tailPosition[1]] = 1;
    }
}

tailPositionsCount = bridgeMatrix.flat().filter(item => item === 1).length;

console.log(tailPositionsCount);

function getInput(fileName) {
    let result;
    try {
        result = fs.readFileSync(path.resolve(__dirname, './' + fileName + '.txt'), 'utf8');
    } catch (err) {
        console.error(err);
    }

    return result;
}