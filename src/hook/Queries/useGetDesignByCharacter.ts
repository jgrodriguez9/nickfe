import { getDesignsByCharacterId } from "@/api/design";
import { useQuery } from "@tanstack/react-query";

const useGetDesignByCharacter = (characterId: string) => {

  const query = useQuery({
    queryKey: ['getDesignsByCharacterId', characterId],
    queryFn: () => getDesignsByCharacterId(characterId),
    enabled: Boolean(characterId),
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetDesignByCharacter