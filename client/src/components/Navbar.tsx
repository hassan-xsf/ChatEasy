import {Logo} from './index'


function Navbar() {
    return <>
      <div className="bg-white h-[7vh] flex items-center px-4 justify-between drop-shadow-md mb-2">
        <div className="flex items-center justify-center gap-2">
          <Logo size="small" />
        </div>
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-full bg-white">
            <img className="object-fit size-full rounded-full" src="https://img.freepik.com/premium-photo/natural-real-person-portrait-closeup-woman-girl-female-outside-nature-forest-artistic-edgy-cute-pretty-face-ai-generated_590464-133625.jpg" />
          </div>
          <span className="text-sm text-gray-600 tracking-tighter">My Account</span>
          <svg className="size-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#FF3951" />
          </svg>
        </div>
      </div>
    </>
  }


  export {
    Navbar
  }