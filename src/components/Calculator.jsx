import React from 'react';
import ReactDOM from 'react-dom/client';
import BeautifulScreen from './BeautifulScreen';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import EqualButton from './EqualButton';
import { useState } from 'react';

function Calculator() {

    const [calcul, setCalcul] = useState(0);
    const [result, setResult] = useState(0);

    const handleClick = (e) => {
        calcul == 0 ? setCalcul(e.target.value) : setCalcul(calcul + e.target.value);
    }

    const handleEqual = (e) => {
    //     let numbers = calcul.split(/[^0-9]/);
    //     const operators = calcul.split(/[0-9]/).filter(operator => operator != '');
    //     calculate(numbers, operators);
        setResult(eval(calcul));
    }

    // const calculate = (numbers, operators) => {
    //     operators.forEach((operator) => {
    //         if (operator == '*' || operator == '/') {
    //             if (operator == '*') {
    //                 numbers[operators.indexOf(operator)] = parseInt(numbers[operators.indexOf(operator)]) * parseInt(numbers[operators.indexOf(operator) + 1]);
    //             }
    //             else {
    //                 numbers[operators.indexOf(operator)] = parseInt(numbers[operators.indexOf(operator)]) / parseInt(numbers[operators.indexOf(operator) + 1]);
    //             }
    //             numbers.splice[operators.indexOf(operator) + 1, 1];
    //             operators.splice[operators.indexOf(operator), 1];
                
    //         }
    //         console.log(numbers, operators);
    //     });
    // }

    return (
        <>
            <div className="calculator">
                <BeautifulScreen calcul={calcul} result={result} />
                <div className="numbers_operators_div">
                    <NumberButton handleClick={handleClick} />
                    <OperatorButton handleClick={handleClick} />
                </div>
                <EqualButton handleClick={handleEqual} />
            </div>
        </>
    );
}

export default Calculator;