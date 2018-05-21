import {VoidHook} from "../tasks/Hooks";

export default  {
    projectType: "frontend",
    port: 5000,
    liveReloadPort: 35729,
    distribution: "dist",
    targets: "targets",
    bootstrapperStyles: "",
    watchStyles: [
        "styles"
    ],
    test: "test/**/*.ts",
    images: "images",
    assets: "assets",
    autoprefixer: ["last 2 versions", "> 1%"],
    scripts: "scripts/**/*.{ts,tsx}",
    revisionExclude: [],
    nodemon: {},
    uglifyjs: {
        output: {
            "ascii_only": true
        }
    },
    preBuild: VoidHook,
    postBuild: VoidHook,
    typescriptPath: require.resolve("typescript")
}