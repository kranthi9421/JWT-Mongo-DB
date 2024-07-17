import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./Auth"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const navigate = useNavigate()
     
 const {setUser} = useAuth()

  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
         setUser(res.data.email)
        if(res.data.Login){
        navigate('/dash')
       }else {
        navigate('/')
       }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            type="text"
            value={email}
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            id="pwd"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
