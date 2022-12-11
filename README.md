<h1 align="center">
  <a href="https://npmjs.com/package/axios-shortcut" target="_blank" rel="noopener noreferrer">
    Axios Shortcut <sup><img alt="version" src="https://versionbadg.es/cloydlau/axios-shortcut.svg"></sup>
  </a>
</h1>

<p align="center">
  Shortcuts for axios.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/axios-shortcut?activeTab=dependencies"><img alt="zero dependencies" src="https://img.shields.io/badge/dependencies-0-green.svg"></a>
  <a href="https://bundlephobia.com/package/axios-shortcut"><img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/axios-shortcut"></a>
  <a href="https://eslint.org"><img alt="code style" src="https://img.shields.io/badge/code_style-ESLint-4B32C3.svg?logo=eslint"></a>
  <a href="https://conventionalcommits.org"><img alt="conventional commits" src="https://img.shields.io/badge/commits-Conventional-FE5196.svg?logo=conventionalcommits&logoColor=white"></a>
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
npm add axios-shortcut
```

### CDN + ESM

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
</head>

<body>
  <script type="importmap">
    {
      "imports": {
        "axios": "https://unpkg.com/axios/dist/esm/axios.min.js",
        "axios-shortcut": "https://unpkg.com/axios-shortcut@0.1/dist/axios-shortcut.mjs"
      }
    }
  </script>
  <script type="module">
    import AxiosShortcut from 'axios-shortcut'
    import axios from 'axios'

    const {
      GET,
      DELETE,
      HEAD,
      OPTIONS,
      POST,
      PUT,
      PATCH,
      DOWNLOAD,
    } = AxiosShortcut(axios)
  </script>
</body>

</html>

```

### CDN + UMD

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
</head>

<body>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://unpkg.com/axios-shortcut@0.1"></script>
  <script>
    const {
      GET,
      DELETE,
      HEAD,
      OPTIONS,
      POST,
      PUT,
      PATCH,
      DOWNLOAD,
    } = AxiosShortcut(axios)
  </script>
</body>

</html>
```

<br>

## Usage

### Create from Axios

```ts
import AxiosShortcut from 'axios-shortcut'
import axios from 'axios'
const axiosShortcut = AxiosShortcut(axios)
```

### Create from Axios Instance

```ts
import AxiosShortcut from 'axios-shortcut'
import request from '@/utils/request'
const axiosShortcut = AxiosShortcut(request)
```

### Register as Global Properties in Vue

```ts
for (const method in axiosShortcut) {
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

> MIME type: `'multipart/form-data'`

```ts
function upload(url: string, dataOrParams?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any>>
```

- `PUT.upload`
- `POST.upload`
- `PATCH.upload`

<br>

## Download

> responseType: `'blob'`

```ts
function download(url: string, dataOrParams?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any>>
```

- `GET.download`
- `POST.download`
- `PATCH.download`
- `OPTIONS.download`

### Download Static Resources

```ts
function DOWNLOAD(url: string, fileName?: string): Promise<void>
```

```ts
// Example

DOWNLOAD('https://xxx.jpg', 'abc.jpg').then(() => {
  // Download completed
})
```

<br>
