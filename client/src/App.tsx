import React from 'react'
import { InputBox } from './components/index'
import { useForm } from 'react-hook-form'


function App() {
  return (
    <div className="font-roboto bg-gradient-to-r from-rose-400 to-red-500 min-h-screen flex items-center">
      <div className="w-[65vw] mx-auto bg-white rounded-md shadow-md">
        <div className="h-[75vh]">
          <NavBar />
          <div className="flex items-center w-full">
            <ChatIcons />
            <MainChat />
            {/* <DefaultMain /> */}
            {/* <LoginMain /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
function NavBar() {
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
function RegisterMain() {

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
function LoginMain() {

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

function DefaultMain() {
  return <>
    <div className="bg-white w-[80%] h-[calc(75vh-7vh)] relative pt-0.5 mx-autor">
      <div className="flex flex-col items-center justify-center h-96">
        <Logo size="medium" />
        <span>Click on a chat to view user messages.</span>
        <span>Click on <svg className="hover:text-primary cursor-pointer size-6 inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="3" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
          <path d="M15.2679 8C15.5332 7.54063 15.97 7.20543 16.4824 7.06815C16.9947 6.93086 17.5406 7.00273 18 7.26795C18.4594 7.53317 18.7946 7.97 18.9319 8.48236C19.0691 8.99472 18.9973 9.54063 18.7321 10C18.4668 10.4594 18.03 10.7946 17.5176 10.9319C17.0053 11.0691 16.4594 10.9973 16 10.7321C15.5406 10.4668 15.2054 10.03 15.0681 9.51764C14.9309 9.00528 15.0027 8.45937 15.2679 8L15.2679 8Z" stroke="#33363F" stroke-width="2" />
          <path d="M5.26795 8C5.53317 7.54063 5.97 7.20543 6.48236 7.06815C6.99472 6.93086 7.54063 7.00273 8 7.26795C8.45937 7.53317 8.79457 7.97 8.93185 8.48236C9.06914 8.99472 8.99727 9.54063 8.73205 10C8.46683 10.4594 8.03 10.7946 7.51764 10.9319C7.00528 11.0691 6.45937 10.9973 6 10.7321C5.54063 10.4668 5.20543 10.03 5.06815 9.51764C4.93086 9.00528 5.00273 8.45937 5.26795 8L5.26795 8Z" stroke="#33363F" stroke-width="2" />
          <path d="M16.8816 18L15.9013 18.1974L16.0629 19H16.8816V18ZM20.7202 16.9042L21.6627 16.5699L20.7202 16.9042ZM14.7808 14.7105L14.176 13.9142L13.0194 14.7927L14.2527 15.5597L14.7808 14.7105ZM19.8672 17H16.8816V19H19.8672V17ZM19.7777 17.2384C19.7707 17.2186 19.7642 17.181 19.7725 17.1354C19.7804 17.0921 19.7982 17.0593 19.8151 17.0383C19.8474 16.9982 19.874 17 19.8672 17V19C21.0132 19 22.1414 17.9194 21.6627 16.5699L19.7777 17.2384ZM17 15C18.6416 15 19.4027 16.1811 19.7777 17.2384L21.6627 16.5699C21.1976 15.2588 19.9485 13 17 13V15ZM15.3857 15.5069C15.7702 15.2148 16.282 15 17 15V13C15.8381 13 14.9028 13.3622 14.176 13.9142L15.3857 15.5069ZM14.2527 15.5597C15.2918 16.206 15.7271 17.3324 15.9013 18.1974L17.8619 17.8026C17.644 16.7204 17.0374 14.9364 15.309 13.8614L14.2527 15.5597Z" fill="#33363F" />
          <path d="M9.21918 14.7105L9.7473 15.5597L10.9806 14.7927L9.82403 13.9142L9.21918 14.7105ZM3.2798 16.9041L4.22227 17.2384L4.22227 17.2384L3.2798 16.9041ZM7.11835 18V19H7.93703L8.09867 18.1974L7.11835 18ZM7.00001 15C7.71803 15 8.22986 15.2148 8.61433 15.5069L9.82403 13.9142C9.09723 13.3621 8.1619 13 7.00001 13V15ZM4.22227 17.2384C4.59732 16.1811 5.35842 15 7.00001 15V13C4.0515 13 2.80238 15.2587 2.33733 16.5699L4.22227 17.2384ZM4.13278 17C4.126 17 4.15264 16.9982 4.18486 17.0383C4.20176 17.0593 4.21961 17.0921 4.22748 17.1354C4.2358 17.181 4.22931 17.2186 4.22227 17.2384L2.33733 16.5699C1.85864 17.9194 2.98677 19 4.13278 19V17ZM7.11835 17H4.13278V19H7.11835V17ZM8.09867 18.1974C8.27289 17.3324 8.70814 16.206 9.7473 15.5597L8.69106 13.8614C6.96257 14.9363 6.356 16.7203 6.13804 17.8026L8.09867 18.1974Z" fill="#33363F" />
          <path d="M12 14C15.5715 14 16.5919 16.5512 16.8834 18.0089C16.9917 18.5504 16.5523 19 16 19H8C7.44772 19 7.00829 18.5504 7.11659 18.0089C7.4081 16.5512 8.42846 14 12 14Z" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
        </svg> to make group chats</span>
      </div>
    </div>
  </>
}

interface LogoProps {
  size: "small" | "medium"
}

function Logo({ size }: LogoProps) {

  const sizeClass = size === "small" ? "text-xl" : "text-4xl";

  return <>
    <div className="flex items-center justify-center gap-2 w-full">
      <svg
        className={`${size === "small" ? "size-12" : "size-24"}`}
        viewBox="0 0 24 24"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path opacity="0.9" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88836 21.6244 10.4003 22 12 22Z" fill="#FF3951" />
        <path d="M7.825 12.85C7.36937 12.85 7 13.2194 7 13.675C7 14.1306 7.36937 14.5 7.825 14.5H13.875C14.3306 14.5 14.7 14.1306 14.7 13.675C14.7 13.2194 14.3306 12.85 13.875 12.85H7.825Z" fill="#ffffff" />
        <path d="M7.825 9C7.36937 9 7 9.36937 7 9.825C7 10.2806 7.36937 10.65 7.825 10.65H16.625C17.0806 10.65 17.45 10.2806 17.45 9.825C17.45 9.36937 17.0806 9 16.625 9H7.825Z" fill="#ffffff" />
      </svg>
      <div className="flex flex-col justify-center">
        <span className={`text-primary font-bold ${sizeClass}`}>
          EasyChat
        </span>
        <span className="text-secondary font-semibold text-xs italic">Making the chatting easier</span>
      </div>
    </div>
  </>
}






function ChatNavbar() {
  return <>
    <div className="sticky top-0 w-full bg-white h-[8vh] drop-shadow-md px-4 flex justify-between items-center">
      <div className="flex flex-col w-[95%] mx-auto justify-center">
        <div className="flex gap-2 items-center py-1">
          <div className="size-12 rounded-full bg-white relative">
            <img className="object-fit size-full rounded-full" src="https://img.freepik.com/premium-photo/natural-real-person-portrait-closeup-woman-girl-female-outside-nature-forest-artistic-edgy-cute-pretty-face-ai-generated_590464-133625.jpg" />
            <div className="size-3 absolute bg-green-500 rounded-full right-0 bottom-0"></div>
          </div>
          <div className="font-sans flex flex-col tracking-tighter">
            <span className="text-md font-bold text-black">Tommy Jackson</span>
            <span className="text-xs text-zinc-900 font-[450] tracking-tighter">Hello, welcome to EasyChat!</span>
            <span className="text-sm text-green-500 font-semibold tracking-tighter">Online</span>
          </div>
        </div>
      </div>
    </div>
  </>
}

interface IChatMessage {
  text: string,
  align: "start" | "end"
}

function ChatMessage({ text, align }: IChatMessage) {
  return <div className={`text-white bg-primary p-3 text-sm rounded-md ${align === "end" && "self-end"}`}>{text}</div>
}

function MainChat() {
  return <>
    <div className="bg-white w-[80%] h-[calc(75vh-7vh)] relative pt-0.5">
      <ChatNavbar />
      <div className="w-full bg-white h-[calc(75vh-15vh)] overflow-y-auto relative scrollbar">
        <div className="h-full w-[95%] mx-auto flex flex-col items-start pt-4 gap-2">
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Yoyoo" align="start" />
          <ChatMessage text="Tgbat the quicja hjsd da lasdj klajdj kasdklj asdjlk daslkj sdaljkdaslkjdslajklkjasd ljksadljk" align="end" />
        </div>
      </div>
    </div>
  </>
}
function ChatIcons() {
  return <>
    <div className="bg-white ring flex-grow h-[calc(75vh-7vh)] w-[30%] shadow-lg overflow-y-auto relative scrollbar pr-0.5">
      <div className="sticky top-0 w-full h-[7vh] bg-white py-2">
        <div className="flex items-center justify-center mx-auto pt-2 bg-white">
          <div className="flex items-center bg-white rounded-lg w-[70%]">
            <svg className="size-5 text-gray-400 mb-0.5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input className="py-2 px-2 bg-white text-sm border-none outline-none" type="text" placeholder="Search.." />
          </div>
          <svg className="hover:text-primary cursor-pointer size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="3" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
            <path d="M15.2679 8C15.5332 7.54063 15.97 7.20543 16.4824 7.06815C16.9947 6.93086 17.5406 7.00273 18 7.26795C18.4594 7.53317 18.7946 7.97 18.9319 8.48236C19.0691 8.99472 18.9973 9.54063 18.7321 10C18.4668 10.4594 18.03 10.7946 17.5176 10.9319C17.0053 11.0691 16.4594 10.9973 16 10.7321C15.5406 10.4668 15.2054 10.03 15.0681 9.51764C14.9309 9.00528 15.0027 8.45937 15.2679 8L15.2679 8Z" stroke="#33363F" stroke-width="2" />
            <path d="M5.26795 8C5.53317 7.54063 5.97 7.20543 6.48236 7.06815C6.99472 6.93086 7.54063 7.00273 8 7.26795C8.45937 7.53317 8.79457 7.97 8.93185 8.48236C9.06914 8.99472 8.99727 9.54063 8.73205 10C8.46683 10.4594 8.03 10.7946 7.51764 10.9319C7.00528 11.0691 6.45937 10.9973 6 10.7321C5.54063 10.4668 5.20543 10.03 5.06815 9.51764C4.93086 9.00528 5.00273 8.45937 5.26795 8L5.26795 8Z" stroke="#33363F" stroke-width="2" />
            <path d="M16.8816 18L15.9013 18.1974L16.0629 19H16.8816V18ZM20.7202 16.9042L21.6627 16.5699L20.7202 16.9042ZM14.7808 14.7105L14.176 13.9142L13.0194 14.7927L14.2527 15.5597L14.7808 14.7105ZM19.8672 17H16.8816V19H19.8672V17ZM19.7777 17.2384C19.7707 17.2186 19.7642 17.181 19.7725 17.1354C19.7804 17.0921 19.7982 17.0593 19.8151 17.0383C19.8474 16.9982 19.874 17 19.8672 17V19C21.0132 19 22.1414 17.9194 21.6627 16.5699L19.7777 17.2384ZM17 15C18.6416 15 19.4027 16.1811 19.7777 17.2384L21.6627 16.5699C21.1976 15.2588 19.9485 13 17 13V15ZM15.3857 15.5069C15.7702 15.2148 16.282 15 17 15V13C15.8381 13 14.9028 13.3622 14.176 13.9142L15.3857 15.5069ZM14.2527 15.5597C15.2918 16.206 15.7271 17.3324 15.9013 18.1974L17.8619 17.8026C17.644 16.7204 17.0374 14.9364 15.309 13.8614L14.2527 15.5597Z" fill="#33363F" />
            <path d="M9.21918 14.7105L9.7473 15.5597L10.9806 14.7927L9.82403 13.9142L9.21918 14.7105ZM3.2798 16.9041L4.22227 17.2384L4.22227 17.2384L3.2798 16.9041ZM7.11835 18V19H7.93703L8.09867 18.1974L7.11835 18ZM7.00001 15C7.71803 15 8.22986 15.2148 8.61433 15.5069L9.82403 13.9142C9.09723 13.3621 8.1619 13 7.00001 13V15ZM4.22227 17.2384C4.59732 16.1811 5.35842 15 7.00001 15V13C4.0515 13 2.80238 15.2587 2.33733 16.5699L4.22227 17.2384ZM4.13278 17C4.126 17 4.15264 16.9982 4.18486 17.0383C4.20176 17.0593 4.21961 17.0921 4.22748 17.1354C4.2358 17.181 4.22931 17.2186 4.22227 17.2384L2.33733 16.5699C1.85864 17.9194 2.98677 19 4.13278 19V17ZM7.11835 17H4.13278V19H7.11835V17ZM8.09867 18.1974C8.27289 17.3324 8.70814 16.206 9.7473 15.5597L8.69106 13.8614C6.96257 14.9363 6.356 16.7203 6.13804 17.8026L8.09867 18.1974Z" fill="#33363F" />
            <path d="M12 14C15.5715 14 16.5919 16.5512 16.8834 18.0089C16.9917 18.5504 16.5523 19 16 19H8C7.44772 19 7.00829 18.5504 7.11659 18.0089C7.4081 16.5512 8.42846 14 12 14Z" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
      </div>
      <div className="grid grid-rows-7 grid-cols-1 items-center overflow-hidden px-1">
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
      </div>
    </div>
  </>
}
function Chat() {
  return <>
    <div className="cursor-pointer bg-white hover:bg-gray-200 w-full h-[8vh] flex items-center justify-between px-3 py-1 gap-3">
      <div className="flex gap-2">
        <div className="size-12 rounded-full bg-white">
          <img className="object-fit size-full rounded-full" src="https://img.freepik.com/premium-photo/natural-real-person-portrait-closeup-woman-girl-female-outside-nature-forest-artistic-edgy-cute-pretty-face-ai-generated_590464-133625.jpg" />
        </div>
        <div className="font-sans flex flex-col tracking-tighter">
          <span className="text-md font-semibold text-primary">Tommy Jackson</span>
          <span className="text-xs text-zinc-600 font-[450] tracking-tighter">Hey how you doing my man</span>
        </div>
      </div>
      <div className="bg-red-500 rounded-full font-sans text-xs size-4 text-white font-bold text-center">
        6
      </div>
    </div>
  </>
}


export default App