function NumberButton() {
    const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

    return (
        <>
            <div className="numbers_div">
                {numbers.map((number, id) => (
                    <button className="number_button" key={id}>{number}</button>
                ))}
            </div>
        </>
    );
}

export default NumberButton;