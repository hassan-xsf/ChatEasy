import { useForm, Controller, FieldValues } from 'react-hook-form'
import InputBox from './InputBox'
import Logo from './Logo'
import { loginUser, registerUser , uploadPfp} from '../api/auth'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { login } from '../store/authSlice'
import { Link  , useNavigate} from 'react-router-dom';
import {toast} from 'sonner'

function Register() {

    const { control, register, handleSubmit, formState: { errors } } = useForm()
    const [clicked,setClicked] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const loginMutation = useMutation({
        mutationFn: (data: { email: string; password: string }) => loginUser(data),
        onSuccess: (res) => {
            dispatch(login(res.data.data.user))
            navigate("/chat")
            
            toast.success(`You have been succesfully registered and automatically signed in!` , {duration: 4000})
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log('Login error:', error.response?.data?.message || error.message);
            } else {
                console.log('An unknown login error occurred:', error);
            }
        }
    });

    const registerMutation = useMutation({
        mutationFn: (data: { email: string; username: string; password: string, gender: string , fileURL: string}) => registerUser(data),
        onSuccess: (res) => {
            console.log('Registration successful:');
            loginMutation.mutate({
                email: res.data.data.createdUser.email,
                password: res.data.data.config
            });
        },
        onError: (error) => {
            if (error instanceof AxiosError) {

                console.log('Registration error:', error.response?.data?.message || error.message);
            } else {
                console.log('An unknown registration error occurred:', error);
            }
        },
        onSettled: () => {
            setClicked(false)
        }
    });
    const handleRegister = async (data: FieldValues) => {
        if(clicked) return;
        setClicked(true)
        const fireURL = await uploadPfp(data.avatar[0]).catch((e) => {
            console.log("File upload error: " +e)
            return null;
        })
        registerMutation.mutate({
            email: data.email as string,
            username: data.username as string,
            password: data.password as string,
            gender: data.gender as string,
            fileURL: fireURL.secure_url
        });
    };
    return <>
        <div className="bg-white w-full h-[calc(75vh-7vh)] relative pt-0.5">

            <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col justify-center gap-2">
                <Logo size="medium" />
                <span className="text-xs mb-4 text-center">Register your account.</span>
                {registerMutation.error && (
                    <span className="text-xs mb-4 w-1/3 mx-auto text-red-500">
                        {registerMutation.error instanceof AxiosError
                            ? registerMutation.error.response?.data?.message || 'An unknown registration error occurred'
                            : 'An unknown error occurred'}
                    </span>
                )}
                <div className="flex flex-col justify-center items-center gap-2">
                    <InputBox label="Username" type="text" name="username" required={true} register={register} />
                    {errors.username && <span className="text-xs text-red-500 w-1/3 mx-auto">{errors.username.message as string}</span>}
                    <InputBox label="Email" type="text" name="email" required={true} register={register} />
                    {errors.email && <span className="text-xs text-red-500 w-1/3 mx-auto">{errors.email.message as string}</span>}
                    <InputBox label="Password" type="password" name="password" required={true} register={register} />
                    <InputBox label="Avatar" type="file" name="avatar" required={true} register={register} />
                    {errors.avatar && <span className="text-xs text-red-500 w-1/3 mx-auto">{errors.avatar.message as string}</span>}
                </div>
                <div className="flex items-center space-x-4 text-xs mb-4 w-1/3 mx-auto">
                    <label className="flex items-center">
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue="male" // Set default value
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="radio"
                                    value="male"
                                    checked={field.value === 'male'}
                                    className="mr-2"
                                />
                            )}
                        />
                        Male
                    </label>

                    <label className="flex items-center">
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue="male"
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="radio"
                                    value="female"
                                    checked={field.value === 'female'}
                                    className="mr-2"
                                />
                            )}
                        />
                        Female
                    </label>
                </div>
                <Link to="/" className="text-xs mb-4 sm:w-1/3 mx-auto text-nowrap">Already have an account?</Link>
                <button className="text-xs sm:text-sm md:text-md w-[18%] md:w-[15%] lg:w-[10%]  text-nowrap mx-auto rounded-3xl mb-4 p-2 text-white font-semibold bg-primary">{clicked ? "Signing up.." : "Sign Up"}</button>
            </form>

        </div>
    </>
}

export default Register

