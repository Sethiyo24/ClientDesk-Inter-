import './App.css'
import ThemeBox from './ThemeBox.jsx'
import { createContext, useState } from 'react'

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

return(
  <ThemeContext.Provider value={{ theme, setTheme }}>
    <div id="container" style={{ backgroundColor: theme === 'light' ? '#e5a9f6' : '#180a1e', color: theme === 'light' ? '#000' : '#fff', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ThemeBox />
    </div>
  </ThemeContext.Provider>
)
}

export default App
// eslint-disable-next-line react-refresh/only-export-components
export { ThemeContext }

 