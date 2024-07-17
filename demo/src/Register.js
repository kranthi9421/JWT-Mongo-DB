import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((res) => {
        navigate("/login")
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            autoComplete="off"
            type="text"
            value={name}
            className="form-control"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          Register
        </button>
        <button type="submit" className="btn btn-danger">
          Login
        </button>
      </form>
    </div>
  )
}

export default Register
