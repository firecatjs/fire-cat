"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixedEndPath = exports.isStartRouter = void 0;
function isStartRouter(path) {
    return path === '/';
}
exports.isStartRouter = isStartRouter;
function fixedEndPath(path) {
    if (isStartRouter(path)) {
        return path;
    }
    return path.replace(/\/$/, '');
}
exports.fixedEndPath = fixedEndPath;
