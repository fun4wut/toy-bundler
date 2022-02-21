import { Bundler } from './bundler';
const input = process.argv[2];

new Bundler({
  input: input || './tests/c.js',
  output: './playground/bundled.js',
  external: ['fsevents'],
}).doBundle();