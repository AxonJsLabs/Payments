import { defineConfig } from "tsup";

export default defineConfig({
    entry: [
        "lib/index.ts",
        "lib/plisio/index.ts"
    ],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: false,
    minify: true,
    treeshake: true,
    clean: true,
    skipNodeModulesBundle: true,
    external: ["axios"]
});
