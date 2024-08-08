import RoutesApp from './routes/RoutesApp.jsx'
import styles from './app.module.css'

import {AuthenticationProvider} from './context/AuthenticationContext.jsx'

function App() {

  return (
    <AuthenticationProvider>
      <div className={styles.containerApp}>
        <RoutesApp/>    
      </div>
    </AuthenticationProvider>
  )
}

export default App
