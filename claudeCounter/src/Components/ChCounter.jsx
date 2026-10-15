import './Style.css'

const ChCounter = ({ count, onIncrement, onDecrement, onReset, label = 'Child Counter' }) => {
  return (
    <div className="child-counter">
      <p>{label}: {count}</p>
      <div className="btn-row">
        <button onClick={onIncrement}>Increment</button>
        {onDecrement && <button onClick={onDecrement}>Decrement</button>}
        {onReset && <button onClick={onReset}>Reset</button>}
      </div>
    </div>
  )
}

export default ChCounter