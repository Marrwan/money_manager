import React from 'react';
import  {useLocation, Navigate, Outlet} from 'react-router-dom';

// import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
// const {auth} = useAuth();
const location = useLocation();
let sessionToken = sessionStorage.getItem('token');
let result;
if (sessionToken) {
 
 result =  <Outlet />;
   } else {
  
     result =  <Navigate to='/login' state ={{from: location}} replace />;
   }
return (
    result
);
}
export default RequireAuth;