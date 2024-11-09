import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CellContext } from "@tanstack/react-table";

const CellImage = ({ cell }: CellContext<unknown, never>) => {
  return (
    <Avatar className="h-20 w-20">
      <AvatarImage src={cell.getValue()} alt="Image" />
      <AvatarFallback>IM</AvatarFallback>
    </Avatar>
  );
};

export default CellImage;
