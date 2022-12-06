import { expect, it } from 'vitest'
import jsonToFormData from '../src/jsonToFormData'

const formDataToJSON = (formData: FormData): object => {
  const json = {}
  // @ts-expect-error
  for (const [k, v] of formData.entries()) {
    json[k] = v
  }
  return json
}

// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
it('jsonToFormData', () => {
  it('default', () => {
    const json = {
      a: '1',
      b: '2',
    }

    const formData = jsonToFormData(json)

    let flag = true; let cnt = 0
    for (const k in json) {
      cnt++
      if (formData.get(k) !== String(json[k])) {
        flag = false
      }
    }

    expect(flag).toEqual(true)
    expect(cnt).toEqual(Object.getOwnPropertyNames(json).length)
  })

  it('mapFn', () => {
    const json = {
      a: NaN,
      b: null,
      c: undefined,
      d: 123,
    }

    expect(formDataToJSON(jsonToFormData(json, (v, k) => {
      if (v) {
        return v
      }
    }))).toEqual({
      d: '123',
    })
  })

  it('prototype', () => {
    if (FormData.from === undefined) {
      FormData.from = jsonToFormData
    }

    const json = {
      a: '1',
      b: '2',
    }

    const formData = FormData.from(json)

    let flag = true; let cnt = 0
    for (const k in json) {
      cnt++
      if (formData.get(k) !== String(json[k])) {
        flag = false
      }
    }

    expect(flag).toEqual(true)
    expect(cnt).toEqual(Object.getOwnPropertyNames(json).length)
  })
})
