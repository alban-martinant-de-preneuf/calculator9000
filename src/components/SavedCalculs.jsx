import CalculCard from "./CalculCard";

function SavedCalculs({ calculations, setDisplaySavedCalculations}) {

    return (
        <>
            <div className="modal_container">
                <div className="modal">
                <button className="close_button" onClick={() => setDisplaySavedCalculations(false)}>X</button>
                    <div className="saved_cal_div">
                        <h2 className="saved_cal_title">Calculations saved</h2>
                        <ul>
                            {calculations.map((calculation, id) => (
                                <CalculCard key={`calcul-${id}`} calculations={calculation} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SavedCalculs;