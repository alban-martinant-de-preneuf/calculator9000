function OperatorButton({ handleClick }) {
    const operators = ['+', '-', '*', '/']

    return (
        <>
            <div className="operators_div">
                {operators.map((operator, id) => (
                    <button className="operator_button" key={id} onClick={handleClick} value={operator}>{operator}</button>
                ))}
            </div>
        </>
    );
}

export default OperatorButton;