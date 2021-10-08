import { stringify } from 'qs'
import { jsonToFormData } from 'kayran'

const CONSOLE_PREFIX = import.meta.env.VITE_APP_CONSOLE_PREFIX
const METHODS_WITH_REQUEST_BODY = ['PUT', 'POST', 'DELETE', 'PATCH']
const METHODS_WITHOUT_REQUEST_BODY = ['GET', 'HEAD']
const METHODS = METHODS_WITH_REQUEST_BODY.concat(METHODS_WITHOUT_REQUEST_BODY)

const createAxiosShortcut = (axios: (args: any) => Promise<any>): {
  'GET'?: (args: any) => Promise<any>,
  'POST'?: (args: any) => Promise<any>,
  'DELETE'?: (args: any) => Promise<any>,
  'PATCH'?: (args: any) => Promise<any>,
  'HEAD'?: (args: any) => Promise<any>,
  'PUT'?: (args: any) => Promise<any>,
  'DOWNLOAD'?: (args: any) => Promise<any>,
} => {
  let result = {}

  const download = (url, data, config: {
    method?: string
  } = {}) => {
    if (config.method) {
      return axios({
        responseType: 'blob',
        url,
        ...METHODS_WITH_REQUEST_BODY.includes(config.method.toUpperCase()) ? { data } : { params: data },
        ...config
      })
    } else {
      window.open(url + stringify(data, { addQueryPrefix: true }))
    }
  }

  (result as any).DOWNLOAD = download

  const upload = (url, data, config) => {
    return axios({
      url,
      method: 'POST',
      data: jsonToFormData(data),
      ...config
    })
  }

  METHODS.map(v => {
    const value = (url, data, config = {}) => {
      return axios({
        method: v,
        url,
        ...METHODS_WITH_REQUEST_BODY.includes(v.toUpperCase()) ? { data } : { params: data },
        ...config
      })
    }

    value.download = function () {
      // arguments不适用于箭头函数
      // @ts-ignore
      const [url, data, config] = arguments
      if (config?.method) {
        console.warn(`${CONSOLE_PREFIX}method无法重复指定`)
      }
      return download(url, data, {
        ...config,
        method: v,
      })
    }

    value.upload = function () {
      // arguments不适用于箭头函数
      // @ts-ignore
      const [url, data, config] = arguments
      if (config?.method) {
        console.warn(`${CONSOLE_PREFIX}method无法重复指定`)
      }
      return upload(url, data, {
        ...config,
        method: v,
      })
    }

    result[v] = value
  })

  return result
}

export default createAxiosShortcut
