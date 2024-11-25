import { useQuery } from "@tanstack/react-query";
import { getOrderPaginated } from "@/api/order";

type Props = {
    queryPath: string
}

const useGetOrdersPaginatedQuery = ({ queryPath }: Props) => {

  const query = useQuery({
    queryKey: ['getOrderPaginated', queryPath],
    queryFn: () => getOrderPaginated(queryPath),
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetOrdersPaginatedQuery