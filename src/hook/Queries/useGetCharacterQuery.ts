import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/api/character";

const useGetCharacterQuery = () => {

  const query = useQuery({
    queryKey: ['getCharacters'],
    queryFn: getCharacters,
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetCharacterQuery