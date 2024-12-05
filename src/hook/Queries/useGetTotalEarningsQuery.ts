import { useQuery } from "@tanstack/react-query";
import { getTotalEarnings } from "@/api/stats";

type Props = {
    queryPath: string
}

const useGetTotalEarningsQuery = ({ queryPath }: Props) => {

  const query = useQuery({
    queryKey: ['useGetTotalEarningsQuery', queryPath],
    queryFn: () => getTotalEarnings(queryPath),
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetTotalEarningsQuery