import { get } from "./api";
import { STATS } from "./url";

const getTotals = async (query: string) => await get(`${STATS}/totals${query}`);

export {
    getTotals
}