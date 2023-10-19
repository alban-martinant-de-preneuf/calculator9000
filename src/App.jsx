import Header from './components/Header';
import Calculator from './components/Calculator';
import FormConnection from './components/FormConnection';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const checkConnection = async () => {
    const response = await fetch('http://localhost/calculator9000/backend/authentication.php?check-auth=true', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    if (data.success) {
      setUserConnected({
        isUserConnected: true,
        user: data.user
      });
    }
  }

  useEffect(() => {
    checkConnection();
  }, []);

  const [userConnected, setUserConnected] = useState({
    isUserConnected: false,
    user: {}
  });
  const [displayForm, setDisplayForm] = useState(false);

  const handleConnection = () => {
    setDisplayForm(!displayForm);
  }

  return (
    <>
      <Header handleConnection={handleConnection} userConnected={userConnected} setUserConnected={setUserConnected} />
      <Calculator displayForm={displayForm} userConnected={userConnected} />
      {displayForm && <FormConnection setUserConnected={setUserConnected} setDisplayForm={setDisplayForm} />}
    </>
  )
}

export default App
