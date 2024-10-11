import { visualizer } from 'rollup-plugin-visualizer'
import { name, PascalCasedName } from './package.json'

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
    { ...visualizer(), apply: 'build' },
  ],
}
