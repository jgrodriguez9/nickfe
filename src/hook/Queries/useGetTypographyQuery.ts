import { getTypographies } from "@/api/typography";
import { useQuery } from "@tanstack/react-query";

const useGetTypographyQuery = () => {

  const query = useQuery({
    queryKey: ['getTypographies'],
    queryFn: getTypographies,
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetTypographyQuery