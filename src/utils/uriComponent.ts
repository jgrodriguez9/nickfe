/* eslint-disable @typescript-eslint/no-explicit-any */
import lzString from 'lz-string'

export const encode = (params: any): string => {
  const paramsStr = JSON.stringify(params)
  const paramsCompressed = lzString.compressToBase64(paramsStr)
  const paramsEncoded = encodeURIComponent(paramsCompressed)

  return paramsEncoded
}

export const decode = (str: string): any | null => {
  try {
    if (str.trim().length > 0) {
      const paramsDecoded = decodeURIComponent(str.trim())
      const paramsDecompressed = lzString.decompressFromBase64(paramsDecoded)
      const param = JSON.parse(paramsDecompressed)

      return param
    }
  } catch (err) {
    console.log(err)
  }

  return str
}
