import {Navbar} from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

function App() {
  return (
    
    <div className="font-roboto bg-gradient-to-r from-rose-400 to-rose-600 min-h-screen flex items-center">
      <div className="w-[98vw] sm:w-[75vw] lg:w-[65vw] mx-auto bg-white rounded-md shadow-md">
      <Toaster richColors position= 'top-right' />
        <div className="h-[98vh] sm:h-[80vh] lg:h-[75vh]">
            <Navbar />
            <div className="flex items-center w-full">
              <Outlet/>
            </div>
        </div>
      </div>
    </div>
  )
}




export default App