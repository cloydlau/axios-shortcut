import createAxiosShortcut from './axios-shortcut'

export default createAxiosShortcut
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
