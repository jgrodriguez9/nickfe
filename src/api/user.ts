import { CreateUser, UpdateUser } from "../types/user";
import { del, get, post, put } from "./api";
import { AUTH, USER } from "./url";


const getUserPaginated = async (query: string) => await get(`${USER}${query}`);
const createUser = async (data: CreateUser) => await post(`${AUTH}/register`, data);
const updateUser = async (data: UpdateUser) => await put(`${USER}/${data.id}`, data.body);
const deleteUser = async (id: string) => await del(`${USER}/${id}`);

export { getUserPaginated, updateUser, deleteUser, createUser }