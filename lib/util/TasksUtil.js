var gulp = require('gulp');

var TasksUtil = function () {

    this.getTaskList = function () {
        return gulp.tree().nodes;
    }
};

module.exports = new TasksUtil();