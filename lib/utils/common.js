"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStartRouter = isStartRouter;
exports.fixedEndPath = fixedEndPath;
function isStartRouter(path) {
    return path === '/';
}
function fixedEndPath(path) {
    if (isStartRouter(path)) {
        return path;
    }
    return path.replace(/\/$/, '');
}
