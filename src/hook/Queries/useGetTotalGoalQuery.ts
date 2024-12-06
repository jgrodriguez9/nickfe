import { useQuery } from "@tanstack/react-query";
import { getGoal } from "@/api/stats";

type Props = {
    queryPath: string
}

const useGetTotalGoalQuery = ({ queryPath }: Props) => {

  const query = useQuery({
    queryKey: ['getGoal', queryPath],
    queryFn: () => getGoal(queryPath),
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetTotalGoalQuery