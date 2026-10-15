import { useState } from 'react'
import ChCounter from './Componenets/ChCounter'

function App() {
  const [count, setCount] = useState(0)
  const incCount=()=>{
   setCount(count+1);
  }
  return (
    <>
      <ChCounter count={count} incCount={incCount} />
    </>
  )
}

export default App
