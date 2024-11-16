import { ProductTalla } from "./product";

export type TechniqueOrder = {
    id: string;
    name: string;
    imageUrl: string;
    price: number
}

export type ProductOrder = {
    id: string;
    name: string;
    imageUrl: string;
    price: number,
    tallas: ProductTalla[]
}

export type CharacterOrder = {
    id: string;
    name: string;
    imageUrl: string;
}

export type DesignOrder = {
    id: string;
    name: string;
    sku: string
    imageUrl: string;
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
    technique: TechniqueOrder
    product: ProductOrder
    character: CharacterOrder
    design: DesignOrder
    label: string
    typographic: Typographic
    labelColor: LabelColor
    productStyle: ProductStyle
    productSize: ProductSize
    productColor: ProductColor
    patchAdd: Additional
    motifAdd: Additional
    textAdd: Additional
}