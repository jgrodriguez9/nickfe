import { get, post, put } from "./api";
import { TECHNIQUE } from "./url";

const getTechniques = async () => await get(`${TECHNIQUE}`);
const createTechnique = async (data: any) => await post(`${TECHNIQUE}`, data);
const updateTechnique = async (data: any) => await put(`${TECHNIQUE}/${data.id}`, data.body);

export { getTechniques, createTechnique, updateTechnique }