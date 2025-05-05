"use client"

import { useState, createContext, useContext } from "react"

const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const toast = ({ title, description, variant = "default", duration = 5000 }) => {
        const id = Math.random().toString(36).substring(2, 9)
        setToasts((prevToasts) => [...prevToasts, { id, title, description, variant, duration }])

        if (duration !== Number.POSITIVE_INFINITY) {
            setTimeout(() => {
                setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
            }, duration)
        }

        return id
    }

    const dismiss = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }

    return <ToastContext.Provider value={{ toasts, toast, dismiss }}>{children}</ToastContext.Provider>
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}
