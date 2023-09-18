export function isStartRouter (path: string) {
  return path === '/'
}


// replace end "/" of path
export function fixedEndPath (path: string) {
  if (isStartRouter(path)) {
    return path
  }

  return path.replace(/\/$/, '')
}