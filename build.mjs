import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

let ctx = await esbuild.context({
    entryPoints: [
        {out: 'main', in: './src/js/main.js'},
        {out: 'styles', in: './src/styles/app.scss'},
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
        '.svg': 'dataurl'
    },
    plugins: [
        sassPlugin({
                async transform(source) {
                    const { css } = await postcss([autoprefixer]).process(source, {from: undefined});
                    return css;
                },
            })
    ],
    outdir: 'dist',
});

await ctx.watch();
console.log('watching...');
