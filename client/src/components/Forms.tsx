import { useForm } from 'react-hook-form'
import { InputBox } from './index'
import { Logo } from './index'


function Register() {

    const { register } = useForm();
    return <>
        <div className="bg-white w-full h-[calc(75vh-7vh)] relative pt-0.5">

            <div className="flex flex-col justify-center gap-2">
                <Logo size="medium" />
                <span className="text-xs mb-4 text-center">Register your account.</span>
                <div className="flex flex-col justify-center items-center gap-2">
                    <InputBox label="Username" type="text" name="Username" required={true} register={register} />
                    <InputBox label="Email" type="text" name="Email" required={true} register={register} />
                    <InputBox label="Password" type="password" name="Password" required={true} register={register} />
                    <InputBox label="Confirm Password" type="password" name="Password" required={true} register={register} />

                </div>
                <span className="text-xs mb-4 w-1/3 mx-auto">Already have an account?</span>
                <button className="text-md w-[10%] mx-auto rounded-3xl mb-4 p-2 text-white font-semibold bg-primary">Sign Up</button>
            </div>

        </div>
    </>
}
function Login() {

    const { register } = useForm();
    return <>
        <div className="bg-white w-full h-[calc(75vh-7vh)] relative pt-0.5">

            <div className="flex flex-col justify-center gap-2">
                <Logo size="medium" />
                <span className="text-xs mb-4 text-center">Login to your account.</span>
                <div className="flex flex-col justify-center items-center gap-2">
                    <InputBox label="Email" type="text" name="Email" required={true} register={register} />
                    <InputBox label="Password" type="password" name="Password" required={true} register={register} />
                </div>
                <span className="text-xs mb-4 w-1/3 mx-auto">Don't have an account?</span>
                <button className="text-md w-[10%] mx-auto rounded-3xl mb-4 p-2 text-white font-semibold bg-primary">Sign In</button>
            </div>

        </div>
    </>
}

export {
    Login,
    Register
}

