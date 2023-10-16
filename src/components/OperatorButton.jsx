function OperatorButton(operator) {
    const operators = ['+', '-', '*', '/']

    return (
        <>
            <div className="operators_div">
                {operators.map((operator, id) => (
                    <button className="operator_button" key={id}>{operator}</button>
                ))}
            </div>
        </>
    );
}

export default OperatorButton;