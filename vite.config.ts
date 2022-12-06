import type { ConfigEnv, UserConfigExport } from 'vite'
import dts from 'vite-plugin-dts'
import { name, pascalCasedName } from './package.json'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    build: {
      lib: {
        name,
        entry: 'src/index.ts',
      },
      sourcemap: true,
      rollupOptions: {
        external: [
          'axios',
        ],
        output: {
          globals: {
            [name]: pascalCasedName,
            'axios': 'Axios',
          },
        },
      },
    },
    plugins: [dts()],
  }
}
