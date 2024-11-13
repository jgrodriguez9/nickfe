import { getDesigns } from "@/api/design";
import { useQuery } from "@tanstack/react-query";

const useGetDesignQuery = () => {

  const query = useQuery({
    queryKey: ['getDesigns'],
    queryFn: getDesigns,
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetDesignQuery