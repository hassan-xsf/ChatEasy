
import { Navbar } from './Navbar'
import Logo from './Logo'

function ErrorPage() {
    return (
        <div className="font-roboto bg-gradient-to-r from-rose-400 to-red-500 min-h-screen flex items-center">
            <div className="w-[65vw] mx-auto bg-white rounded-md shadow-md">
                <div className="h-[75vh]">
                    <Navbar />
                    <div className="flex items-center w-full">
                        <div className="bg-white w-full h-[calc(75vh-7vh)] relative pt-0.5">

                            <div className="flex flex-col justify-center gap-2">
                                <Logo size="medium" />
                                <span className = "mt-14 text-primary text-5xl font-bold text-center">404</span>
                                <span className="text-3xl font-bold mb-4 text-center">PAGE NOT FOUND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage