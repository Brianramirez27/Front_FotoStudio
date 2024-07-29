import { useState } from 'react'
import RoutesApp from './routes/RoutesApp.jsx'
import styles from './app.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.containerApp}>
      <RoutesApp/>    
    </div>
  )
}

export default App
