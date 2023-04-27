import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  let authPayload = useContext(AuthContext);

  try {
    const decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;

    let adminString = decodedEmail.substring(0, 5);

    if (!authPayload || !authPayload.token) {
      //  navigate("/login")
      return <Navigate to="/login" />;
    }

    if (adminString === 'admin') {
      return <Navigate to="/manager" />;
    }

    if (adminString === 'super') {
      return <Navigate to="/admin" />;
    }
    return <>{children}</>;
  } catch (error) {
    console.log(error);
  }
};

export const SuperAdminAuthGuard = ({ children }) => {
  const navigate = useNavigate();
  let authPayload = useContext(AuthContext);

  try{
    const decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;

  if (!authPayload || !authPayload.token) {
    //  navigate("/login")
    return <Navigate to="/login" />;
  }
  console.log(decodedEmail);
  if (decodedEmail != 'superAdmin@gmail.com' || decodedEmail == null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;

  }catch(error){
    console.log(error);
  }
  
};

export const AdminAuthGuard = ({ children }) => {
  const navigate = useNavigate();
  let authPayload = useContext(AuthContext);

  try{

    var decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;
    let adminString = decodedEmail.substring(0, 5);
  
    if (!authPayload || !authPayload.token) {
      //  navigate("/login")
      return <Navigate to="/login" />;
    }
  console.log(adminString)
    if (adminString != 'admin' || adminString == null) {
      return <Navigate to="/login" />;
    }
  
    return <>{children}</>;

  }catch(error){
    console.log(error);

  }

 
};

export function GuestGuard({ children }) {
  const navigate = useNavigate();
  let authPayload = useContext(AuthContext);

  try{

    
  if (authPayload && authPayload.token) {
      var decoded = jwt_decode(authPayload.token);
      
      const decodedEmail = decoded.email;
      let adminString = decodedEmail.substring(0, 5);
    
      if(adminString == 'super'){
        navigate('/admin');
      }
      if(adminString == 'admin'){
        navigate('/manager');
      }

      navigate('/app');
  }
  return <>{children}</>;

  }catch(error){
    console.log(error);

  }

}
