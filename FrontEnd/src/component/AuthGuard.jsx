import { useContext , useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate , useNavigate} from "react-router-dom";

export const AuthGuard =({children}) =>{
  const navigate = useNavigate();
    let authPayload = useContext(AuthContext);
    
    // console.log(authPayload)
    if(!authPayload || !authPayload.token){

      console.log("authGuard")
      //  navigate("/login")
      return <Navigate to ="/login" />
    }
    
    if({children}){
      return <>{children}</>;
    }
   
}

export function GuestGuard({ children }) {
  const navigate = useNavigate();
    let authPayload = useContext(AuthContext);
    
    // check if user exists
    if (authPayload && authPayload.token) {
      
        navigate("/app")

     
      
    }
    
    return <>{children}</>;
  }