function CalculCard({ calculation, setCalculations, setCalcul, setResult, setDisplaySavedCalculations }) {

    const handleDeleteCalcul = async (e) => {

        console.log(e.target.parentNode.parentNode);
        const response = await fetch(`http://localhost/calculator9000/backend/operation.php?delete-operation=true&id=${calculation.id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
            setCalculations(calculations => calculations.filter((element) => element.id !== calculation.id));
        }
    }

    const handleClickCalcul = () => {
        setCalcul(calculation.operation);
        setResult(calculation.result);
        setDisplaySavedCalculations(false);
    }

    return (
        <>
            <li className="calcul_card">
                <div>
                    <button className="delete_button" onClick={handleDeleteCalcul}>X</button>
                    <p onClick={handleClickCalcul}>{calculation.operation} = {calculation.result}</p>
                </div>
            </li>
        </>
    );
}

export default CalculCard;