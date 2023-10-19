function AdditionalButtons({ handleAC, handleBack, calcul, result, userConnected}) {

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('calcul', calcul);
        formData.append('result', result);

        const response = await fetch(`http://localhost/calculator9000/backend/operation.php?save-operation=true`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="additionald_div">
            <button className="additional_button" onClick={handleAC}>AC</button>
            <button className="additional_button" onClick={handleBack}>←</button>
            <button className="additional_button" onClick={handleSave}>save</button>
        </div>
    );
}

export default AdditionalButtons;
