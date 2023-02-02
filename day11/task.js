const fs = require('fs');
const path = require("path");

const ROUNDS = 20;

const input = getInput('input');

const monkeyInTheMiddleGame = (input, rounds) => {
    const monkeysData = [...input];

    const getOperationResult = (operationString, item) => {
        let [leftOperand, operator, rightOperand] = [...operationString.split(' ')];

        leftOperand = item;
        // right operand can't be 0, so || is ok
        rightOperand = Number(rightOperand) || item;
        
        let result;
        // Can be done by using eval, but nonono
        switch (operator) {
            case '+': {
                result = leftOperand + rightOperand;
                break;
            }
            case '*': {
                result = leftOperand * rightOperand;
                break;
            }
            default: {
                console.error('Smth wrong');
            }
        }

        // reduce worry level after inspection
        return parseInt(result / 3);
    }

    const getMonkeyThrowDestination = (testObj, item) => {
        let [operator, rightOperand] = [...testObj.Check.split(' ')]
        rightOperand = Number(rightOperand);

        let checkResult;
        if (operator === '%') {
            checkResult = !(item % rightOperand); 
        }

        if (checkResult) {
            return Number(testObj.True.slice(-1));
        }

        return Number(testObj.False.slice(-1));
    }

    
    for (let i = 0; i < rounds; i++) {
        for (const monkey of monkeysData) {
            const items = monkey["Starting items"];
            
            for (const item of items) {
                const operationResult = getOperationResult(monkey.Operation, item);
                const throwDestination = getMonkeyThrowDestination(monkey.Test, operationResult);

                monkeysData[throwDestination]["Starting items"].push(operationResult);
            }

            monkey.inspectedCount = (monkey?.inspectedCount || 0) + items.length;
            monkey["Starting items"] = [];
        }
    }

    const inspectedItemsCounts = []
    for (const monkey of monkeysData) {
        inspectedItemsCounts.push(monkey.inspectedCount);
    }
    
    const twoMaxCounts = inspectedItemsCounts.sort((a,b) => a - b).slice(-2);

    return twoMaxCounts[0] * twoMaxCounts[1];
}

const result = monkeyInTheMiddleGame(input.monkeys, ROUNDS);
console.log(result);

function getInput(fileName) {
    let result;
    try {
        rawData = fs.readFileSync(path.resolve(__dirname, './' + fileName + '.json'));
        result = JSON.parse(rawData);
    } catch (err) {
        console.error(err);
    }

    return result;
}