import CalculCard from "./CalculCard";
import { useState, useEffect } from "react";

function SavedCalculs({ calculations, setCalculations, setDisplaySavedCalculations }) {

    const [title, setTitle] = useState('');

    useEffect(() => {
        if (calculations.length > 0) {
            setTitle(`Calculations saved`);
        } else {
            setTitle('No calculations saved');
        }
    }, [calculations]);


    return (
        <>
            <div className="modal_container">
                <div className="modal">
                    <button className="close_button" onClick={() => setDisplaySavedCalculations(false)}>X</button>
                    <div className="saved_cal_div">
                        <h2 className="saved_cal_title">{title}</h2>
                        <ul>
                            {calculations.map((calculation, id) => (
                                <CalculCard key={`calcul-${id}`} calculation={calculation} setCalculations={setCalculations} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SavedCalculs;