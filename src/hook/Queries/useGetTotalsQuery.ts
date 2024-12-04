import { useQuery } from "@tanstack/react-query";
import { getTotals } from "@/api/stats";

type Props = {
    queryPath: string
}

const useGetTotalsQuery = ({ queryPath }: Props) => {

  const query = useQuery({
    queryKey: ['getTotals', queryPath],
    queryFn: () => getTotals(queryPath),
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetTotalsQuery