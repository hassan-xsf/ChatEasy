import { useForm, FieldValues } from 'react-hook-form'
import InputBox from './InputBox'
import Logo from './Logo'
import { Link } from 'react-router-dom';

import { loginUser } from '../api/auth'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { login } from '../store/authSlice'

function Login() {


    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: (data: { email: string; password: string }) => loginUser(data),
        onSuccess: (res) => {
            console.log('Login successful:', res.data.data.user);
            dispatch(login(res.data.data.user))
            navigate("/chat")
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log('Login error:', error.response?.data?.message || error.message);
            } else {
                console.log('An unknown login error occurred:', error);
            }
        }
    });
    const handleLogin = async (data: FieldValues) => {
        loginMutation.mutate({
            email: data.email as string,
            password: data.password as string
        });
    };
    return <>
        <div className="bg-white w-full h-[calc(75vh-7vh)] relative pt-0.5">

            <form onSubmit = {handleSubmit(handleLogin)} className="flex flex-col justify-center gap-2">
                <Logo size="medium" />
                <span className="text-xs mb-4 text-center">Login to your account.</span>

                {loginMutation.error && (
                    <span className="text-xs mb-4 w-1/3 mx-auto text-red-500">
                        {loginMutation.error instanceof AxiosError
                            ? loginMutation.error.response?.data?.message || 'An unknown registration error occurred'
                            : 'An unknown error occurred'}
                    </span>
                )}


                <div className="flex flex-col justify-center items-center gap-2">
                    <InputBox label="Email" type="text" name="email" required={true} register={register} />
                    {errors.email && <span className="text-xs text-red-500 w-1/3 mx-auto">{errors.email.message as string}</span>}
                    <InputBox label="Password" type="password" name="password" required={true} register={register} />
                </div>
                <Link to = "/register" className="text-xs mb-4 w-1/3 mx-auto">Don't have an account?</Link>
                <button className="text-md w-[10%] mx-auto rounded-3xl mb-4 p-2 text-white font-semibold bg-primary">Sign In</button>
            </form>

        </div>
    </>
}

export default Login

