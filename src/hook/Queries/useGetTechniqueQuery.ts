import { useQuery } from "@tanstack/react-query";
import { getTechniques } from "@/api/technique";

const useGetTechniqueQuery = () => {

  const query = useQuery({
    queryKey: ['getTechniques'],
    queryFn: getTechniques,
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetTechniqueQuery