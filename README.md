#Smild

##The Javascript development system

###Why
The idea behind it's simple: enable **code reuse** and maximize **efficiency**.

By using a set of tools the build system can improve code reusing by requiring external modules using a package manager and build the app continuously using files watchers.

To wrap up, here's a list of the things available:

* JavaScript bundle
* Files watchers
* Live reloading
* CSS automatic vendor prefixes
* SASS support
* Multi target builds
* Code uglify
* Source maps
* TDD/BDD support
* Code coverage
* Doc generation
* Project scaffolding
* Code static analysis

###Install
`npm install smild -g`

###Usage

To create a project just type:
`smild create [projectName]`


###Options

    {
         "projectType": "frontend",
         "port": 5000,
         "liveReloadPort": 35729,
         "bundleFilename": "main",
         "distribution": "dist",
         "targets": "targets",
         "babel": {},
         "typescript": false,
         "styles": "styles",
         "test": "test/**/*",
         "images": "images",
         "views": "views",
         "assets": "assets",
         "autoprefixerRules": ["last 2 versions", "> 1%"],
         "scripts": "scripts/*",
         "manifest": null,
         "revisionExclude": [],
         "onPreBuild": [],
         "onPostBuild": []
    }

###CLI reference:

`$ smild build [target|all]`

Default task, used to package JS, SASS files, images and templates.

Optional: specificy a --release option to enable uglifier and revisioning.

`$ smild watch-build`

Runs the build task every time a dependency change is detected. [Watchify](https://github.com/substack/watchify) is used in this case.

`$ smild test`

Run tests with **Mocha**

`$ smild serve`

Exposes the build through an [Express](http://expressjs.com/) application.

`$ smild js`

Packages JavaScript files with Browserify.

`$ smild styles`

Packages SASS files.

`$ smild images`

Packages images.

`$ smild doc`

Generate documentation with *Mocha doc*.

`$ smild analyze`

Run cyclomatic complexity analysis with *plato*.

##Contribute

I am using [Git Flow](https://github.com/nvie/gitflow).