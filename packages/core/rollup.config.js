const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const { terser } = require('rollup-plugin-terser');
const pkg = require('./package.json');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      // Use the tsconfig.json settings
      tsconfig: './tsconfig.json',
      // Explicitly set outputToFilesystem to false since TypeScript handles file output
      outputToFilesystem: false,
      // Let TypeScript handle declarations
      declaration: false,
      declarationMap: false,
      // Exclude test files
      exclude: ['**/*.test.*', '**/*.stories.*', 'node_modules/**']
    }),
    terser({
      output: {
        comments: false
      }
    })
  ],
  external: ['react', 'react-dom']
};