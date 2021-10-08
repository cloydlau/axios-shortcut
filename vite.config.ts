//import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { name } from './package.json'

// https://vitejs.dev/config/
export default {
  plugins: [
    //peerDepsExternal(),
  ],
  build: {
    lib: {
      name,
      entry: 'src/main.ts'
    },
    rollupOptions: {
      external: [
        'qs',
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'qs': 'qs',
        }
      },
    }
  }
}
