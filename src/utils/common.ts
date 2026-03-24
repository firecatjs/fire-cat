export function isStartRouter (path: string) {
  return path === '/'
}

export function ensureLeadingSlash(path: string) {
  if (!path) {
    return '/'
  }

  return path.startsWith('/') ? path : `/${path}`
}

export function fixedEndPath (path: string) {
  const normalized = ensureLeadingSlash(path).replace(/\/+/g, '/')
  if (isStartRouter(normalized)) {
    return normalized
  }

  return normalized.replace(/\/$/, '')
}

export function joinRoutePaths(...paths: Array<string | undefined>) {
  const safePaths = paths
    .filter((item): item is string => typeof item === 'string' && item.length > 0)
    .map(path => path.trim())
    .filter(Boolean);

  if (safePaths.length === 0) {
    return '/'
  }

  const merged = safePaths
    .map((path, index) => {
      if (index === 0) {
        return ensureLeadingSlash(path).replace(/\/$/, '')
      }

      return path.replace(/^\/+/, '').replace(/\/$/, '')
    })
    .filter((segment, index) => segment.length > 0 || index === 0)
    .join('/');

  return fixedEndPath(merged || '/')
}
