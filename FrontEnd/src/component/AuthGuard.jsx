import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate , useNavigate} from "react-router-dom";

export function AuthGuards({children}){
    let authPayload = useContext(AuthContext);
  const navigate = useNavigate();
    console.log(authPayload)
    if(!authPayload || !authPayload.token){

       navigate("/login")
    }

    console.log("authgurd")
    return <>{children}</>;
}

export function GuestGuard({ children }) {
    let authPayload = useContext(AuthContext);
    const navigate = useNavigate();
    // check if user exists
    if (authPayload && authPayload.token) {
      console.log("called here")
      navigate("/app")
    }
    
    return <>{children}</>;
  }