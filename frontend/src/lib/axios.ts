import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api', // This will be proxied through Vite
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to handle common headers
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
