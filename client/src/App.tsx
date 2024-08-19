import {Navbar} from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    
    <div className="font-roboto bg-gradient-to-r from-rose-400 to-red-500 min-h-screen flex items-center">
      <div className="w-[65vw] mx-auto bg-white rounded-md shadow-md">
        <div className="h-[75vh]">
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