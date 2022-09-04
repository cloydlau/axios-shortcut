import { identity } from 'lodash-es'

export default (
  json: object,
  mapFn: (value?: any, key?: any) => any = identity
): FormData => {
  const formData = new FormData()
  for (let k in json) {
    const value = mapFn(json[k], k)
    if (value !== undefined) {
      formData.append(k, value)
    }
  }
  return formData
}
