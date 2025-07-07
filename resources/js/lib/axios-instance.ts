// axiosInstance.ts
import axios from 'axios'

// Base konfigurasi
const axiosInstance = axios.create({
    baseURL: '/', // Laravel base, atau ganti sesuai kebutuhan
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
    withCredentials: true, // Penting untuk Sanctum
})

// CSRF setup (khusus Laravel Sanctum)
// axiosInstance.get('/sanctum/csrf-cookie').catch((err) => {
//   console.error('Gagal ambil CSRF Token:', err)
// })

// Interceptor: response error global
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status
        if (status === 401) {
        alert('Session habis. Silakan login ulang.')
        window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
