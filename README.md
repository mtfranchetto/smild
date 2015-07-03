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
* Compass support
* Build variants
* Code uglify
* Source maps
* TDD/BDD support
* Code coverage
* JSHint support
* Documentation generation
* Project scaffolding
* Cyclomatic complexity

###Install
`npm install smild -g`

###Usage

To create a project just type:
`smild create [projectName]`


###Options

Create a _smild_ field into package.json to customize smild. The default options are:

    {
         "module": false,
         "port": 5000,
         "bundleFilename": "main",
         "distribution": "dist",
         "targets": "targets",
         "babelExtensions": [".es6", ".es"],
         "styles": "styles",
         "test": "test/*",
         "images": "images",
         "views": "views",
         "assets": "assets",
         "externalTestFiles": [],
         "autoprefixerRules": ["last 2 versions", "> 1%"],
         "scripts": module ? "lib/*" : "scripts/*",
         "coverageOutput": "coverage/",
         "analysisOutput": "analysis/",
         "runCoverage": true,
         "testLauncher": "PhantomJS",
         "testTransforms": [],
         "preBuild": [], // { source: "", ext: "", dest: ""}
         "postBuild": [], // { source: "", ext: "", dest: ""}
         "manifest": null,
         "revisionExclude": [],
         "jshint": {
             "node": true,
             "browser": true,
             "esnext": true,
             "bitwise": true,
             "camelcase": true,
             "curly": true,
             "eqeqeq": true,
             "immed": true,
             "indent": 4,
             "latedef": true,
             "newcap": true,
             "noarg": true,
             "quotmark": "single",
             "regexp": true,
             "undef": true,
             "unused": true,
             "strict": true,
             "trailing": true,
             "smarttabs": true
         }
    }

###CLI reference:

`$ smild build [target|all]`

Default task, used to package JS, Compass (CSS) files, images and templates.

Optional: specificy a --release option to enable uglifier and revisioning.

`$ smild watch-build`

Runs the build task every time a dependency change is detected. [Watchify](https://github.com/substack/watchify) is used in this case.

`$ smild test`

Run tests with **[Karma](https://github.com/karma-runner/karma)** and **[Jasmine](http://jasmine.github.io/2.0/introduction.html)**.

`$ smild watch-test`

Runs the build and test tasks every time a dependency change is detected.

`$ smild serve`

Exposes the build through an [Express](http://expressjs.com/) application.

`$ smild hint`

Run [JSHint](http://www.jshint.com/).

`$ smild browserify`

Packages JavaScript files with Browserify.

`$ smild styles`

Packages Compass files.

`$ smild images`

Packages images.

`$ smild doc`

Generate documentation with *markdox*.

`$ smild complexity`

Run cyclomatic complexity analysis with *plato*.

##Contribute

I am using [Git Flow](https://github.com/nvie/gitflow).