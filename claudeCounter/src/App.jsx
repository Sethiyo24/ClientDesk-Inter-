import { useState } from 'react'
import './App.css'
import Card from './Components/Card'
import ChCounter from './Components/ChCounter'

function App() {
  const [count, setCount] = useState(0)

  const incCount = () => {
    setCount(prev => prev + 1)
  }

  const decCount = () => {
    setCount(prev => prev - 1)
  }

  const resetCount = () => {
    setCount(0)
  }

  return (
    <>
      {/* Full counter: all three buttons */}
      <Card title="My Counter">
        <ChCounter
          count={count}
          onIncrement={incCount}
          onDecrement={decCount}
          onReset={resetCount}
        />
        {count >= 5 && <p>You are on fire! 🔥</p>}
      </Card>

      {/* Same state, simpler counter: only increment */}
      <Card title="Mirror">
        <ChCounter count={count} onIncrement={incCount} label="Score" />
      </Card>
    </>
  )
}

export default App