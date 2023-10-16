function BeautifulScreen({ calcul, result }) {
    return (
        <div className="screen">
            <div className="current_calcul">{calcul}</div>
            <div className="result">{result}</div>
        </div>
    );
}

export default BeautifulScreen;