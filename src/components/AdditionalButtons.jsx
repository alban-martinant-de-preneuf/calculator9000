function AdditionalButtons({ handleAC, handleBack}) {
    return (
        <div className="additionald_div">
            <button className="additional_button" onClick={handleAC}>AC</button>
            <button className="additional_button" onClick={handleBack}>←</button>
            {/* <button onClick={handleMemory}>M</button> */}
        </div>
    );
}

export default AdditionalButtons;
