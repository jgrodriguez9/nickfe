export enum BrandTitle {
    nickdr = 'Nick Dr!',
}

export type BrandId = keyof typeof BrandTitle

export type Brand = {
    id: BrandId
    title: string
    theme: string
    /* icon: string
    logo: string
    logoWhite: string */
  }