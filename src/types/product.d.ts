type Colors = {
    codeHex: string;
    name: string
    imageUrl?: string
    imageId?: string
    imageBase64?: string
}
type ProductTechnique = {
    id: string;
    name: string;
}
type ProductTalla = {
    code: string;
    name: string;
    quantity: number
    colors: Colors[]
}
type Product = {
    id?: string
    name: string
    imageUrl: string
    imageId: string
    tallas: ProductTalla[]
    price: number,
    techniques: ProductTechnique[]
}

export { Product, ProductTalla, Colors}