

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

export default MainChat