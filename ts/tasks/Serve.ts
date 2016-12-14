import {buildHelper as helper, taskRunner} from "../Container";
import * as express from "express";
import {cyan} from "chalk";

export default function Serve() => {
    let settings = helper.getSettings(),
        server = express();

    server.use(express.static(helper.getDistFolder()));
    server.all('/*', _.bind(function (req, res) {
        res.sendFile('index.html', {root: helper.getDistFolder()});
    }, this));

    server.listen(settings.port);
    console.log(cyan('Target ' + helper.getCurrentTarget() + ' listening on http://localhost:' + settings.port));
    return Promise.resolve();
}