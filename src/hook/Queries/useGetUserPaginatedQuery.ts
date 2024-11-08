import { useQuery } from "@tanstack/react-query";
import { getUserPaginated } from "../../api/user";

type Props = {
    queryPath: string

}

const useGetUserPaginatedQuery = ({ queryPath }: Props) => {

  const query = useQuery({
    queryKey: ['getUserPaginated', queryPath],
    queryFn: () => getUserPaginated(queryPath),
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetUserPaginatedQuery