function EqualButton({ handleEqual }) {
    return (
        <>
            <div className="equal_div">
                <button className="equal_button" onClick={handleEqual}>=</button>
            </div>
        </>
    );
}

export default EqualButton;