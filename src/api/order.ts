import { UpdateOrder } from "@/types/order";
import { get, post, put } from "./api";
import {  ORDER } from "./url";

const getOrderPaginated = async (query: string) => await get(`${ORDER}${query}`);
const createOrder = async (data: any) => await post(`${ORDER}`, data);
const updateStatus = async (data: UpdateOrder) => await put(`${ORDER}/change-status/${data.id}`, data.body);

export { getOrderPaginated, createOrder, updateStatus }