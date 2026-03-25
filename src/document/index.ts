// 接口文档服务
import {
  FireDocumentBodyInterFace,
  FireDocumentHeadInterFace,
  FireDocumentInterFace,
  FireDocumentStoreInterFace,
  InterceptorType
} from "../types";
import {FireCatRouter} from "../router/router";
import {fixedEndPath} from "../utils/common";

export class FireDocument {
  static documents: FireDocumentStoreInterFace[] = [];

  static appendDocument(path: string, routes: FireDocumentStoreInterFace['routes']) {
    FireDocument.documents.push({
      path,
      routes
    });
  }

  static createDocumentPayload(router: FireCatRouter, config: FireDocumentHeadInterFace): FireDocumentInterFace {
    const body: FireDocumentBodyInterFace[] = [];

    router.getDocumentStore().forEach(item => {
      item.routes.forEach(route => {
        const mission: FireDocumentBodyInterFace = {
          path: fixedEndPath(route.path || item.path),
          methods: route.method,
          rule: [],
          description: route.description,
        };

        route.middlewares.forEach(intItem => {
          if (intItem.type == InterceptorType.RULE) {
            mission.rule.push(intItem.data);
          }
        });

        body.push(mission);
      });
    });

    body.sort((prev, next) => prev.path.localeCompare(next.path));

    return {
      title: config.title,
      description: config.description,
      date: config.date,
      version: config.version,
      body,
    };
  }

  static server(router: FireCatRouter, path: string, config: FireDocumentHeadInterFace) {
    const normalizedPath = fixedEndPath(path);
    const jsonPath = fixedEndPath(`${normalizedPath}/json`);

    router.router.get(normalizedPath, (ctx)=> {
      const doc = FireDocument.createDocumentPayload(router, config);

      if (ctx.query.format === 'json') {
        ctx.body = doc;
        return;
      }

      ctx.type = 'text/html; charset=utf-8';
      ctx.body = FireDocument.renderDocumentPage(doc, jsonPath);
    });

    router.router.get(jsonPath, (ctx)=> {
      ctx.body = FireDocument.createDocumentPayload(router, config);
    });
  }

  static renderDocumentPage(doc: FireDocumentInterFace, jsonPath: string) {
    const title = escapeHtml(doc.title || 'API Document');
    const description = escapeHtml(doc.description || 'FireCat document service');
    const version = escapeHtml(String(doc.version || '1.0.0'));
    const date = escapeHtml(formatDocDate(doc.date));
    const routeCount = doc.body.length;
    const sections = createSections(doc.body);
    const navHtml = sections.map(section => {
      const children = section.items.map(item => {
        return `<a class="nav-link" href="#${item.anchor}"><span class="nav-method method-${item.methods}">${item.methods.toUpperCase()}</span><span class="nav-text">${escapeHtml(item.path)}</span></a>`;
      }).join('');

      return `
        <section class="nav-group">
          <div class="nav-group-title">${escapeHtml(section.title)}</div>
          <div class="nav-group-list">${children}</div>
        </section>
      `;
    }).join('');

    const contentHtml = sections.map(section => {
      const itemsHtml = section.items.map(item => renderEndpointCard(item)).join('');

      return `
        <section class="section-block" id="${section.anchor}">
          <div class="section-heading">
            <h2>${escapeHtml(section.title)}</h2>
            <p>${section.items.length} endpoint${section.items.length > 1 ? 's' : ''}</p>
          </div>
          <div class="endpoint-list">${itemsHtml}</div>
        </section>
      `;
    }).join('');

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --bg: #f7f9fc;
      --panel: #ffffff;
      --panel-soft: #fbfcfe;
      --line: #dfe7ef;
      --text: #22313f;
      --muted: #62707f;
      --shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
      --green: #49cc90;
      --green-soft: rgba(73, 204, 144, 0.12);
      --blue: #61affe;
      --blue-soft: rgba(97, 175, 254, 0.12);
      --orange: #fca130;
      --orange-soft: rgba(252, 161, 48, 0.12);
      --red: #f93e3e;
      --red-soft: rgba(249, 62, 62, 0.12);
      --gray: #9099a3;
      --gray-soft: rgba(144, 153, 163, 0.12);
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      color: var(--text);
      background: var(--bg);
      min-height: 100vh;
    }

