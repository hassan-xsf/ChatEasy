import { useForm, Controller, FieldValues } from 'react-hook-form'
import InputBox from './InputBox'
import Logo from './Logo'
import { loginUser, registerUser } from '../api/auth'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { login } from '../store/authSlice'
import { Link } from 'react-router-dom';


function Register() {

    const { control, register, handleSubmit, formState: { errors } } = useForm()
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

    const registerMutation = useMutation({
        mutationFn: (data: { email: string; username: string; password: string , gender: string }) => registerUser(data),
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
        }
    });
    const handleRegister = async (data: FieldValues) => {
        registerMutation.mutate({
            email: data.email as string,
            username: data.username as string,
            password: data.password as string,
            gender: data.gender as string,
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
                <Link to="/" className="text-xs mb-4 w-1/3 mx-auto">Already have an account?</Link>
                <button className="text-md w-[10%] mx-auto rounded-3xl mb-4 p-2 text-white font-semibold bg-primary">Sign Up</button>
            </form>

        </div>
    </>
}

export default Register

