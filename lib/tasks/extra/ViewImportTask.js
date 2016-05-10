"use strict";

const Promise = require('bluebird');
const Task = require('../Task');
const path = require('path');
const ProjectType = require('../../ProjectType');
const fs = require('fs');

class ViewImportTask extends Task {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.availableTo = [ProjectType.FRONTEND];
    }

    action() {
        var _ = require('lodash');
        var views = require('../../RequireViews')({
            dirname: path.join(process.cwd(), this._buildManager.options.views),
            filter: /(.+)\.tsx$/,
            map: function (name) {
                return name[0].toUpperCase() + name.slice(1);
            }
        });
        const exportFolder = path.join(process.cwd(), this._buildManager.options.views, 'export.js');
        process.env.EXPORT_VIEWS_PATH = exportFolder;
        fs.writeFileSync(exportFolder, 'module.exports = ' + JSON.stringify(views).replace(/"/gmi, ''));
        return Promise.resolve();
    }
}

module.exports = ViewImportTask;