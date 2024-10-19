import { encode } from "./uriComponent"


export const createAppSearchParams = <T extends object>(
  params: T
): URLSearchParams => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return

    searchParams.append(key, encode(value))
  })

  return searchParams
}
