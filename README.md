<h1 align="center">
  <a href="https://npmjs.com/package/axios-shortcut" target="_blank" rel="noopener noreferrer">
    Axios Shortcut <sup><img alt="version" src="https://versionbadg.es/cloydlau/axios-shortcut.svg"></sup>
  </a>
</h1>

<p align="center">
  Shortcuts for Axios
</p>

<p align="center">
  <a href="https://bundlephobia.com/package/axios-shortcut"><img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/axios-shortcut"></a>
  <a href="https://eslint.org"><img alt="code style" src="https://img.shields.io/badge/code_style-ESLint-4B32C3.svg?logo=eslint"></a>
  <a href="https://conventionalcommits.org"><img alt="conventional commits" src="https://img.shields.io/badge/commits-Conventional-FE5196.svg?logo=conventionalcommits&logoColor=white"></a>
</p>

<br>

## Install

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
      TRACE,
      CONNECT,
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
      TRACE,
      CONNECT,
      DOWNLOAD,
    } = AxiosShortcut(axios)
  </script>
</body>

</html>
```

<br>

## AJAX

```ts
import createAxiosShortcut from 'axios-shortcut'
import request from '@/utils/request'
const axiosShortcut = createAxiosShortcut(
  request // Axios or Axios instance
)

// 注册全局方法
for (const k in axiosShortcut) {
  // Vue 3
  app.config.globalProperties[`$${k}`] = axiosShortcut[k]

  // Vue 2
  Object.defineProperty(Vue.prototype, `$${k}`, {
    value: axiosShortcut[k]
  })
}

/**
 * 快捷方式
 * @param {string} url 接口地址
 * @param {object} data 接口参数（GET/HEAD请求默认使用params）
 * @param {object} config axios配置
 * @returns {Promise<any>} 接口返回
 */
this.$POST
this.$GET
this.$PATCH
this.$PUT
this.$DELETE
this.$HEAD

// 或者直接使用
axiosShortcut.POST()
```

<br>

## Upload

MIME type: `multipart/form-data`

```ts
/**
 * @param {string} url 接口地址
 * @param {object} data 接口参数（GET/HEAD请求默认使用params）
 * @param {object} config axios配置
 * @returns {Promise<any>} 接口返回
 */
this.$POST.upload // 请求方式可以更换
```

<br>

## Download

### AJAX

```ts
/**
 * @param {string} url 接口地址
 * @param {object} data 接口参数（GET/HEAD请求默认使用params）
 * @param {object} config axios配置
 * @returns {Promise<any>} 接口返回
 */
this.$GET.download // 请求方式可以更换
```

### HTTP

```ts
/**
 * @param {string} url 接口地址
 * @param {object} params 接口参数
 * @param {object} config axios配置
 */
this.$DOWNLOAD
```

<br>

## Compare to Axios

| Axios                        | Axios Shortcut                       |
| ---------------------------- | ------------------------------------ |
| get(url[, config])           | **GET(url[, params[, config]])**     |
| delete(url[, config])        | **DELETE(url[, params[, config]])**  |
| head(url[, config])          | **HEAD(url[, params[, config]])**    |
| options(url[, config])       | **OPTIONS(url[, params[, config]])** |
| post(url[, data[, config]])  | POST(url[, data[, config]])          |
| put(url[, data[, config]])   | PUT(url[, data[, config]])           |
| patch(url[, data[, config]]) | PATCH(url[, data[, config]])         |
| -                            | TRACE(url[, params[, config]])       |
| -                            | CONNECT(url[, params[, config]])     |
| request(config)              | -                                    |
| getUri([config])             | -                                    |
| -                            | DOWNLOAD()                           |
| -                            | -                                    |

