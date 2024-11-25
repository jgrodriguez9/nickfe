import { Badge } from "@/components/ui/badge";
import { CellContext } from "@tanstack/react-table";
import { useMemo } from "react";

const CellStatus = ({ cell }: CellContext<unknown, never>) => {
  const status = cell.getValue();
  const variant = useMemo(() => {
    switch (status) {
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      case "payed":
        return "success";
      default:
        return "default";
    }
  }, [status]);

  return <Badge variant={variant}>{(status as string).toUpperCase()}</Badge>;
};

export default CellStatus;
