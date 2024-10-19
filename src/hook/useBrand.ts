import { Brand } from "../types/brand"
import { BrandTitle } from '../types/brand.d'

const useBrand = (): Brand => {
  const id = 'nickdr'
  return {
    id,
    title: BrandTitle[id],
    theme: `theme-${id}`,
    /* icon: `/brands/${id}/favicon.ico`,
    logo: `/brands/${id}/logo.webp`,
    logoWhite: `/brands/${id}/logo-white.webp` */
  }
}
  
export default useBrand