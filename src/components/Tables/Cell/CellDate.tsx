import { DATE_TIME_FORMAT } from "@/constant/format";
import { CellContext } from "@tanstack/react-table";
import moment from "moment";

const CellDate = ({ cell }: CellContext<unknown, never>) => {
  return moment.utc(cell.getValue()).local().format(DATE_TIME_FORMAT);
};

export default CellDate;
