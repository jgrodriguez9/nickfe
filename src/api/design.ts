import { get, post, put } from "./api";
import { DESIGN } from "./url";

const getDesigns = async () => await get(`${DESIGN}`);
const createDesign = async (data: any) => await post(`${DESIGN}`, data);
const updateDesign = async (data: any) => await put(`${DESIGN}/${data.id}`, data.body);

export { getDesigns, createDesign, updateDesign }