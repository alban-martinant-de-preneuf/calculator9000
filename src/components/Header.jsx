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
            setUserConnected({ isUserConnected: false, user: {} });
        }
    }

    return (
        <>
            <header>
                <Title />
                <nav>
                    {userConnected.isUserConnected ? (
                        <button className='header_button' onClick={handleDisconnection}>Deconnection</button>
                    ) : (
                        <button className='header_button' onClick={handleConnection}>Connection</button>
                    )}
                </nav>
            </header>
        </>
    );
}

export default Header;