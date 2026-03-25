"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStartRouter = isStartRouter;
exports.ensureLeadingSlash = ensureLeadingSlash;
exports.fixedEndPath = fixedEndPath;
exports.joinRoutePaths = joinRoutePaths;
function isStartRouter(path) {
    return path === '/';
}
function ensureLeadingSlash(path) {
    if (!path) {
        return '/';
    }
    return path.startsWith('/') ? path : "/".concat(path);
}
function fixedEndPath(path) {
    var normalized = ensureLeadingSlash(path).replace(/\/+/g, '/');
    if (isStartRouter(normalized)) {
        return normalized;
    }
    return normalized.replace(/\/$/, '');
}
function joinRoutePaths() {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    var safePaths = paths
        .filter(function (item) { return typeof item === 'string' && item.length > 0; })
        .map(function (path) { return path.trim(); })
        .filter(Boolean);
    if (safePaths.length === 0) {
        return '/';
    }
    var merged = safePaths
        .map(function (path, index) {
        if (index === 0) {
            return ensureLeadingSlash(path).replace(/\/$/, '');
        }
        return path.replace(/^\/+/, '').replace(/\/$/, '');
    })
        .filter(function (segment, index) { return segment.length > 0 || index === 0; })
        .join('/');
    return fixedEndPath(merged || '/');
}
