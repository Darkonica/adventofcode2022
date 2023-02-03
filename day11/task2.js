const fs = require('fs');
const path = require("path");

const ROUNDS = 1000;

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

        return result;
    }

    const getCheckResult = (testObj, item) => {
        let [operator, rightOperand] = [...testObj.Check.split(' ')]

        let checkResult;
        if (operator === '%') {
            checkResult = !(item % rightOperand);
        }

        if (checkResult) {
            const reducedWorryScore = item / rightOperand;
            console.log(checkResult, item, reducedWorryScore);
            return [checkResult, reducedWorryScore];
        }

        return [checkResult, item];
    }

    const getMonkeyThrowDestination = (testObj, checkResult) => {
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
                const [checkResult, worryScore] = getCheckResult(monkey.Test, operationResult)
                const throwDestination = getMonkeyThrowDestination(monkey.Test, checkResult);

                monkeysData[throwDestination]["Starting items"].push(worryScore);
            }

            monkey.inspectedCount = (monkey?.inspectedCount || 0) + items.length;
            monkey["Starting items"] = [];
        }
        // if (i % 10 === 0) console.log(i);
    }

    const inspectedItemsCounts = []
    for (const monkey of monkeysData) {
        inspectedItemsCounts.push(monkey.inspectedCount);
    }
    
    const twoMaxCounts = inspectedItemsCounts.sort((a,b) => a - b).slice(-2);

    return inspectedItemsCounts;
    // return (twoMaxCounts[0] / 10000) * twoMaxCounts[1];
    // return 119983n * 120078n;
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