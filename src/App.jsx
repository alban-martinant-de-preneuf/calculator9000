import { useState } from 'react'
import Title from './components/Title'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Title />
    </>
  )
}

export default App
