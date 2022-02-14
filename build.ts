import * as esbuild from "esbuild";
import { BuildOptions } from "esbuild/lib/main";

let files = [
    ['esm','esm.js'],
    ['esm','esm.min.js'],
    ['cjs','cjs.js'],
    ['cjs','cjs.min.js'],
    ['iife','js'],
    ['iife','min.js'],
]

files.forEach((item) => {
    let [format,ext] = item
    let isMinify = /min/.test(ext)
    esbuild
        .build({
            entryPoints: ["./src/index.ts"],
            bundle: true,
            minify: isMinify,
            format: format as BuildOptions["format"],
            drop: ["debugger", "console"],
            globalName: "Thread",
            outfile: `./dist/thread.${ext}`,
        })
        .catch(() => {});
});
