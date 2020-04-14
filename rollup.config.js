import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import builtins from 'builtin-modules'
import external from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named', /** Disable warning for default imports */
  },
  external: builtins,
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      preferBuiltins: true
    }),
    commonjs({
      extensions: ['.js', '.ts', '.tsx']
    }),
    terser(),
    external()
  ],
};
