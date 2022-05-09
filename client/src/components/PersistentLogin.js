import React, { useMemo } from 'react';
import  {useLocation, Navigate, Outlet} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {useEffect, useState} from 'react';





const PersistentLogin = () => {
    const location = useLocation();
const [isLoggedIn, setIsLoggedIn] = useState(false);
const {auth} = useAuth();

    console.log('kkkk')
    let sessionToken = sessionStorage.getItem('token');
  
    if (sessionToken) {
        setIsLoggedIn(true);
        // console.log(isLoggedIn)
    //     if(auth){
    //         if(auth.hasOwnProperty('token')){
    //         if(auth.token === sessionToken) {
    //             setIsLoggedIn(true);
    //         }
    //     }
    // }
    }



return (
    isLoggedIn ? <Outlet /> : <Navigate to='/login' state ={{from: location}} replace />
);

}
export default PersistentLogin;