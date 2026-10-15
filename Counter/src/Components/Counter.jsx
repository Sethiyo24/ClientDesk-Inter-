import { useState } from 'react'
import './Counter.css'

const Counter = () => {
  const [up, setUp] = useState(0)
  const [down, setDown] = useState(0)
  const count = up + down;
  const upar = () => {
    setUp(up + 1)
  }
  const downar = () => {
    setDown(down - 1)
  }

  return (
    <div className="counter-container">
      <p id="para">Your Total Clicks: {count}</p>
      <button id="btn" onClick={upar}>
        Click me for Up
      </button>
      <button id="btn2" onClick={downar}>
        Click me for Down
      </button>
    </div>
  )
}

export default Counter
