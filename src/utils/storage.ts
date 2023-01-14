// save to storage
export function saveToStorage(
  key: string,
  value: string,
  type?: 'local' | 'session'
) {
  if (typeof window !== 'undefined') {
    if (type === 'session')
      return window.sessionStorage.setItem(key, JSON.stringify(value))

    return window.localStorage.setItem(key, JSON.stringify(value))
  }
}

// get from storage
export function getFromStorage(key: string, type?: 'local' | 'session') {
  if (typeof window !== 'undefined') {
    if (type === 'session')
      return JSON.parse(window.sessionStorage.getItem(key) as string)

    return JSON.parse(window.localStorage.getItem(key) as string)
  }
}
