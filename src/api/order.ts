import { post } from "./api";
import {  ORDER } from "./url";

const createOrder = async (data: any) => await post(`${ORDER}`, data);

export { createOrder }