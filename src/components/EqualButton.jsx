function EqualButton({ handleClick }) {
    return (
        <>
            <div className="equal_div">
                <button className="equal_button" onClick={handleClick}>=</button>
            </div>
        </>
    );
}

export default EqualButton;