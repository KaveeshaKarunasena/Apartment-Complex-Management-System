import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
 
  try {
    let authPayload = useContext(AuthContext);

    console.log("auth",authPayload);
    const decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;

    let adminString = decodedEmail.substring(0, 5);
    if (adminString === 'admin') {
      return <Navigate to="/manager" />;
    }

    if (adminString === 'super') {
      return <Navigate to="/admin" />;
    }

    if (!authPayload || !authPayload.token) {
      //  navigate("/login")
      console.log("no payloard");
       return <Navigate to="/login" />;
    }
    return <>{children}</>;
  } catch (error) {
    console.log(error);
  }
};

export const SuperAdminAuthGuard = ({ children }) => {
  const navigate = useNavigate();
  

  try {
   

    if (!authPayload || !authPayload.token) {
      //  navigate("/login")
      return <Navigate to="/login" />;
    }
    const decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;
    console.log(decodedEmail);
    if (decodedEmail !== 'superAdmin@gmail.com' || decodedEmail == null) {
      return <Navigate to="/login" />;
    }

    if (!authPayload || !authPayload.token) {
      
      return <Navigate to="/login" />;
    }

    

   

    return <>{children}</>;
  } catch (error) {
    console.log(error);
  }
};

export const AdminAuthGuard = ({ children }) => {
  const navigate = useNavigate();
 

  try {
    let authPayload = useContext(AuthContext);

    var decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;
    let adminString = decodedEmail.substring(0, 5);

    if (adminString === 'super') {
      return <Navigate to="/admin" />;
    }

    if (adminString !== 'admin') {
      return <Navigate to="/login" />;
    }
    console.log("Manager")

    if (!authPayload || !authPayload.token) {
      
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  } catch (error) {
    console.log(error);
  }
};

export function GuestGuard({ children }) {
  const navigate = useNavigate();


  try {
    let authPayload = useContext(AuthContext);
    if (authPayload && authPayload.token) {
      var decoded = jwt_decode(authPayload.token);

      const decodedEmail = decoded.email;
      let adminString = decodedEmail.substring(0, 5);

      if (adminString == 'super') {
        navigate('/admin');
      }
      if (adminString == 'admin') {
        navigate('/manager');
      } else {
        navigate('/app');
      }
    }
    return <>{children}</>;
  } catch (error) {
    console.log(error);
  }
}
