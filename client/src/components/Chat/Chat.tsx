

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
        <div className="bg-white w-[80%] h-[calc(75vh-7vh)] relative">
            <ChatNavbar />
            <div className="w-full bg-white h-[calc(75vh-15vh)] overflow-y-auto relative scrollbar">
                <div className="h-full w-[95%] mx-auto flex flex-col items-start pt-4 gap-2">
                    <ChatMessage text="Yoyoo" align="start" />
                    <ChatMessage text="Yoyoo" align="start" />
                    <ChatMessage text="Yoyoo" align="start" />
                    <ChatMessage text="Tgbat the quicja hjsd da lasdj klajdj kasdklj asdjlk daslkj sdaljkdaslkjdslajklkjasd ljksadljk" align="end" />
                </div>
            </div>
            <div className="ring rounded-md h-[5vh] w-[95%] mx-4 my-2 absolute bottom-0 right-0 flex items-center">
                <svg className="mx-2 size-6" viewBox="0 0 24 24" fill="#FF3951" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12H20M12 4V20" stroke="#FF3951" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className="h-[80%] w-0.5 bg-gray-200"></div>
                <input type="text" placeholder="Type a message..." className="w-5/6 outline-none text-xs ml-4 px-2 placeholder:text-xs placeholder:italic" />
                <svg className="ml-8 size-6 text-white hover:text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#FF3951" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
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
  

  export {
    ChatIcons,
    MainChat
  }