import Header from './components/Header';
import Calculator from './components/Calculator';
import FormConnection from './components/FormConnection';
import SavedCalculs from './components/SavedCalculs';
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
  const [displaySavedCalculations, setDisplaySavedCalculations] = useState(false);
  const [calculations, setCalculations] = useState([]);
  
  const handleDisplaySavedCalculations = async () => {
    const response = await fetch(`http://localhost/calculator9000/backend/operation.php?get-operations=true`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });
    const json = await response.json();
    console.log(json.operations);
    setCalculations(json.operations);

    setDisplaySavedCalculations(!displaySavedCalculations);
  }

  const handleConnection = () => {
    setDisplayForm(!displayForm);
  }

  return (
    <>
      <Header handleConnection={handleConnection} userConnected={userConnected} setUserConnected={setUserConnected} handleDisplaySavedCalculations={handleDisplaySavedCalculations} />
      <Calculator displayForm={displayForm} userConnected={userConnected} />
      {displayForm && <FormConnection setUserConnected={setUserConnected} setDisplayForm={setDisplayForm} />}
      {displaySavedCalculations && <SavedCalculs calculations={calculations} setCalculations={setCalculations} setDisplaySavedCalculations={setDisplaySavedCalculations}/>}
    </>
  )
}

export default App
