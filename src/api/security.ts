import { Login } from "../types/security";
import { post } from "./api";
import { AUTH } from "./url";

const login = async (data: Login) => await post(`${AUTH}/login`, data);

export { login }