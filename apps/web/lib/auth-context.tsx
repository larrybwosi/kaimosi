"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  avatar?: string
  createdAt: string
}

export interface Submission {
  id: string
  userId: string
  userName: string
  type: "restaurant" | "store" | "accommodation" | "attraction" | "event"
  status: "pending" | "approved" | "rejected"
  data: Record<string, unknown>
  createdAt: string
  reviewedAt?: string
  reviewedBy?: string
  reviewNote?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  submissions: Submission[]
  addSubmission: (submission: Omit<Submission, "id" | "userId" | "userName" | "status" | "createdAt">) => void
  updateSubmissionStatus: (id: string, status: "approved" | "rejected", note?: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for demonstration
const DEMO_USERS: User[] = [
  {
    id: "1",
    email: "admin@maplewood.town",
    name: "Town Administrator",
    role: "admin",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    email: "user@example.com",
    name: "John Doe",
    role: "user",
    createdAt: "2024-06-15",
  },
]

// Demo submissions
const DEMO_SUBMISSIONS: Submission[] = [
  {
    id: "sub-1",
    userId: "2",
    userName: "John Doe",
    type: "restaurant",
    status: "pending",
    data: {
      name: "The Cozy Corner Café",
      category: "Café",
      cuisine: "American",
      description: "A warm and inviting café serving homemade pastries and specialty coffee.",
      address: "123 Elm Street, Maplewood",
      phone: "(555) 123-4567",
      hours: "Mon-Sat: 7AM-5PM",
      priceRange: "$$",
    },
    createdAt: "2024-12-01",
  },
  {
    id: "sub-2",
    userId: "2",
    userName: "John Doe",
    type: "attraction",
    status: "approved",
    data: {
      name: "Hidden Waterfall Trail",
      category: "Parks & Recreation",
      shortDescription: "A secret trail leading to a beautiful hidden waterfall.",
      address: "Off Route 7, Maplewood",
    },
    createdAt: "2024-11-15",
    reviewedAt: "2024-11-18",
    reviewedBy: "Town Administrator",
    reviewNote: "Great addition to our trail network!",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [submissions, setSubmissions] = useState<Submission[]>(DEMO_SUBMISSIONS)

  // Load user from localStorage on mount (demo mode)
  useEffect(() => {
    const storedUser = localStorage.getItem("maplewood_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    const storedSubmissions = localStorage.getItem("maplewood_submissions")
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions))
    }
    setIsLoading(false)
  }, [])

  // Save submissions to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("maplewood_submissions", JSON.stringify(submissions))
    }
  }, [submissions, isLoading])

  const login = async (email: string, password: string) => {
    // Demo mode: check against demo users or any registered user
    const registeredUsers = JSON.parse(localStorage.getItem("maplewood_registered_users") || "[]")
    const allUsers = [...DEMO_USERS, ...registeredUsers]
    const foundUser = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (foundUser) {
      // Demo mode: accept any password for demo users
      setUser(foundUser)
      localStorage.setItem("maplewood_user", JSON.stringify(foundUser))
      return { success: true }
    }

    return { success: false, error: "Invalid email or password" }
  }

  const signup = async (email: string, password: string, name: string) => {
    // Check if user already exists
    const registeredUsers = JSON.parse(localStorage.getItem("maplewood_registered_users") || "[]")
    const allUsers = [...DEMO_USERS, ...registeredUsers]

    if (allUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists" }
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: "user",
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    registeredUsers.push({ ...newUser, password }) // In demo mode, we store password
    localStorage.setItem("maplewood_registered_users", JSON.stringify(registeredUsers))

    // Auto login
    setUser(newUser)
    localStorage.setItem("maplewood_user", JSON.stringify(newUser))

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("maplewood_user")
  }

  const addSubmission = (submission: Omit<Submission, "id" | "userId" | "userName" | "status" | "createdAt">) => {
    if (!user) return

    const newSubmission: Submission = {
      ...submission,
      id: `sub-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    setSubmissions((prev) => [newSubmission, ...prev])
  }

  const updateSubmissionStatus = (id: string, status: "approved" | "rejected", note?: string) => {
    if (!user || user.role !== "admin") return

    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status,
              reviewedAt: new Date().toISOString(),
              reviewedBy: user.name,
              reviewNote: note,
            }
          : sub,
      ),
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        submissions,
        addSubmission,
        updateSubmissionStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
