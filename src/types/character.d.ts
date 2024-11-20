type TypographyOptionsValue = {
    code: string
    name: string
}
type TypographyOptions = {
    characterId: string,
    values: TypographyOptionsValue[]
}

type TypographySchema = {
    id?: string
    name: string;
    imageUrl: string
    imageId: string
    characterId: string
    characterName: string
}

type DesignSchema = {
    id?: string
    sku: string;
    name: string;
    imageUrl: string
    imageId: string
    characterId: string
    characterName: string
}
type Character = {
    id?: string
    name: string
    imageUrl: string
    imageId: string
}

export { Character, DesignSchema, TypographySchema, TypographyOptionsValue, TypographyOptions}