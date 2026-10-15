import { ThemeContext } from './App.jsx'
import{ useContext } from 'react'


const ThemeBox = () => {
    const { theme , setTheme } = useContext(ThemeContext);
  return (
    <div>
    <p>Change Theme:</p>
    <button onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}>Toggle Theme</button>
    </div>
  )
}

export default ThemeBox