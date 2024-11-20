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
    value: string;
    label: string
    color: string
}

export type LabelColor = {
    value: string
    label: string
}

export type ProductStyle = {
    value: string
    label: string
}

export type ProductSize = {
    value: string
    label: string
}

export type ProductColor = {
    value: string
    label: string
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

export type KeyValue = {
    key: string,
    value: any
}