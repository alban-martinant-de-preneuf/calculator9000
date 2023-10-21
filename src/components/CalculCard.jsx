function CalculCard({ calculations }) {

    const handleDeleteCalcul = async () => {

        const response = await fetch(`http://localhost/calculator9000/backend/operation.php?delete-operation=true&id=${calculations.id}`, {
            method: 'DELETE',
            body: formData,
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
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