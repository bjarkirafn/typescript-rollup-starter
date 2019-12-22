import sucrase from 'rollup-plugin-sucrase'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      },
      {
        file: pkg.browser,
        format: 'iife',
        name: 'starter'
      }
    ],
    external: [ ...Object.keys(pkg.dependencies || {}) ],
    plugins: [
      // typescript({
      //   typescript: require('typescript')
      // }),
      sucrase({
        transforms: [ 'typescript' ]
      }),
      terser()
    ]
  },
  {
    input: './src/cli.ts',
    output: {
      file: './dist/cli.js',
      format: 'cjs',
      banner: '#!/usr/cli/env node'
    },

    // external: Object.keys(pkg.dependencies).concat(builtinModules, [ 'cmd' ])
    plugins: [
      sucrase({
        transforms: [ 'typescript' ]
      }),
      terser()
    ]
  }
]
