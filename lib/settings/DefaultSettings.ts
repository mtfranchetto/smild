export default  {
    projectType: "frontend",
    port: 5000,
    liveReloadPort: 35729,
    distribution: "dist",
    targets: "targets",
    styles: "styles",
    test: " test/**/*.ts",
    images: "images",
    assets: "assets",
    autoprefixer: ["last 2 versions", "> 1%"],
    scripts: "scripts/**/*.ts",
    manifest: null,
    revisionExclude: [],
    nodemon: {},
    uglifyjs: {},
    onPreBuild: [],
    onPostBuild: []
}