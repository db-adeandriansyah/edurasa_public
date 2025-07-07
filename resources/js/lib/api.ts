import axios from './axios-instance'
import { showError } from './toast'

export type RequestParams = Record<string, any>
type Headers = Record<string, string>
export type FetchOptions = {
  params?: RequestParams
  headers?: Headers
}

// export const apiGet = async <T = any>(
//   url: string,
//   options: FetchOptions = {}
// ): Promise<T> => {
//   try{

//   }catch(err){}
//   const response = await axios.get(url, options)
//   return response.data
// }
export const apiGet = async <T = any>(url: string, options = {},showToast:boolean = true): Promise<T> => {
  try {
    const res = await axios.get(url, options)
    return res.data
  } catch (error: any) {
    (showToast && showError(error?.response?.data?.message || 'Gagal memuat data.'));
    throw error
  }
}
export const apiPost = async <T = any>(
  url: string,
  data: any,
  options: FetchOptions = {}
): Promise<T> => {
  const response = await axios.post(url, data, options)
  return response.data
}

export const apiPut = async <T = any>(
  url: string,
  data: any,
  options: FetchOptions = {}
): Promise<T> => {
  const response = await axios.put(url, data, options)
  return response.data
}

export const apiDelete = async <T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  const response = await axios.delete(url, options)
  return response.data
}
