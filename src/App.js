import React from 'react';
import Routing from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth'
import './global.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </Router>
  )
}

export default App;
