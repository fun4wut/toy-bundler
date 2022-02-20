import { Bundler } from './bundler';

new Bundler({
  input: './tests/c.js',
  output: './playground/bundled.js',
  external: [],
}).doBundle();