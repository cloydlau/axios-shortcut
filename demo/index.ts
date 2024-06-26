import axios from 'axios'
import AxiosShortcut from '../src/index'

const {
  POST,
  DOWNLOAD,
} = AxiosShortcut(axios)

POST.upload('upload', { a: '1' })

POST.download('download')

POST('post')

const text = 'Hello World'
const objectURL = URL.createObjectURL(new Blob([text], { type: 'text/plain' }))
DOWNLOAD(objectURL, 'xxx.txt')
