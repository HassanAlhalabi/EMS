import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";

const useAccess = () => useContext(AuthContext)
 
export default useAccess;