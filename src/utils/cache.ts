/** 获取缓存 */
const prefix = 'my-music_'
export function loadCache(key: string, defaults: any = null) {
  key = prefix + key
  const cache = localStorage.getItem(key)
  if (cache === null) {
    return defaults
  }

  try {
    return JSON.parse(cache)
  } catch (e) {
    localStorage.removeItem(key)
    return defaults
  }
}

/** 存储缓存 */
export function putCache(key: string, value: any) {
  key = prefix + key
  localStorage.setItem(key, JSON.stringify(value))
}
/** 删除缓存 */
export function removeCache(key: string) {
  key = prefix + key
  localStorage.removeItem(key)
}

export function cleanCache() {
  localStorage.clear()
}
