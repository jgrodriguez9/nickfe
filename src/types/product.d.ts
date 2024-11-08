type Colors = {
    codeHex: string;
    name: string
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
}

export { Product, ProductTalla, Colors}