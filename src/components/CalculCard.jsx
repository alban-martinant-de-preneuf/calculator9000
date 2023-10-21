function CalculCard({ calculations }) {

    const handleDeleteCalcul = async (e) => {

        const response = await fetch(`http://localhost/calculator9000/backend/operation.php?delete-operation=true&id=${calculations.id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
            e.target.parentNode.parentNode.remove();
        }
    }

    return (
        <>
            <li className="calcul_card">
                <div>
                    <button className="delete_button" onClick={handleDeleteCalcul}>X</button>
                    {calculations.operation} = {calculations.result}
                </div>
            </li>
        </>
    );
}

export default CalculCard;