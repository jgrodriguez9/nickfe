import { get, post, put } from "./api";
import { TYPOGRAPHY } from "./url";

const getTypographies = async () => await get(`${TYPOGRAPHY}`);
const createTypography = async (data: any) => await post(`${TYPOGRAPHY}`, data);
const updateTypography = async (data: any) => await put(`${TYPOGRAPHY}/${data.id}`, data.body);

export { getTypographies, createTypography, updateTypography }