    a { color: inherit; text-decoration: none; }

    .shell {
      width: min(1440px, calc(100vw - 40px));
      margin: 20px auto;
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr);
      gap: 16px;
      align-items: start;
    }

    .sidebar,
    .content {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 10px;
      box-shadow: var(--shadow);
    }

    .sidebar {
      position: sticky;
      top: 16px;
      padding: 18px 16px;
      overflow: hidden;
    }

    .brand {
      padding-bottom: 16px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 16px;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 4px;
      background: #e8f1fb;
      color: #3b4f65;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .brand h1 {
      margin: 12px 0 8px;
      font-size: 26px;
      line-height: 1.15;
    }

    .brand p {
      margin: 0;
      color: var(--muted);
      line-height: 1.55;
      font-size: 14px;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin: 16px 0;
    }

    .meta-card {
      padding: 12px;
      border-radius: 8px;
      background: var(--panel-soft);
      border: 1px solid var(--line);
    }

    .meta-card span {
      display: block;
      color: var(--muted);
      font-size: 12px;
      margin-bottom: 4px;
    }

    .meta-card strong {
      display: block;
      font-size: 16px;
    }

    .aside-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }

    .action-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: var(--panel-soft);
      color: var(--text);
      font-weight: 600;
      font-size: 13px;
    }

    .catalog-title {
      font-size: 13px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 6px 0 12px;
    }

    .nav-group + .nav-group {
      margin-top: 14px;
      padding-top: 14px;
      border-top: 1px solid var(--line);
    }

    .nav-group-title {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .nav-group-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 6px;
      transition: background 0.18s ease;
    }

    .nav-link:hover {
      background: #f4f8fc;
    }

    .nav-method,
    .endpoint-method {
      min-width: 54px;
      text-align: center;
      padding: 5px 8px;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.05em;
      border: 1px solid transparent;
    }

    .method-get { background: var(--green-soft); color: #1f7a52; border-color: rgba(73, 204, 144, 0.36); }
    .method-post { background: var(--blue-soft); color: #185e9d; border-color: rgba(97, 175, 254, 0.36); }
    .method-put,
    .method-patch { background: var(--orange-soft); color: #a5620e; border-color: rgba(252, 161, 48, 0.36); }
    .method-del,
    .method-delete { background: var(--red-soft); color: #b02222; border-color: rgba(249, 62, 62, 0.3); }
    .method-head,
    .method-all { background: var(--gray-soft); color: #5d6670; border-color: rgba(144, 153, 163, 0.34); }

    .nav-text {
      min-width: 0;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .content {
      padding: 20px;
    }

    .hero {
      padding: 22px;
      border-radius: 10px;
      background: linear-gradient(180deg, #ffffff 0%, #f9fbfd 100%);
      border: 1px solid var(--line);
    }

    .hero h2 {
      margin: 12px 0 10px;
      font-size: 30px;
      line-height: 1.15;
      max-width: none;
    }

    .hero p {
      max-width: 900px;
      margin: 0;
      color: var(--muted);
      line-height: 1.7;
      font-size: 14px;
    }

    .hero-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 16px;
    }

    .hero-stat {
      padding: 10px 12px;
      border-radius: 8px;
      background: var(--panel-soft);
      border: 1px solid var(--line);
      min-width: 108px;
    }

    .hero-stat span {
      display: block;
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 4px;
    }

    .hero-stat strong {
      font-size: 18px;
    }

    .section-block {
      margin-top: 18px;
      padding: 18px;
      border-radius: 10px;
      background: var(--panel);
      border: 1px solid var(--line);
    }

    .section-heading {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
    }

    .section-heading h2 {
      margin: 0;
      font-size: 22px;
    }

    .section-heading p {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
    }

    .endpoint-list {
      display: grid;
      gap: 12px;
    }

    .endpoint-card {
      border-radius: 6px;
      border: 1px solid var(--line);
      overflow: hidden;
      background: #fff;
    }

    .endpoint-summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      padding: 12px 14px;
      cursor: pointer;
      list-style: none;
    }

    .endpoint-summary::-webkit-details-marker {
      display: none;
    }

    .endpoint-summary-main {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      flex: 1;
    }

    .endpoint-summary-side {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--muted);
      font-size: 12px;
    }

    .endpoint-toggle {
      transition: transform 0.18s ease;
    }

    .endpoint-card[open] .endpoint-toggle {
      transform: rotate(90deg);
    }

    .endpoint-path {
      font-family: "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace;
      font-size: 14px;
      word-break: break-all;
    }

    .endpoint-inline-desc {
      color: var(--muted);
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 280px;
    }

    .endpoint-body {
      padding: 16px 16px 18px;
      border-top: 1px solid var(--line);
      background: #fafbfd;
    }

    .endpoint-desc {
      color: var(--muted);
      line-height: 1.7;
      font-size: 14px;
      margin-bottom: 14px;
    }

    .endpoint-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 10px;
      margin-bottom: 16px;
    }

    .endpoint-meta-card {
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: #fff;
    }

    .endpoint-meta-card span {
      display: block;
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 4px;
    }

    .endpoint-meta-card strong,
    .endpoint-meta-card code {
      font-size: 13px;
      color: var(--text);
    }

    .rule-title {
      margin: 0 0 10px;
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #3b4f65;
    }

    .rule-empty {
      color: var(--muted);
      font-size: 13px;
      padding: 12px;
      border-radius: 8px;
      background: #fff;
      border: 1px solid var(--line);
    }

    .rule-list {
      display: grid;
      gap: 10px;
    }

    .rule-card {
      border-radius: 8px;
      background: #fff;
      border: 1px solid var(--line);
      overflow: hidden;
    }

    .rule-card strong,
    .rule-table th {
      font-size: 13px;
      font-weight: 700;
    }

    .rule-table {
      width: 100%;
      border-collapse: collapse;
    }

    .rule-table thead th {
      text-align: left;
      padding: 10px 12px;
      background: #f5f8fb;
      border-bottom: 1px solid var(--line);
      color: #3b4f65;
    }

    .rule-table tbody td {
      padding: 10px 12px;
      border-top: 1px solid var(--line);
      font-size: 12px;
      color: var(--muted);
    }

    .rule-table tbody tr:first-child td {
      border-top: none;
    }

    .rule-name {
      font-weight: 700;
      color: var(--text);
    }

    .rule-table code {
      color: var(--text);
      font-weight: 700;
    }

    @media (max-width: 1080px) {
      .shell {
        grid-template-columns: 1fr;
      }

      .sidebar {
        position: static;
      }
    }

    @media (max-width: 720px) {
      .shell { width: min(100vw - 16px, 100%); margin: 8px auto 20px; gap: 12px; }
      .content { padding: 14px; }
      .sidebar { padding: 18px 14px; }
      .hero, .section-block { padding: 16px; }
      .meta-grid { grid-template-columns: 1fr 1fr; }
      .endpoint-summary { align-items: flex-start; }
      .endpoint-summary-main { flex-wrap: wrap; }
      .endpoint-inline-desc { max-width: 100%; white-space: normal; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <aside class="sidebar">
      <div class="brand">
        <span class="eyebrow">FireCat Docs</span>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>

      <div class="meta-grid">
        <div class="meta-card">
          <span>Version</span>
          <strong>${version}</strong>
        </div>
        <div class="meta-card">
          <span>Updated</span>
          <strong>${date}</strong>
        </div>
        <div class="meta-card">
          <span>Routes</span>
          <strong>${routeCount}</strong>
        </div>
        <div class="meta-card">
          <span>Format</span>
          <strong>JSON + UI</strong>
        </div>
      </div>

      <div class="aside-actions">
        <a class="action-link" href="#overview"><span>快速开始</span><span>Intro</span></a>
        <a class="action-link" href="${jsonPath}" target="_blank" rel="noreferrer"><span>原始 JSON</span><span>Open</span></a>
      </div>

      <div class="catalog-title">目录导航</div>
      ${navHtml}
    </aside>

    <main class="content">
      <section class="hero" id="overview">
        <span class="eyebrow">Document Overview</span>
        <h2>${title}</h2>
        <p>${description}。文档结构参考 Swagger 的阅读方式，按分组浏览接口，展开后可以直接查看路径、方法和请求参数规则。</p>

        <div class="hero-stats">
          <div class="hero-stat">
            <span>接口总数</span>
            <strong>${routeCount}</strong>
          </div>
          <div class="hero-stat">
            <span>当前版本</span>
            <strong>${version}</strong>
          </div>
          <div class="hero-stat">
            <span>最后更新</span>
            <strong>${date}</strong>
          </div>
        </div>
      </section>

      ${contentHtml}
    </main>
  </div>
</body>
</html>`;
  }
}

function renderEndpointCard(item: EndpointViewModel) {
  const description = escapeHtml(item.description || 'No description provided.');
  const rules = item.rule.length > 0
    ? `<div class="rule-list">${item.rule.map(rule => renderRuleCard(rule)).join('')}</div>`
    : `<div class="rule-empty">该接口当前没有配置请求验证规则。</div>`;

  return `
    <details class="endpoint-card" id="${item.anchor}">
      <summary class="endpoint-summary">
        <div class="endpoint-summary-main">
          <span class="endpoint-method method-${item.methods}">${item.methods.toUpperCase()}</span>
          <code class="endpoint-path">${escapeHtml(item.path)}</code>
          <span class="endpoint-inline-desc">${description}</span>
        </div>
        <div class="endpoint-summary-side">
          <span>${item.rule.length} params</span>
          <span class="endpoint-toggle">▶</span>
        </div>
      </summary>
      <div class="endpoint-body">
        <div class="endpoint-meta">
          <div class="endpoint-meta-card">
            <span>Method</span>
            <strong>${item.methods.toUpperCase()}</strong>
          </div>
          <div class="endpoint-meta-card">
            <span>Path</span>
            <code>${escapeHtml(item.path)}</code>
          </div>
        </div>
        <div class="endpoint-desc">${description}</div>
        <div class="endpoint-rule">
          <h3 class="rule-title">Parameters</h3>
          ${rules}
        </div>
      </div>
    </details>
  `;
}

function renderRuleCard(rule: Record<string, any>) {
  const rows = Object.entries(rule).map(([field, config]) => {
    const detailConfig = config || {};
    const type = formatRuleValue(detailConfig.type);
    const required = detailConfig.optional === true ? 'false' : 'true';
    const description = formatRuleValue(detailConfig.description || '-');
    const constraints = Object.entries(detailConfig)
      .filter(([key]) => !['type', 'optional', 'description'].includes(key))
      .map(([key, value]) => `${key}: ${formatRuleValue(value)}`)
      .join(', ') || '-';

    return `
      <tr>
        <td class="rule-name">${escapeHtml(field)}</td>
        <td><code>${escapeHtml(type)}</code></td>
        <td><code>${escapeHtml(required)}</code></td>
        <td>${escapeHtml(description)}</td>
        <td>${escapeHtml(constraints)}</td>
      </tr>
    `;
  });

  return `
    <div class="rule-card">
      <table class="rule-table">
        <thead>
          <tr>
            <th>name</th>
            <th>type</th>
            <th>required</th>
            <th>description</th>
            <th>constraints</th>
          </tr>
        </thead>
        <tbody>
          ${rows.join('')}
        </tbody>
      </table>
    </div>
  `;
}

function createSections(items: FireDocumentBodyInterFace[]): SectionViewModel[] {
  const groups = new Map<string, EndpointViewModel[]>();

  items.forEach((item, index) => {
    const sectionTitle = getSectionTitle(item.path);
    const anchor = `endpoint-${index}-${toAnchor(item.path)}`;
    const list = groups.get(sectionTitle) || [];
    list.push({
      ...item,
      anchor,
    });
    groups.set(sectionTitle, list);
  });

  return Array.from(groups.entries()).map(([title, sectionItems]) => ({
    title,
    anchor: `section-${toAnchor(title)}`,
    items: sectionItems,
  }));
}

function getSectionTitle(path: string) {
  if (path === '/') {
    return 'Root';
  }

  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) {
    return 'Root';
  }

  return `/${segments[0]}`;
}

function formatDocDate(value?: string | Date) {
  if (!value) {
    return 'N/A';
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value);
}

function formatRuleValue(value: unknown) {
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

function toAnchor(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface EndpointViewModel extends FireDocumentBodyInterFace {
  anchor: string;
}

interface SectionViewModel {
  title: string;
  anchor: string;
  items: EndpointViewModel[];
}
