import { get, post, put } from "./api";
import { CHARACTER } from "./url";

const getCharacters = async () => await get(`${CHARACTER}`);
const createCharacter = async (data: any) => await post(`${CHARACTER}`, data);
const updateCharacter = async (data: any) => await put(`${CHARACTER}/${data.id}`, data.body);

export { getCharacters, createCharacter, updateCharacter }