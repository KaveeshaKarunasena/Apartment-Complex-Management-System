import { useContext, useEffect,useState } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Profile from '../component/userComponent/component/ProfilePage'

export const AuthGuard = ({ children }) => {
  // const [token,setToken] = useState([]);
  const navigate = useNavigate();
 
  try {
    let authPayload = useContext(AuthContext);
const ctx = authPayload.token
    console.log("auths",authPayload.token);
    <Profile token= {{ctx}}></Profile>
    // setToken(authPayload.token)
    if (!authPayload || !authPayload.token) {
      //  navigate("/login")
      console.log("no payloard");
       return <Navigate to="/login" />;
    }
    const decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;

    let adminString = decodedEmail.substring(0, 5);
    if (adminString === 'admin') {
      return <Navigate to="/manager" />;
    }

    else if (adminString === 'super') {
      return <Navigate to="/admin" />;
    }

    
    return <>{children}</>;
  } catch (error) {
 
  }
};

export const SuperAdminAuthGuard = ({ children }) => {
  const navigate = useNavigate();
  

  try {
    let authPayload = useContext(AuthContext);
    
    
    if (!authPayload || !authPayload.token) {
      console.log("no payloard",authPayload.life);
      return <Navigate to="/login" />;
    }
 
    const decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;
    
    let adminString = decodedEmail.substring(0, 5);
    // alert(adminString);
    if (adminString === 'admin') {
      // navigate('/manager')
      return <Navigate to="/manager" />;
    }

    if (decodedEmail !== 'superAdmin@gmail.com') {
 
      return <Navigate to="/app" />;
    }

    

    

   

    return <>{children}</>;
  } catch (error) {
    // alert(error);
  }
};

export const AdminAuthGuard = ({ children }) => {
  const navigate = useNavigate();
 

  try {
    let authPayload = useContext(AuthContext);

     if (!authPayload || !authPayload.token) {
      console.log("no payloard");
      return <Navigate to="/login" />;
    }

    var decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;
    let adminString = decodedEmail.substring(0, 5);

    if (adminString === 'super') {
      return <Navigate to="/admin" />;
    }

    if (adminString !== 'admin') {
      return <Navigate to="/app" />;
    }
    // alert("Manager")

   

    return <>{children}</>;
  } catch (error) {
    // alert(error);
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

      if (adminString === 'super') {
        navigate('/admin');
      }
      else if (adminString === 'admin') {
        navigate('/manager');
      } else {
        navigate('/app');
      }
    }
    return <>{children}</>;
  } catch (error) {
  //  alert(error);
  }
}
