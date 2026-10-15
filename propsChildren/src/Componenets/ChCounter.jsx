import './Style.css'

const ChCounter = ({count , incCount}) => {
  return (
    <div className='child-counter'>
      <p>Child Counter: {count}</p>
      <button onClick={incCount}>Increment</button>
    </div>
  )
}

export default ChCounter
