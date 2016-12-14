import ProjectType from "../ProjectType";

export default (projectType: ProjectType) => {
    projectType = projectType || "frontend";
    return {
        "projectType": projectType,
        "port": 5000,
        "liveReloadPort": 35729,
        "distribution": "dist",
        "targets": "targets",
        "styles": "styles",
        "test": "test/**/*.ts",
        "images": "images",
        "assets": "assets",
        "autoprefixer": ["last 2 versions", "> 1%"],
        "scripts": projectType === "frontend" ? "scripts/*" : "lib/*",
        "manifest": null,
        "revisionExclude": [],
        "nodemon": {},
        "uglifyjs": {},
        "onPreBuild": [],
        "onPostBuild": []
    };
};