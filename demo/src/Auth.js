import React, { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

const Auth = ({ children }) => {
  const [user, setUser] = useState("")

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default Auth

export const useAuth = () => {
  return useContext(AuthContext)
}
