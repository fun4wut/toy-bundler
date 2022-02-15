const esb = require('esbuild');
const isWatch = process.env.WATCH_MODE === '1';
esb
  .build({
    bundle: true,
    outfile: 'dist/index.js',
    platform: 'node',
    format: 'cjs',
    entryPoints: ['src/index.ts'],
    watch: isWatch && {
      onRebuild(error, result) {
        if (error) {
          console.error('watch build failed:', error);
        } else {
          console.log('watch build succeeded:', result);
        }
      },
    },
    external: ['fsevents'],
    target: ['node12'],
  })
  .then(() => {
    if (isWatch) {
      console.log('building...');
    } else {
      console.log('build done');
    }
  });
