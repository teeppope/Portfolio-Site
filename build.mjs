import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
    entryPoints: [
        {out: 'main', in: './src/js/main.js'},
        {out: 'styles', in: './src/styles/app.css'},
    ],
    bundle: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    loader: { '.woff': 'copy', '.woff2': 'copy', '.svg': 'dataurl' },
    outdir: 'dist',
});

await ctx.watch();
console.log('watching...');
