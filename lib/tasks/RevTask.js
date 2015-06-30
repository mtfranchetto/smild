var inherits = require('util').inherits,
    Task = require('./Task'),
    RevAll = require('gulp-rev-all'),
    _ = require('lodash');

var RevTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(RevTask, Task);

RevTask.prototype.command = "rev";
RevTask.prototype.availableToModule = false;
RevTask.prototype.action = function () {
    if (!this._buildHelper.isRelease() || this._buildHelper.options.revisionExclude === "*") return;
    var excludedFiles = _.union(
        ['favicon.ico', 'index.html'],
        _.map(this._buildHelper.options.revisionExclude, function (rule) {
            return rule.regexp ? new RegExp(rule.pattern) : rule.pattern;
        }));
    var revTransform = new RevAll({
        dontRenameFile: excludedFiles,
        dontUpdateReference: excludedFiles
    });
    return gulp.src(this._buildHelper.getTemporaryDirectory() + '**')
        .pipe(revTransform.revision())
        .pipe(gulp.dest(this._buildHelper.getDistDirectory()));
};

module.exports = RevTask;