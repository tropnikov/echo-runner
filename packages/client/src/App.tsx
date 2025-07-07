import { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return <Outlet />
}

export default App
