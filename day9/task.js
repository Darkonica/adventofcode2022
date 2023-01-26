const fs = require('fs');
const path = require("path");

const input = getInput('input').split('\n').map(item => item.split(' '));

const START_POS = 499;

let bridgeMatrix = [];
for (let i = 0; i < 999; i++) {
    bridgeMatrix.push(Array(999).fill(0));
}

bridgeMatrix[START_POS][START_POS] = 1;

let tailPosition = [START_POS, START_POS];
let headPosition = [START_POS, START_POS];
let tailPositionsCount = 0;

for (let i = 0; i < input.length; i++) {
    const stepsDirection = input[i][0];
    const stepsCount = Number(input[i][1]);

    for (let k = 0; k < stepsCount; k++) {
        switch (stepsDirection) {
            case 'U': {
                headPosition[0]--;

                if (tailPosition[0] - headPosition[0] > 1) {
                    tailPosition[0]--;

                    if (headPosition[1] !== tailPosition[1]) {
                        tailPosition[1] = headPosition[1];
                    }
                }
                break;
            }
            case 'R': {
                headPosition[1]++;

                if (headPosition[1] - tailPosition[1] > 1) {
                    tailPosition[1]++;

                    if (headPosition[0] !== tailPosition[0]) {
                        tailPosition[0] = headPosition[0];
                    }
                }
                break;
            }
            case 'D': {
                headPosition[0]++;

                if (headPosition[0] - tailPosition[0] > 1) {
                    tailPosition[0]++;

                    if (headPosition[1] !== tailPosition[1]) {
                        tailPosition[1] = headPosition[1];
                    }
                }
                break;
            }
            case 'L': {
                headPosition[1]--;

                if (tailPosition[1] - headPosition[1] > 1) {
                    tailPosition[1]--;

                    if (headPosition[0] !== tailPosition[0]) {
                        tailPosition[0] = headPosition[0];
                    }
                }
                break;
            }
            default:
                console.error('Pfffff'); 
        }

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