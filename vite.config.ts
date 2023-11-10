import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'
import { PascalCasedName, name } from './package.json'

export default {
  build: {
    lib: {
      name,
      entry: 'src/index.ts',
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        globals: {
          [name]: PascalCasedName,
        },
      },
    },
  },
  plugins: [
    dts({ rollupTypes: true }),
    { ...visualizer(), apply: 'build' },
  ],
}
