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
      // alert("no payloard");
       return <Navigate to="/login" />;
    }
    return <>{children}</>;
  } catch (error) {
 
  }
};

export const SuperAdminAuthGuard = ({ children }) => {
  const navigate = useNavigate();
  

  try {
    let authPayload = useContext(AuthContext);
 
    const decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;
    
    let adminString = decodedEmail.substring(0, 5);
    // alert(adminString);
    if (adminString === 'admin') {
      // navigate('/manager')
      return <Navigate to="/manager" />;
    }

    if (decodedEmail !== 'superAdmin@gmail.com') {
 
      return <Navigate to="/login" />;
    }

    if (!authPayload || !authPayload.token) {
      
      return <Navigate to="/login" />;
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

    var decoded = jwt_decode(authPayload.token);
    const decodedEmail = decoded.email;
    let adminString = decodedEmail.substring(0, 5);

    if (adminString === 'super') {
      return <Navigate to="/admin" />;
    }

    if (adminString !== 'admin') {
      return <Navigate to="/login" />;
    }
    // alert("Manager")

    if (!authPayload || !authPayload.token) {
      
      return <Navigate to="/login" />;
    }

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
  //  alert(error);
  }
}
