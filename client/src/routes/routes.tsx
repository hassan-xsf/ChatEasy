import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from 'react'
import ErrorPage from '../components/ErrorPage.tsx'

const App = React.lazy(() => import('../App.tsx'));
const Login = React.lazy(() => import('../components/Login.tsx'));
const Register = React.lazy(() => import('../components/Register.tsx'));
const DefaultMain = React.lazy(() => import('../components/Chat/DefaultMain.tsx'));
const SearchMain = React.lazy(() => import('../components/Chat/SearchMain.tsx'));
const MainChat = React.lazy(() => import('../components/Chat/MainChat.tsx'));
const SideChat = React.lazy(() => import('../components/Chat/SideChat.tsx'));


const Fallback = () => {
    return <>
        <div className="flex justify-center items-center h-full">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    </>
}
const ErrorBoundary = () => {
    return <>
        <ErrorPage/>
    </>
}
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<Fallback />}>
                <App />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<Fallback />}>
                <ErrorBoundary />
            </Suspense>
        ),
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<Fallback />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: '/register',
                element: (
                    <Suspense fallback={<Fallback />}>
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: '/chat',
                element: (
                    <Suspense fallback={<Fallback />}>
                        <SideChat />
                    </Suspense>
                ),
                children: [
                    {
                        path: '',
                        element: (
                            <Suspense fallback={<Fallback />}>
                                <DefaultMain />
                            </Suspense>
                        ),
                    },
                    {
                        path: '/chat/friends/',
                        element: (
                            <Suspense fallback={<Fallback />}>
                                <SearchMain type = "friends"/>
                            </Suspense>
                        ),
                    },
                    {
                        path: '/chat/search/:search',
                        element: (
                            <Suspense fallback={<Fallback />}>
                                <SearchMain type = "search"/>
                            </Suspense>
                        ),
                    },
                    {
                        path: '/chat/group/:groupId',
                        element: (
                            <Suspense fallback={<Fallback />}>
                                <MainChat />
                            </Suspense>
                        ),
                    },
                ]
            }
        ]
    },
])


export default router;