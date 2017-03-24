# Smild

![smild](http://i62.tinypic.com/xf1cgk.png)

## The Typescript development system

Isomorphic tool to scaffold, build and test frontend/backend projects. Here's what you'll receive with the package:

* Typescript bundling
* Live reloading
* Sass support
* Multi target builds
* Minification
* Source maps
* BDD support
* Code coverage
* Scaffolding
* NodeJS support

### Install
`npm install smild -g`

### Usage

To create a project just type:
`smild new [projectName] --type [frontend|module|nodejs]`

### Default settings

    {
        projectType: "frontend",
        port: 5000,
        liveReloadPort: 35729,
        distribution: "dist",
        targets: "targets",
        styles: "styles",
        test: "test/**/*.ts",
        images: "images",
        assets: "assets",
        autoprefixer: ["last 2 versions", "> 1%"],
        scripts: "scripts/**/*.{ts,tsx}",
        revisionExclude: [],
        nodemon: {},
        uglifyjs: {},
        preBuild: VoidHook,
        postBuild: VoidHook
    }

### CLI reference:

`$ smild build [target|all]`

Bundle the application or the module.

Optional: specify a --release option to enable minification and revisioning.

`$ smild watch-build`

Runs the build task every time a dependency change is detected with *watchify*.
On a NodeJS project *nodemon* is used to keep the app rebuilding.

`$ smild test`

Run tests with **Mocha**

`$ smild coverage`

Get projection coverage with **nyc**

## Contribute

I am using [Git Flow](https://github.com/nvie/gitflow).