import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product";

const useGetProductsQuery = () => {

  const query = useQuery({
    queryKey: ['getProducts'],
    queryFn: getProducts,
    staleTime: 0,
  })
  
  return query;
}
  
export default useGetProductsQuery