import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import inject from 'rollup-plugin-inject'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import flow from 'rollup-plugin-flow'
import uglify from 'rollup-plugin-uglify'

const processShim = '\0process-shim'

const prod = process.env.PRODUCTION
const mode = prod ? 'production' : 'development'

console.log(`Creating ${mode} bundle...`)

const targets = prod ?
[
  { dest: 'dist/reactlite.min.js', format: 'umd' },
] :
[
  { dest: 'dist/reactlite.js', format: 'umd' },
  // { dest: 'dist/reactlite.es.js', format: 'es' },
]

const plugins = [
  // Unlike Webpack and Browserify, Rollup doesn't automatically shim Node
  // builtins like `process`. This ad-hoc plugin creates a 'virtual module'
  // which includes a shim containing just the parts the bundle needs.
  {
    resolveId(importee) {
      if (importee === processShim) return importee
      return null
    },
    load(id) {
      if (id === processShim) return 'export default { argv: [], env: {} }'
      return null
    },
  },
  flow(),
  nodeResolve(),
  commonjs(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development'),
  }),
  inject({
    process: processShim,
  }),
  babel({
    babelrc: false,
    presets: [
      ['latest', { es2015: { modules: false } }],
      "react"
    ],
    plugins: [
      'transform-decorators-legacy',
      'flow-react-proptypes',
      'transform-flow-strip-types',
      'external-helpers',
      'transform-object-rest-spread',
      'transform-class-properties',
    ],
  }),
  json(),
]

if (prod) plugins.push(uglify())

export default {
  entry: 'src/index.js',
  moduleName: 'reactlite',
  external: ['react', 'react-dom', 'react-redux', 'redux', 'redux-thunk', 'react-addons-update', 'styled-components'],
  exports: 'named',
  targets,
  plugins,
  // globals: { react: 'React'},
}
