/* eslint-disable @typescript-eslint/no-explicit-any */
const { VITE_APP_AUTH } = import.meta.env

export const getUser = () => {
  const item = window.localStorage.getItem(VITE_APP_AUTH)
  const user = item !== null ? JSON.parse(item) : null
  return user
}

export const setUser = (user: any): void => {
  if (user === null) {
    window.localStorage.removeItem(VITE_APP_AUTH)
    return
  }

  window.localStorage.setItem(VITE_APP_AUTH, JSON.stringify(user))
}