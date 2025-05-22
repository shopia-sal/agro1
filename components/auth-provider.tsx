"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
        setUser(null)
      }
    }
    setLoading(false)
  }, [])

  // Mock login function
  const login = async (email, password) => {
    // In a real app, this would make an API call to authenticate
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Admin user
        if (email === "admin@example.com" && password === "admin123") {
          const user = {
            id: "admin_1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
            phone: "081234567890",
            address: "Jl. Admin No. 123, Jakarta",
          }

          setUser(user)
          localStorage.setItem("user", JSON.stringify(user))
          resolve(user)
        }
        // Demo user
        else if (email === "demo@example.com" && password === "password") {
          const user = {
            id: "user_1",
            name: "Demo User",
            email: "demo@example.com",
            role: "customer",
            phone: "081234567890",
            address: "Jl. Demo No. 123, Jakarta",
          }

          setUser(user)
          localStorage.setItem("user", JSON.stringify(user))
          resolve(user)
        } else {
          // For demo purposes, also accept any email/password
          const user = {
            id: "user_" + Math.random().toString(36).substr(2, 9),
            name: email.split("@")[0],
            email: email,
            role: "customer",
            phone: "",
            address: "",
          }

          setUser(user)
          localStorage.setItem("user", JSON.stringify(user))
          resolve(user)

          // Uncomment to simulate login failure
          // reject(new Error("Invalid email or password"))
        }
      }, 1000)
    })
  }

  // Mock register function
  const register = async (name, email, password) => {
    // In a real app, this would make an API call to register
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful registration
        const user = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          name,
          email,
          phone: "",
          address: "",
        }

        // Don't automatically log in after registration
        resolve(user)
      }, 1000)
    })
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
