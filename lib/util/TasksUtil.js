"use strict";

const gulp = require('gulp');

class TasksUtil {

    static getTaskList() {
        return gulp.tree().nodes;
    }
}

module.exports = TasksUtil;