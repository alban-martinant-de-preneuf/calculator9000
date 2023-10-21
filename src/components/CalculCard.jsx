function CalculCard({ calculation, setCalculations }) {

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

    return (
        <>
            <li className="calcul_card">
                <div>
                    <button className="delete_button" onClick={handleDeleteCalcul}>X</button>
                    {calculation.operation} = {calculation.result}
                </div>
            </li>
        </>
    );
}

export default CalculCard;