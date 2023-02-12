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

type Method = (
  url: string,
  dataOrParams?: any,
  config?: AxiosRequestConfig<any>,
) => Promise<AxiosResponse<any>>

interface MethodCanUpload {
  (url: string, dataOrParams?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any>>
  upload: (
    url: string,
    dataOrParams?: any,
    config?: AxiosRequestConfig<any>,
  ) => Promise<AxiosResponse<any>>
}

interface MethodCanDownload {
  (url: string, dataOrParams?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any>>
  download: (
    url: string,
    dataOrParams?: any,
    config?: AxiosRequestConfig<any>,
  ) => Promise<AxiosResponse<any>>
}

export default (axios: AxiosInstance) => ({
  ...Object.fromEntries(
    Array.from(methods, (method) => {
      const value = <Method>((url, dataOrParams, config) =>
        axios({
          // config 放在前面的原因: 在 config 中二次指定 method / url / data 是无效的
          // axios.post('123', { a: 1 }, { method: 'put', url: '456', data: { a: 2 } })
          ...config,
          ...(methodsHaveRequestBody.includes(method.toUpperCase())
            ? { data: dataOrParams }
            : { params: dataOrParams }),
          method,
          url,
        }))

      if (methodsHaveRequestBody.includes(method)) {
        ;(value as MethodCanUpload).upload = (url, dataOrParams, config) =>
          axios({
            ...config,
            data: plainObjectToFormData(dataOrParams),
            method,
            url,
          })
      }

      if (methodsHaveResponseBody.includes(method)) {
        ;(value as MethodCanDownload).download = (url, dataOrParams, config) =>
          axios({
            ...config,
            ...(methodsHaveRequestBody.includes(method.toUpperCase())
              ? { data: dataOrParams }
              : { params: dataOrParams }),
            responseType: 'blob',
            method,
            url,
          })
      }

      return [method, value]
    }),
  ),
  DOWNLOAD: (url: string, fileName = ''): void => {
    // 如果是浏览器支持预览的文件会优先预览，否则才会下载
    // window.open(url + stringify(params, { addQueryPrefix: true }))

    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url

    // Content-Disposition 响应头中指定的文件名优先级更高
    a.download = fileName

    // appendChild 和 remove 操作主要是为了兼容 Firefox 浏览器
    // 在 Firefox 浏览器下调用该方法如果不将创建的 <a> 标签添加到 body 里，点击链接不会有任何反应，无法触发下载
    // 而在 Chrome 浏览器中则不受此影响
    document.body.appendChild(a)

    a.click()
    URL.revokeObjectURL(a.href)
    document.body.removeChild(a)
  },
})
