import { get } from "./api";
import { STATS } from "./url";

const getTotals = async (query: string) => await get(`${STATS}/totals${query}`);
const getTotalEarnings = async (query: string) => await get(`${STATS}/total-earning${query}`);

export {
    getTotals,
    getTotalEarnings
}