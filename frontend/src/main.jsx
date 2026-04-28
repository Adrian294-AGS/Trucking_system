import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserAuthProvider } from './context/userAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthProvider>
      <App />
    </UserAuthProvider>
  </StrictMode>,
)
