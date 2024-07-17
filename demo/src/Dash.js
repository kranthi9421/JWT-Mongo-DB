import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./Auth"

const Dash = () => {
  const [message, setMessage] = useState("")

  const {user} = useAuth()

  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard")
      .then((res) => {
        if (res.data.valid) {
          setMessage(res.data.message)
        } else {
           navigate('/')
        }
      })
      .catch((err) => console.log(err))
  })
  return <div>Dashboard - {message} - {user}</div>
}

export default Dash
