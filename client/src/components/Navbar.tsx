import Logo from './Logo'
import { useTSSelector } from '../hooks/useTSSelector'
import AuthLayout from './AuthLayout'
import { logout } from '../store/authSlice';
import { logoOut } from '../api/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';


function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useTSSelector(state => state.auth.authStatus)
  const auth = useTSSelector(state => state.auth.authData);
  const logoutMutation = useMutation({
    mutationFn: logoOut,
    onSuccess: () => {
      console.log('Logged out!');
      dispatch(logout())
      navigate("/")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error)
        console.log('Error:', error.response?.data?.message || error.message);
      } else {
        console.log('An unknown login error occurred:', error);
      }
    }
  });

  const handleLogout = () => {
    if (authStatus && !logoutMutation.isPending) logoutMutation.mutate();
  }

  return <>
    <AuthLayout>
      
      <div className="bg-white h-[7vh] flex items-center px-4 justify-between drop-shadow-md mb-2">
        <div className="flex items-center justify-center gap-2">
          <Logo size="small" />
        </div>
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-full bg-white">
            {
              authStatus ?
                <img className="object-fit size-full rounded-full" src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png" />
                :
                <svg className="object-fit size-full rounded-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 18L14 18M17 15V21M4 21C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            }
          </div>
          <Link to="/" className="text-sm text-gray-600 tracking-tighter">{authStatus ? `${auth?.username}` : "Sign In"}</Link>
          <button onClick={handleLogout}>
            <svg className="size-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#FF3951" />
            </svg>
          </button>
        </div>
      </div>
    </AuthLayout>
  </>
}


export {
  Navbar
}