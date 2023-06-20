import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import { copy } from 'esbuild-plugin-copy';

let ctx = await esbuild.context({
    entryPoints: [
        {out: 'main', in: './src/js/main.js'},
        {out: 'styles', in: './src/styles/app.scss'},
        {out: 'index', in: './src/index.html'},
        {out: 'styleguide', in: './src/styleguide.html'},
    ],
    bundle: true,
    target: [
        'chrome58',
        'firefox57',
        'safari11',
        'edge16'
    ],
    loader: { 
        '.woff': 'copy',
        '.woff2': 'copy',
        '.svg': 'dataurl',
        '.html': 'copy'
    },
    plugins: [
        sassPlugin({
            async transform(source) {
                const { css } = await postcss([autoprefixer]).process(source, {from: undefined});
                return css;
            },
        }),
        copy({
            resolveFrom: 'cwd',
            assets: {
              from: ['./src/assets/*'],
              to: ['./dist/assets', './tmp-assets'],
            },
            watch: true,
          }),
    ],
    outdir: 'dist',
});

await ctx.watch();

let { host, port } = await ctx.serve({
    servedir: 'dist',
})

console.log('watching...');
