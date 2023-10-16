import React from 'react';
import ReactDOM from 'react-dom/client';
import BeautifulScreen from './BeautifulScreen';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import EqualButton from './EqualButton';

function Calculator() {
    return (
        <>
            <div className="calculator">
                <BeautifulScreen />
                <div className="numbers_operators_div">
                    <NumberButton />
                    <OperatorButton />
                </div>
                <EqualButton />
            </div>
        </>
    );
}

export default Calculator;