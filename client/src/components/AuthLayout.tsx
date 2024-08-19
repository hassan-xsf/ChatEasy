import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../api/auth';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useTSSelector } from '../hooks/useTSSelector'
import { login, logout } from '../store/authSlice';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {

    const authStatus = useTSSelector(state => state.auth.authStatus)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ['getUser'],
        retry: 0,
        queryFn: getUser,
        enabled: !authStatus,
    })
    useEffect(() => {
        console.log("YES")
        if (!authStatus) {
            dispatch(logout())
        }
        if (data) {
            dispatch(login(data.data.user))
            navigate("/chat/")
        }
        if (error) {
            if (error instanceof AxiosError && error.message) {
                console.log(error.response?.data.message || error.message);
            } else {
                console.log("Error: " + error);
            }
            dispatch(logout())
            navigate('/')
        }
    }, [error]);

    return (
        isLoading ?
            <>
                <div className="bg-white h-[7vh] flex items-center px-4 justify-between drop-shadow-md mb-2">
                    <div className="flex items-center justify-center gap-2">
                        <Logo size="small" />
                    </div>
                    <span>Loading...</span>
                </div>
            </>
            :
            <> 
                {children}
    
            </>
    )
}

export default AuthLayout