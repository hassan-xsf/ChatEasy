import { UseFormRegister } from 'react-hook-form';


interface InputBoxProps {
    label?: string,
    type: string,
    name: string,
    required: boolean,
    register: UseFormRegister<any>
}

function InputBox({ label, type, name, required = false, register }: InputBoxProps) {
    return (
        <>
            <div className="relative w-2/3 sm:w-1/3">
                <input
                    type={type}
                    {...register(name,
                        {
                            required: required,
                            pattern:
                                name === "email" ?
                                    {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address'
                                    } : name === "username"
                                        ? {
                                            value: /^[a-zA-Z0-9]+$/,
                                            message: 'Username can only contain letters and numbers'
                                        }
                                        : undefined,

                            validate: (value) => {
                                if (type === "file") {
                                    if (!value[0]) {
                                        return "Please upload a file";
                                    }
                                    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
                                    if (!allowedTypes.includes(value[0].type)) {
                                        return "Only image files (jpeg, png, gif) are allowed";
                                    }
                                }
                                return true;
                            },
                        }
                    )}
                    accept={type === "file" ? "image/*" : ""}
                    id={name}
                    className="peer block w-full text-xs px-6 pt-4 pb-2 border rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
                    placeholder=" "
                />
                {
                    label && (<label
                        htmlFor={name}
                        className="absolute top-3 left-3 text-gray-500 text-xs transition-transform transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-blue-500"
                    >
                        {label}
                    </label>)
                }
            </div>
        </>
    )
}

export default InputBox