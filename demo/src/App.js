import { Routes, Route } from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import Home from "./Home"
import Dash from "./Dash"
import Auth from "./Auth"

function App() {
  return (
    <Auth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dash />} />
      </Routes>
    </Auth>
  )
}

export default App
