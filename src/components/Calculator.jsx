import React from 'react';
// import ReactDOM from 'react-dom/client';
import BeautifulScreen from './BeautifulScreen';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import EqualButton from './EqualButton';
import { useState, useEffect } from 'react';
import AdditionalButtons from './AdditionalButtons';

function Calculator() {

    const [calcul, setCalcul] = useState("0");
    const [result, setResult] = useState(0);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [calcul]);

    const handleKeyDown = (e) => {
        e.preventDefault();
        if (e.key >= 0 && e.key <= 9) {
            calcul == 0 ? setCalcul(e.key) : setCalcul(calcul + e.key);
        }
        else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
            setCalcul(calcul + e.key);
        }
        else if (e.key == 'Enter') {
            handleEqual();
        }
        else if (e.key == 'Backspace') {
            handleBack();
        }
        else if (e.key == 'Escape') {
            handleAC();
        }
        else if (e.key == '.') {
            setCalcul(calcul + '.');
        }
    }

    const handleClick = (e) => {
        calcul == 0 ? setCalcul(e.target.value) : setCalcul(calcul + e.target.value);
    }

    const handleEqual = () => {
        //     let numbers = calcul.split(/[^0-9]/);
        //     const operators = calcul.split(/[0-9]/).filter(operator => operator != '');
        setResult(eval(calcul));
    }

    const handleAC = () => {
        setCalcul(0);
        setResult(0);
    }

    const handleBack = () => {
        calcul.length > 1 ? setCalcul(calcul.slice(0, -1)) : setCalcul(0);
    }

    return (
        <>
            <div className="calculator">
                <BeautifulScreen calcul={calcul} result={result} />
                <AdditionalButtons handleAC={handleAC} handleBack={handleBack} />
                <div className="numbers_operators_div">
                    <NumberButton handleClick={handleClick} />
                    <OperatorButton handleClick={handleClick} />
                </div>
                <EqualButton handleEqual={handleEqual} />
            </div>
            {result > 9000 && <h2>IT'S OVER 9000 !</h2>}
        </>
    );
}

export default Calculator;