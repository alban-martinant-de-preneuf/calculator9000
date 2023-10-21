import React from 'react';
import BeautifulScreen from './BeautifulScreen';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import EqualButton from './EqualButton';
import Over9000 from './Over9000';
import { useState, useEffect } from 'react';
import AdditionalButtons from './AdditionalButtons';

function Calculator({ displayForm, userConnected, calcul, setCalcul, result, setResult }) {

    useEffect(() => {
        if (!displayForm) {
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            }
        }
    }, [calcul, displayForm]);

    const handleKeyDown = (e) => {
        e.preventDefault();
        if (e.key >= 0 && e.key <= 9) {
            calcul == 0 ? setCalcul(e.key) : setCalcul(calcul + e.key);
        }
        else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
            setCalcul(prevCalc => prevCalc + e.key);
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

    const [displayOver9000, setDisplayOver9000] = useState(false);

    useEffect(() => {
        if (result > 9000) {
            setDisplayOver9000(true);
            const timeoutId = setTimeout(() => {
                setDisplayOver9000(false);
            }, 2000);
            return () => {
                clearTimeout(timeoutId);
            }
        }
    }, [result]);

    return (
        <>
            <main>
                <div className="calculator">
                    <BeautifulScreen calcul={calcul} result={result} />
                    <AdditionalButtons handleAC={handleAC} handleBack={handleBack} userConnected={userConnected} calcul={calcul} result={result} />
                    <div className="numbers_operators_div">
                        <NumberButton handleClick={handleClick} />
                        <OperatorButton handleClick={handleClick} />
                    </div>
                    <EqualButton handleEqual={handleEqual} />
                </div>
                {displayOver9000 && <Over9000 />}
            </main>
        </>
    );
}

export default Calculator;