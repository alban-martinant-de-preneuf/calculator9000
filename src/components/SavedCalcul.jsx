import { useState, useEffect } from 'react';

function SavedCalcul({ calculations }) {

    return (
        <>
            <div className="saved_cal_div">
                <h2 className="saved_cal_title">Calculations saved</h2>
                <ul>
                    {calculations.map((calculation, id) => (
                        <li className="calcul" key={`calcul-${id}`}>{calculation.operation}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SavedCalcul;