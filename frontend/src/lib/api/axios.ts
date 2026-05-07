import { ENV } from "@/config/env"
import { AUTH_ROUTES } from "@/features/auth/auth.routes"
import axios, { AxiosError } from "axios"

const API = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
})

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// Response interceptor
API.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    //get source
    const source = window.location.pathname

    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem("token")
      if (source != AUTH_ROUTES.LOGIN) {
        window.location.href = "/auth/login"
      }
    }
    return Promise.reject(error.response?.data || error.message)
  }
)

export default API
