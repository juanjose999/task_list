import { use, useEffect, useState } from 'react'
import './App.css'
import { AuthContrainer } from './components/auth/AuthContainer'
import { DashBoard } from './components/dashboard/DashBoardContainer'
import { logout } from './components/service/api'

function App() {

  const [tokens, setTokens] = useState({})
  const [isLogged, setIsLogged] = useState(false)

  const updateTokens = (data) => {
    setTokens(data)
  }

  const updateStatedLogged = (status) => {
    setIsLogged(status)
  }

  useEffect(() => {
    console.log("tokens desde app.jsx: ", tokens)
    console.log("tokens localstroge:", localStorage.getItem("refresh"))
  }, [tokens])

  const handleLogout = () => {
    setIsLogged(!isLogged)
    console.log("voy a salir")
    logoutSession()
    localStorage.removeItem("refresh")
  }

  const logoutSession = async () => {
     const result = logout();
     if(result){
      console.log("Finalizacion exitosa")
     }else{
      console.log("error, no se pudo cerrar la seccion")
     }
  }

  return (
    <>
      {
        isLogged ? (<DashBoard tokens={tokens} salir={handleLogout}/>) : (<AuthContrainer onLogged={updateStatedLogged} onTokens={updateTokens}/>)
      }
    </>
  )
}

export default App
