import Title from './Title';

function Header({ handleConnection, userConnected, setUserConnected }) {

    const handleDisconnection = async () => {
        const response = await fetch('http://localhost/calculator9000/backend/authentication.php?logout=true', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
            setUserConnected({
                isUserConnected: false,
                user: {},
                sessionId: null
            });
        }
    }

    const handleCalculationSaved = async () => {
        // const response = await fetch(`http://localhost/calculator9000/backend/operation.php?get-operations=true&sessionId=${userConnected.sessionId}`, {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json'
        //     }
        // });
        // const data = await response.json();
        // console.log(data);

        const response = await fetch(`http://localhost/calculator9000/backend/operation.php?get-operations=true`, {
            method: 'GET',
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
            <header>
                <Title />
                <nav>
                    {userConnected.isUserConnected ? (
                        <>
                            <button className='header_button' onClick={handleDisconnection}>Disconnection</button>
                            <button className='header_button' onClick={handleCalculationSaved}>Calculations saved</button>
                        </>
                    ) : (
                        <button className='header_button' onClick={handleConnection}>Connection</button>
                    )}
                </nav>
            </header>
        </>
    );
}

export default Header;