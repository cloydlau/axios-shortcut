<h1 align="center">
  <a href="https://npmjs.com/package/axios-shortcut" target="_blank" rel="noopener noreferrer">
    Axios Shortcut <sup><img alt="version" src="https://img.shields.io/npm/v/axios-shortcut.svg?style=flat-square&color=white&label="></sup>
  </a>
</h1>

<p align="center">
  Shortcuts for <a href="https://github.com/axios/axios">Axios</a>.
</p>

<p align="center">
  <!-- <a href="https://www.npmjs.com/package/axios-shortcut?activeTab=dependencies"><img alt="zero dependencies" src="https://badgen.net/bundlephobia/dependency-count/axios-shortcut"></a> -->
  <a href="https://www.npmjs.com/package/axios-shortcut?activeTab=versions"><img alt="created at" src="https://img.shields.io/github/created-at/cloydlau/axios-shortcut?&color=1C404E&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNDggNDgiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik04IDQwaDMyVjI0SDh6Ii8+PHBhdGggc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIgZD0iTTQwIDQwSDhtMzIgMEg0aDRtMzIgMGg0bS00IDBWMjRIOHYxNiIvPjxwYXRoIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiIGQ9Im00MCAzNGwtNC0ybC00IDJsLTQtMmwtNCAybC00LTJsLTQgMmwtNC0ybC00IDJtMjQtMTB2LTltLTggOXYtOW0tOCA5di05bTE2LTVWOG0tOCAyVjhtLTggMlY4TTggMjR2MTZtMzItMTZ2MTYiLz48L2c+PC9zdmc+"></a>
  <a href="https://github.com/antfu/eslint-config"><img alt="code style" src="https://antfu.me/badge-code-style.svg"></a>
  <a href="https://bundlephobia.com/package/axios-shortcut"><img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/axios-shortcut"></a>
  <a href="https://arethetypeswrong.github.io/?p=axios-shortcut"><img alt="attw" src="https://img.shields.io/badge/are_the_types_wrong%3F-analyze-3178C6?logo=typescript&logoColor=white"></a>
  <a href="https://conventionalcommits.org"><img alt="conventional commits" src="https://img.shields.io/badge/commits-Conventional-FE5196.svg?logo=conventionalcommits"></a>
  <a href="https://semantic-release.gitbook.io"><img alt="semantic release" src="https://img.shields.io/badge/release-semantic-e10079?logo=semantic-release"></a>
  <a href="https://pr.new"><img src="https://developer.stackblitz.com/img/start_pr_dark_small.svg" alt="Start new PR in StackBlitz Codeflow"></a>
</p>

<br>

## Compare to Axios

| Axios                        | Axios Instance               | Axios Shortcut                       |
| ---------------------------- | ---------------------------- | ------------------------------------ |
| -                            | getUri([config])             | -                                    |
| request(config)              | request(config)              | -                                    |
| get(url[, config])           | get(url[, config])           | **GET(url[, params[, config]])**     |
| delete(url[, config])        | delete(url[, config])        | **DELETE(url[, params[, config]])**  |
| head(url[, config])          | head(url[, config])          | **HEAD(url[, params[, config]])**    |
| options(url[, config])       | options(url[, config])       | **OPTIONS(url[, params[, config]])** |
| post(url[, data[, config]])  | post(url[, data[, config]])  | POST(url[, data[, config]])          |
| put(url[, data[, config]])   | put(url[, data[, config]])   | PUT(url[, data[, config]])           |
| patch(url[, data[, config]]) | patch(url[, data[, config]]) | PATCH(url[, data[, config]])         |
| -                            | -                            | DOWNLOAD(url[, fileName])            |

<br>

## Install

### NPM

```shell
npm i axios-shortcut
```

### CDN + ESM

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>

  <body>
    <script type="importmap">
      {
        "imports": {
          "axios": "https://cdn.jsdelivr.net/npm/axios/dist/esm/axios.min.js",
          "axios-shortcut": "https://cdn.jsdelivr.net/npm/axios-shortcut@0.1/dist/axios-shortcut.mjs"
        }
      }
    </script>
    <script type="module">
      import AxiosShortcut from 'axios-shortcut'
      import axios from 'axios'

      const { GET, DELETE, HEAD, OPTIONS, POST, PUT, PATCH, DOWNLOAD } = AxiosShortcut(axios)
    </script>
  </body>
</html>
```

### CDN + IIFE

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>

  <body>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios-shortcut@0.1"></script>
    <script>
      const { GET, DELETE, HEAD, OPTIONS, POST, PUT, PATCH, DOWNLOAD } = AxiosShortcut(axios)
    </script>
  </body>
</html>
```

<br>

## Usage

### Create from Axios

```ts
import axios from 'axios'
import AxiosShortcut from 'axios-shortcut'

const axiosShortcut = AxiosShortcut(axios)
```

### Create from Axios Instance

```ts
import request from '@/utils/request'
import AxiosShortcut from 'axios-shortcut'

const axiosShortcut = AxiosShortcut(request)
```

### Register as Global Properties in Vue

```ts
for (const k in axiosShortcut) {
  // Vue 3
  app.config.globalProperties[`$${k}`] = axiosShortcut[k]

  // Vue 2
  Object.defineProperty(Vue.prototype, `$${k}`, {
    value: axiosShortcut[k]
  })
}
```

<br>

## Upload

Request Header: `Content-Type: multipart/form-data`

```ts
(url: string, dataOrParams?: any, config?: AxiosRequestConfig<any>) => Promise<AxiosResponse<any>>
```

- `PUT.upload`
- `POST.upload`
- `PATCH.upload`

<br>

## Download

responseType: `'blob'`

Note the default value of `XMLHttpRequest.responseType` is `'text'`

And the default value of `AxiosRequestConfig.responseType` is `'json'`

```ts
(url: string, dataOrParams?: any, config?: AxiosRequestConfig<any>) => Promise<AxiosResponse<any>>
```

- `GET.download`
- `POST.download`
- `PATCH.download`
- `OPTIONS.download`

<br>

## Download Static Resources

Response Header: `Content-Disposition: attachment`

```ts
(url: string, fileName = '') => undefined
```

### Remote Static Resources (URLs)

```ts
DOWNLOAD('https://xxx.jpg', 'xxx.jpg')
```

### Remote Cross Origin Static Resources (URLs)

```ts
GET.download('https://xxx.jpg').then((res) => {
  DOWNLOAD(URL.createObjectURL(res.data), 'xxx.jpg')
})
```

### Local Static Resources (Object URLs)

```ts
// Plain Text
const text = 'Hello World'
const objectURL = URL.createObjectURL(new Blob([text], { type: 'text/plain' }))
DOWNLOAD(objectURL, 'xxx.txt')

// JSON
const json = { hello: 'world' }
const objectURL = URL.createObjectURL(new Blob([JSON.stringify(json)], { type: 'application/json' }))
DOWNLOAD(objectURL, 'xxx.json')
```

<br>

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/cloydlau/axios-shortcut/releases)

<br>
