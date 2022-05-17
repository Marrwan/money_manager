import React from 'react';
import  {useLocation, Navigate, Outlet} from 'react-router-dom';


const RequireAuth = () => {
const location = useLocation();
let sessionToken = sessionStorage.getItem('token');
let localToken = localStorage.getItem('user');



return (
     !sessionToken 

    ?  (<Navigate to='/login' state ={{from: location}} replace />) 
    :
    sessionToken === localToken ? 
    (<Outlet />)
    : 
    (<Navigate to='/login' state ={{from: location}} replace />)
);
}
export default RequireAuth;