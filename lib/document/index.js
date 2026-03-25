"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireDocument = void 0;
var tslib_1 = require("tslib");
var types_1 = require("../types");
var common_1 = require("../utils/common");
var FireDocument = (function () {
    function FireDocument() {
    }
    FireDocument.appendDocument = function (path, routes) {
        FireDocument.documents.push({
            path: path,
            routes: routes
        });
    };
    FireDocument.createDocumentPayload = function (router, config) {
        var body = [];
        router.getDocumentStore().forEach(function (item) {
            item.routes.forEach(function (route) {
                var mission = {
                    path: (0, common_1.fixedEndPath)(route.path || item.path),
                    methods: route.method,
                    rule: [],
                    description: route.description,
                };
                route.middlewares.forEach(function (intItem) {
                    if (intItem.type == types_1.InterceptorType.RULE) {
                        mission.rule.push(intItem.data);
                    }
                });
                body.push(mission);
            });
        });
        body.sort(function (prev, next) { return prev.path.localeCompare(next.path); });
        return {
            title: config.title,
            description: config.description,
            date: config.date,
            version: config.version,
            body: body,
        };
    };
    FireDocument.server = function (router, path, config) {
        var normalizedPath = (0, common_1.fixedEndPath)(path);
        var jsonPath = (0, common_1.fixedEndPath)("".concat(normalizedPath, "/json"));
        router.router.get(normalizedPath, function (ctx) {
            var doc = FireDocument.createDocumentPayload(router, config);
            if (ctx.query.format === 'json') {
                ctx.body = doc;
                return;
            }
            ctx.type = 'text/html; charset=utf-8';
            ctx.body = FireDocument.renderDocumentPage(doc, jsonPath);
        });
        router.router.get(jsonPath, function (ctx) {
            ctx.body = FireDocument.createDocumentPayload(router, config);
        });
    };
    FireDocument.renderDocumentPage = function (doc, jsonPath) {
        var title = escapeHtml(doc.title || 'API Document');
        var description = escapeHtml(doc.description || 'FireCat document service');
        var version = escapeHtml(String(doc.version || '1.0.0'));
        var date = escapeHtml(formatDocDate(doc.date));
        var routeCount = doc.body.length;
        var sections = createSections(doc.body);
        var navHtml = sections.map(function (section) {
            var children = section.items.map(function (item) {
                return "<a class=\"nav-link\" href=\"#".concat(item.anchor, "\"><span class=\"nav-method method-").concat(item.methods, "\">").concat(item.methods.toUpperCase(), "</span><span class=\"nav-text\">").concat(escapeHtml(item.path), "</span></a>");
            }).join('');
            return "\n        <section class=\"nav-group\">\n          <div class=\"nav-group-title\">".concat(escapeHtml(section.title), "</div>\n          <div class=\"nav-group-list\">").concat(children, "</div>\n        </section>\n      ");
        }).join('');
        var contentHtml = sections.map(function (section) {
            var itemsHtml = section.items.map(function (item) { return renderEndpointCard(item); }).join('');
            return "\n        <section class=\"section-block\" id=\"".concat(section.anchor, "\">\n          <div class=\"section-heading\">\n            <h2>").concat(escapeHtml(section.title), "</h2>\n            <p>").concat(section.items.length, " endpoint").concat(section.items.length > 1 ? 's' : '', "</p>\n          </div>\n          <div class=\"endpoint-list\">").concat(itemsHtml, "</div>\n        </section>\n      ");
        }).join('');
        return "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>".concat(title, "</title>\n  <style>\n    :root {\n      --bg: #f7f9fc;\n      --panel: #ffffff;\n      --panel-soft: #fbfcfe;\n      --line: #dfe7ef;\n      --text: #22313f;\n      --muted: #62707f;\n      --shadow: 0 10px 30px rgba(15, 23, 42, 0.06);\n      --green: #49cc90;\n      --green-soft: rgba(73, 204, 144, 0.12);\n      --blue: #61affe;\n      --blue-soft: rgba(97, 175, 254, 0.12);\n      --orange: #fca130;\n      --orange-soft: rgba(252, 161, 48, 0.12);\n      --red: #f93e3e;\n      --red-soft: rgba(249, 62, 62, 0.12);\n      --gray: #9099a3;\n      --gray-soft: rgba(144, 153, 163, 0.12);\n    }\n\n    * { box-sizing: border-box; }\n    html { scroll-behavior: smooth; }\n    body {\n      margin: 0;\n      font-family: \"Segoe UI\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", sans-serif;\n      color: var(--text);\n      background: var(--bg);\n      min-height: 100vh;\n    }\n\n    a { color: inherit; text-decoration: none; }\n\n    .shell {\n      width: min(1440px, calc(100vw - 40px));\n      margin: 20px auto;\n      display: grid;\n      grid-template-columns: 280px minmax(0, 1fr);\n      gap: 16px;\n      align-items: start;\n    }\n\n    .sidebar,\n    .content {\n      background: var(--panel);\n      border: 1px solid var(--line);\n      border-radius: 10px;\n      box-shadow: var(--shadow);\n    }\n\n    .sidebar {\n      position: sticky;\n      top: 16px;\n      padding: 18px 16px;\n      overflow: hidden;\n    }\n\n    .brand {\n      padding-bottom: 16px;\n      border-bottom: 1px solid var(--line);\n      margin-bottom: 16px;\n    }\n\n    .eyebrow {\n      display: inline-flex;\n      align-items: center;\n      gap: 6px;\n      padding: 4px 8px;\n      border-radius: 4px;\n      background: #e8f1fb;\n      color: #3b4f65;\n      font-size: 11px;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n\n    .brand h1 {\n      margin: 12px 0 8px;\n      font-size: 26px;\n      line-height: 1.15;\n    }\n\n    .brand p {\n      margin: 0;\n      color: var(--muted);\n      line-height: 1.55;\n      font-size: 14px;\n    }\n\n    .meta-grid {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 10px;\n      margin: 16px 0;\n    }\n\n    .meta-card {\n      padding: 12px;\n      border-radius: 8px;\n      background: var(--panel-soft);\n      border: 1px solid var(--line);\n    }\n\n    .meta-card span {\n      display: block;\n      color: var(--muted);\n      font-size: 12px;\n      margin-bottom: 4px;\n    }\n\n    .meta-card strong {\n      display: block;\n      font-size: 16px;\n    }\n\n    .aside-actions {\n      display: flex;\n      flex-direction: column;\n      gap: 8px;\n      margin-bottom: 16px;\n    }\n\n    .action-link {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 10px 12px;\n      border-radius: 8px;\n      border: 1px solid var(--line);\n      background: var(--panel-soft);\n      color: var(--text);\n      font-weight: 600;\n      font-size: 13px;\n    }\n\n    .catalog-title {\n      font-size: 13px;\n      color: var(--muted);\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      margin: 6px 0 12px;\n    }\n\n    .nav-group + .nav-group {\n      margin-top: 14px;\n      padding-top: 14px;\n      border-top: 1px solid var(--line);\n    }\n\n    .nav-group-title {\n      font-size: 14px;\n      font-weight: 700;\n      margin-bottom: 8px;\n    }\n\n    .nav-group-list {\n      display: flex;\n      flex-direction: column;\n      gap: 6px;\n    }\n\n    .nav-link {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      padding: 8px 10px;\n      border-radius: 6px;\n      transition: background 0.18s ease;\n    }\n\n    .nav-link:hover {\n      background: #f4f8fc;\n    }\n\n    .nav-method,\n    .endpoint-method {\n      min-width: 54px;\n      text-align: center;\n      padding: 5px 8px;\n      border-radius: 3px;\n      font-size: 11px;\n      font-weight: 800;\n      letter-spacing: 0.05em;\n      border: 1px solid transparent;\n    }\n\n    .method-get { background: var(--green-soft); color: #1f7a52; border-color: rgba(73, 204, 144, 0.36); }\n    .method-post { background: var(--blue-soft); color: #185e9d; border-color: rgba(97, 175, 254, 0.36); }\n    .method-put,\n    .method-patch { background: var(--orange-soft); color: #a5620e; border-color: rgba(252, 161, 48, 0.36); }\n    .method-del,\n    .method-delete { background: var(--red-soft); color: #b02222; border-color: rgba(249, 62, 62, 0.3); }\n    .method-head,\n    .method-all { background: var(--gray-soft); color: #5d6670; border-color: rgba(144, 153, 163, 0.34); }\n\n    .nav-text {\n      min-width: 0;\n      font-size: 12px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    .content {\n      padding: 20px;\n    }\n\n    .hero {\n      padding: 22px;\n      border-radius: 10px;\n      background: linear-gradient(180deg, #ffffff 0%, #f9fbfd 100%);\n      border: 1px solid var(--line);\n    }\n\n    .hero h2 {\n      margin: 12px 0 10px;\n      font-size: 30px;\n      line-height: 1.15;\n      max-width: none;\n    }\n\n    .hero p {\n      max-width: 900px;\n      margin: 0;\n      color: var(--muted);\n      line-height: 1.7;\n      font-size: 14px;\n    }\n\n    .hero-stats {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 10px;\n      margin-top: 16px;\n    }\n\n    .hero-stat {\n      padding: 10px 12px;\n      border-radius: 8px;\n      background: var(--panel-soft);\n      border: 1px solid var(--line);\n      min-width: 108px;\n    }\n\n    .hero-stat span {\n      display: block;\n      font-size: 12px;\n      color: var(--muted);\n      margin-bottom: 4px;\n    }\n\n    .hero-stat strong {\n      font-size: 18px;\n    }\n\n    .section-block {\n      margin-top: 18px;\n      padding: 18px;\n      border-radius: 10px;\n      background: var(--panel);\n      border: 1px solid var(--line);\n    }\n\n    .section-heading {\n      display: flex;\n      align-items: baseline;\n      justify-content: space-between;\n      gap: 12px;\n      margin-bottom: 18px;\n    }\n\n    .section-heading h2 {\n      margin: 0;\n      font-size: 22px;\n    }\n\n    .section-heading p {\n      margin: 0;\n      color: var(--muted);\n      font-size: 13px;\n    }\n\n    .endpoint-list {\n      display: grid;\n      gap: 12px;\n    }\n\n    .endpoint-card {\n      border-radius: 6px;\n      border: 1px solid var(--line);\n      overflow: hidden;\n      background: #fff;\n    }\n\n    .endpoint-summary {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      flex-wrap: wrap;\n      padding: 12px 14px;\n      cursor: pointer;\n      list-style: none;\n    }\n\n    .endpoint-summary::-webkit-details-marker {\n      display: none;\n    }\n\n    .endpoint-summary-main {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      min-width: 0;\n      flex: 1;\n    }\n\n    .endpoint-summary-side {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      color: var(--muted);\n      font-size: 12px;\n    }\n\n    .endpoint-toggle {\n      transition: transform 0.18s ease;\n    }\n\n    .endpoint-card[open] .endpoint-toggle {\n      transform: rotate(90deg);\n    }\n\n    .endpoint-path {\n      font-family: \"SFMono-Regular\", \"Menlo\", \"Monaco\", \"Consolas\", monospace;\n      font-size: 14px;\n      word-break: break-all;\n    }\n\n    .endpoint-inline-desc {\n      color: var(--muted);\n      font-size: 13px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      max-width: 280px;\n    }\n\n    .endpoint-body {\n      padding: 16px 16px 18px;\n      border-top: 1px solid var(--line);\n      background: #fafbfd;\n    }\n\n    .endpoint-desc {\n      color: var(--muted);\n      line-height: 1.7;\n      font-size: 14px;\n      margin-bottom: 14px;\n    }\n\n    .endpoint-meta {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n      gap: 10px;\n      margin-bottom: 16px;\n    }\n\n    .endpoint-meta-card {\n      padding: 12px;\n      border-radius: 8px;\n      border: 1px solid var(--line);\n      background: #fff;\n    }\n\n    .endpoint-meta-card span {\n      display: block;\n      font-size: 12px;\n      color: var(--muted);\n      margin-bottom: 4px;\n    }\n\n    .endpoint-meta-card strong,\n    .endpoint-meta-card code {\n      font-size: 13px;\n      color: var(--text);\n    }\n\n    .rule-title {\n      margin: 0 0 10px;\n      font-size: 13px;\n      font-weight: 800;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      color: #3b4f65;\n    }\n\n    .rule-empty {\n      color: var(--muted);\n      font-size: 13px;\n      padding: 12px;\n      border-radius: 8px;\n      background: #fff;\n      border: 1px solid var(--line);\n    }\n\n    .rule-list {\n      display: grid;\n      gap: 10px;\n    }\n\n    .rule-card {\n      border-radius: 8px;\n      background: #fff;\n      border: 1px solid var(--line);\n      overflow: hidden;\n    }\n\n    .rule-card strong,\n    .rule-table th {\n      font-size: 13px;\n      font-weight: 700;\n    }\n\n    .rule-table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n\n    .rule-table thead th {\n      text-align: left;\n      padding: 10px 12px;\n      background: #f5f8fb;\n      border-bottom: 1px solid var(--line);\n      color: #3b4f65;\n    }\n\n    .rule-table tbody td {\n      padding: 10px 12px;\n      border-top: 1px solid var(--line);\n      font-size: 12px;\n      color: var(--muted);\n    }\n\n    .rule-table tbody tr:first-child td {\n      border-top: none;\n    }\n\n    .rule-name {\n      font-weight: 700;\n      color: var(--text);\n    }\n\n    .rule-table code {\n      color: var(--text);\n      font-weight: 700;\n    }\n\n    @media (max-width: 1080px) {\n      .shell {\n        grid-template-columns: 1fr;\n      }\n\n      .sidebar {\n        position: static;\n      }\n    }\n\n    @media (max-width: 720px) {\n      .shell { width: min(100vw - 16px, 100%); margin: 8px auto 20px; gap: 12px; }\n      .content { padding: 14px; }\n      .sidebar { padding: 18px 14px; }\n      .hero, .section-block { padding: 16px; }\n      .meta-grid { grid-template-columns: 1fr 1fr; }\n      .endpoint-summary { align-items: flex-start; }\n      .endpoint-summary-main { flex-wrap: wrap; }\n      .endpoint-inline-desc { max-width: 100%; white-space: normal; }\n    }\n  </style>\n</head>\n<body>\n  <div class=\"shell\">\n    <aside class=\"sidebar\">\n      <div class=\"brand\">\n        <span class=\"eyebrow\">FireCat Docs</span>\n        <h1>").concat(title, "</h1>\n        <p>").concat(description, "</p>\n      </div>\n\n      <div class=\"meta-grid\">\n        <div class=\"meta-card\">\n          <span>Version</span>\n          <strong>").concat(version, "</strong>\n        </div>\n        <div class=\"meta-card\">\n          <span>Updated</span>\n          <strong>").concat(date, "</strong>\n        </div>\n        <div class=\"meta-card\">\n          <span>Routes</span>\n          <strong>").concat(routeCount, "</strong>\n        </div>\n        <div class=\"meta-card\">\n          <span>Format</span>\n          <strong>JSON + UI</strong>\n        </div>\n      </div>\n\n      <div class=\"aside-actions\">\n        <a class=\"action-link\" href=\"#overview\"><span>\u5FEB\u901F\u5F00\u59CB</span><span>Intro</span></a>\n        <a class=\"action-link\" href=\"").concat(jsonPath, "\" target=\"_blank\" rel=\"noreferrer\"><span>\u539F\u59CB JSON</span><span>Open</span></a>\n      </div>\n\n      <div class=\"catalog-title\">\u76EE\u5F55\u5BFC\u822A</div>\n      ").concat(navHtml, "\n    </aside>\n\n    <main class=\"content\">\n      <section class=\"hero\" id=\"overview\">\n        <span class=\"eyebrow\">Document Overview</span>\n        <h2>").concat(title, "</h2>\n        <p>").concat(description, "\u3002\u6587\u6863\u7ED3\u6784\u53C2\u8003 Swagger \u7684\u9605\u8BFB\u65B9\u5F0F\uFF0C\u6309\u5206\u7EC4\u6D4F\u89C8\u63A5\u53E3\uFF0C\u5C55\u5F00\u540E\u53EF\u4EE5\u76F4\u63A5\u67E5\u770B\u8DEF\u5F84\u3001\u65B9\u6CD5\u548C\u8BF7\u6C42\u53C2\u6570\u89C4\u5219\u3002</p>\n\n        <div class=\"hero-stats\">\n          <div class=\"hero-stat\">\n            <span>\u63A5\u53E3\u603B\u6570</span>\n            <strong>").concat(routeCount, "</strong>\n          </div>\n          <div class=\"hero-stat\">\n            <span>\u5F53\u524D\u7248\u672C</span>\n            <strong>").concat(version, "</strong>\n          </div>\n          <div class=\"hero-stat\">\n            <span>\u6700\u540E\u66F4\u65B0</span>\n            <strong>").concat(date, "</strong>\n          </div>\n        </div>\n      </section>\n\n      ").concat(contentHtml, "\n    </main>\n  </div>\n</body>\n</html>");
    };
    FireDocument.documents = [];
    return FireDocument;
}());
exports.FireDocument = FireDocument;
function renderEndpointCard(item) {
    var description = escapeHtml(item.description || 'No description provided.');
    var rules = item.rule.length > 0
        ? "<div class=\"rule-list\">".concat(item.rule.map(function (rule) { return renderRuleCard(rule); }).join(''), "</div>")
        : "<div class=\"rule-empty\">\u8BE5\u63A5\u53E3\u5F53\u524D\u6CA1\u6709\u914D\u7F6E\u8BF7\u6C42\u9A8C\u8BC1\u89C4\u5219\u3002</div>";
    return "\n    <details class=\"endpoint-card\" id=\"".concat(item.anchor, "\">\n      <summary class=\"endpoint-summary\">\n        <div class=\"endpoint-summary-main\">\n          <span class=\"endpoint-method method-").concat(item.methods, "\">").concat(item.methods.toUpperCase(), "</span>\n          <code class=\"endpoint-path\">").concat(escapeHtml(item.path), "</code>\n          <span class=\"endpoint-inline-desc\">").concat(description, "</span>\n        </div>\n        <div class=\"endpoint-summary-side\">\n          <span>").concat(item.rule.length, " params</span>\n          <span class=\"endpoint-toggle\">\u25B6</span>\n        </div>\n      </summary>\n      <div class=\"endpoint-body\">\n        <div class=\"endpoint-meta\">\n          <div class=\"endpoint-meta-card\">\n            <span>Method</span>\n            <strong>").concat(item.methods.toUpperCase(), "</strong>\n          </div>\n          <div class=\"endpoint-meta-card\">\n            <span>Path</span>\n            <code>").concat(escapeHtml(item.path), "</code>\n          </div>\n        </div>\n        <div class=\"endpoint-desc\">").concat(description, "</div>\n        <div class=\"endpoint-rule\">\n          <h3 class=\"rule-title\">Parameters</h3>\n          ").concat(rules, "\n        </div>\n      </div>\n    </details>\n  ");
}
function renderRuleCard(rule) {
    var rows = Object.entries(rule).map(function (_a) {
        var field = _a[0], config = _a[1];
        var detailConfig = config || {};
        var type = formatRuleValue(detailConfig.type);
        var required = detailConfig.optional === true ? 'false' : 'true';
        var description = formatRuleValue(detailConfig.description || '-');
        var constraints = Object.entries(detailConfig)
            .filter(function (_a) {
            var key = _a[0];
            return !['type', 'optional', 'description'].includes(key);
        })
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, ": ").concat(formatRuleValue(value));
        })
            .join(', ') || '-';
        return "\n      <tr>\n        <td class=\"rule-name\">".concat(escapeHtml(field), "</td>\n        <td><code>").concat(escapeHtml(type), "</code></td>\n        <td><code>").concat(escapeHtml(required), "</code></td>\n        <td>").concat(escapeHtml(description), "</td>\n        <td>").concat(escapeHtml(constraints), "</td>\n      </tr>\n    ");
    });
    return "\n    <div class=\"rule-card\">\n      <table class=\"rule-table\">\n        <thead>\n          <tr>\n            <th>name</th>\n            <th>type</th>\n            <th>required</th>\n            <th>description</th>\n            <th>constraints</th>\n          </tr>\n        </thead>\n        <tbody>\n          ".concat(rows.join(''), "\n        </tbody>\n      </table>\n    </div>\n  ");
}
function createSections(items) {
    var groups = new Map();
    items.forEach(function (item, index) {
        var sectionTitle = getSectionTitle(item.path);
        var anchor = "endpoint-".concat(index, "-").concat(toAnchor(item.path));
        var list = groups.get(sectionTitle) || [];
        list.push(tslib_1.__assign(tslib_1.__assign({}, item), { anchor: anchor }));
        groups.set(sectionTitle, list);
    });
    return Array.from(groups.entries()).map(function (_a) {
        var title = _a[0], sectionItems = _a[1];
        return ({
            title: title,
            anchor: "section-".concat(toAnchor(title)),
            items: sectionItems,
        });
    });
}
function getSectionTitle(path) {
    if (path === '/') {
        return 'Root';
    }
    var segments = path.split('/').filter(Boolean);
    if (segments.length === 0) {
        return 'Root';
    }
    return "/".concat(segments[0]);
}
function formatDocDate(value) {
    if (!value) {
        return 'N/A';
    }
    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }
    return String(value);
}
function formatRuleValue(value) {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }
    if (Array.isArray(value)) {
        return value.join(', ');
    }
    if (value === null || typeof value === 'undefined') {
        return 'null';
    }
    return JSON.stringify(value);
}
function toAnchor(value) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'item';
}
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
