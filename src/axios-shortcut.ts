import { stringify } from 'qs'
import { identity } from 'lodash-es'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

function jsonToFormData(
  json: any,
  mapFn: (value?: any, key?: any) => any = identity,
): FormData {
  const formData = new FormData()
  for (const k in json) {
    const value = mapFn(json[k], k)
    if (value !== undefined) {
      formData.append(k, value)
    }
  }
  return formData
}

const methods = ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'TRACE', 'CONNECT']
const methodsHaveRequestBody = ['PUT', 'POST', 'PATCH']
const methodsHaveResponseBody = ['GET', 'POST', 'CONNECT', 'OPTIONS', 'PATCH']

export default <T = any, R = AxiosResponse<T>, D = any>(axios: AxiosInstance): {
  'PUT': (url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<R>
  'POST': (url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<R>
  'PATCH': (url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<R>
  'GET': (url: string, params?: D, config?: AxiosRequestConfig<D>) => Promise<R>
  'HEAD': (url: string, params?: D, config?: AxiosRequestConfig<D>) => Promise<R>
  'DELETE': (url: string, params?: D, config?: AxiosRequestConfig<D>) => Promise<R>
  'OPTIONS': (url: string, params?: D, config?: AxiosRequestConfig<D>) => Promise<R>
  'TRACE': (url: string, params?: D, config?: AxiosRequestConfig<D>) => Promise<R>
  'CONNECT': (url: string, params?: D, config?: AxiosRequestConfig<D>) => Promise<R>
  'DOWNLOAD': (url: string, params?: D) => void
} => ({
  ...Object.fromEntries(Array.from(methods, (method) => {
    const value = (url: string, data?: D, config?: AxiosRequestConfig<D>) => {
      return axios({
        method,
        url,
        ...methodsHaveRequestBody.includes(method.toUpperCase()) ? { data } : { params: data },
        ...config,
      })
    }

    if (methodsHaveResponseBody.includes(method)) {
      value.download = (url: string, dataOrParams?: D, config?: AxiosRequestConfig<D>) => {
        return axios({
          responseType: 'blob',
          url,
          method,
          ...methodsHaveRequestBody.includes(method.toUpperCase())
            ? { data: dataOrParams }
            : { params: dataOrParams },
          ...config,
        })
      }
    }

    if (methodsHaveRequestBody.includes(method)) {
      value.upload = (url: string, data?: D, config?: AxiosRequestConfig<D>) => {
        return axios({
          url,
          method: 'POST',
          data: jsonToFormData(data),
          ...config,
        })
      }
    }

    return [method, value]
  })),
  DOWNLOAD: (url: string, params?: any) => {
    window.open(url + stringify(params, { addQueryPrefix: true }))
  },
})
