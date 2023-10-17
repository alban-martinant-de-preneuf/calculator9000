function AdditionalButtons({ handleAC, handleBack, handleSave}) {
    return (
        <div className="additionald_div">
            <button className="additional_button" onClick={handleAC}>AC</button>
            <button className="additional_button" onClick={handleBack}>←</button>
            <button className="additional_button" onClick={handleSave}>save</button>
        </div>
    );
}

export default AdditionalButtons;
