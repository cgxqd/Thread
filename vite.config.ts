import { defineConfig } from "vite";
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "Thread",
            fileName: (format) => `thread.${format}.js`,
        }
    },
});
