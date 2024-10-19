import { getUser } from "../utils/auth";

const useUser = () => {
  const user = getUser();
  return user
}
  
export default useUser;