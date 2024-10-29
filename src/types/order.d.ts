export type Technique = {
    title: string;
    type?: string;
    price: number
}

export type Product = {
    title: string;
    url: string;
    type?: string
}

export type Art = {
    title: string;
    url: string;
    type?: string
}

export type Typographic = {
    title: string;
    url?: string;
    type?: string
}

export type LabelColor = {
    code: string
    title: string
}

export type ProductStyle = {
    code: string
    title: string
}

export type ProductSize = {
    code: string
    title: string
}

export type ProductColor = {
    code: string
    title: string
}

export type Additional = {
    title: string;
    url: string;
    type?: string
}


export type Order = {
    id: string
    technique: Technique
    product: Product
    label: string
    typographic: Typographic
    labelColor: LabelColor
    productStyle: ProductStyle
    productSize: ProductSize
    productColor: ProductColor
    art: Art
    patchAdd: Additional
    motifAdd: Additional
    textAdd: Additional
}