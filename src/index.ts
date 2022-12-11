import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

function plainObjectToFormData(plainObject: Record<string, any>): FormData | undefined {
  if (Object.getOwnPropertyNames(plainObject).length) {
    const formData = new FormData()
    for (const k in plainObject) {
      formData.append(k, plainObject[k])
    }
    return formData
  }
}

// TRACE & CONNECTED are unsupported
const methods = ['GET', 'PUT', 'POST', 'HEAD', 'DELETE', 'OPTIONS']
const methodsHaveRequestBody = ['PUT', 'POST', 'PATCH']
const methodsHaveResponseBody = ['GET', 'POST', 'PATCH', 'OPTIONS']

interface Method {
  (url: string, dataOrParams?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any>>
  download?: (url: string, dataOrParams?: any, config?: AxiosRequestConfig<any>) => Promise<AxiosResponse<any>>
  upload?: (url: string, dataOrParams?: any, config?: AxiosRequestConfig<any>) => Promise<AxiosResponse<any>>
}

export default (axios: AxiosInstance): {
  [key in typeof methods[number]]: Method | ((url: string, fileName?: string) => Promise<void>)
} => ({
  ...Object.fromEntries(Array.from(methods, (method) => {
    const value = <Method>((url, dataOrParams, config) => axios({
      // config 放在前面的原因: 在 config 中二次指定 method / url / data 是无效的
      // axios.post('123', { a: 1 }, { method: 'put', url: '456', data: { a: 2 } })
      ...config,
      ...methodsHaveRequestBody.includes(method.toUpperCase()) ? { data: dataOrParams } : { params: dataOrParams },
      method,
      url,
    }))

    if (methodsHaveRequestBody.includes(method)) {
      value.upload = (url, dataOrParams, config) => axios({
        ...config,
        data: plainObjectToFormData(dataOrParams),
        method,
        url,
      })
    }

    if (methodsHaveResponseBody.includes(method)) {
      value.download = (url, dataOrParams, config) => axios({
        ...config,
        ...methodsHaveRequestBody.includes(method.toUpperCase())
          ? { data: dataOrParams }
          : { params: dataOrParams },
        responseType: 'blob',
        method,
        url,
      })
    }

    return [method, value]
  })),
  DOWNLOAD: async (url: string, fileName = '') => {
    // 如果是浏览器支持预览的文件会优先预览，否则才会下载
    // window.open(url + stringify(params, { addQueryPrefix: true }))

    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = URL.createObjectURL(await fetch(url).then(res => res.blob()))
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(a.href)
    document.body.removeChild(a)
    return Promise.resolve()
  },
})
