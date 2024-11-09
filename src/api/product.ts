import { get, post, put } from "./api";
import { PRODUCT } from "./url";

const getProducts = async () => await get(`${PRODUCT}`);
const createProduct = async (data: any) => await post(`${PRODUCT}`, data);
const updateProduct = async (data: any) => await put(`${PRODUCT}/${data.id}`, data.body);

export { createProduct, getProducts, updateProduct }