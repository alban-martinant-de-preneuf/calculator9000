import Header from './components/Header';
import Calculator from './components/Calculator';
import FormConnection from './components/FormConnection';
import { useState } from 'react';
import './App.css';

function App() {

  const [userConnected, setUserConnected] = useState({
    isUserConnected: false,
    user: {},
    sessionId: null
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
