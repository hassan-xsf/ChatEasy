import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { viewGroups } from "../../api/group";
import { useEffect, useState, memo, useRef } from "react";
import { useForm, FieldValues } from "react-hook-form";

import { socket } from './SideChat'
import { useTSSelector } from "../../hooks/useTSSelector";



function MainChat() {
    const [messages, setMessages] = useState<Array<unknown>>([])
    const { register, handleSubmit, reset } = useForm();
    const authData = useTSSelector(state => state.auth.authData)
    const { groupId } = useParams<{ groupId: string }>();
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null)
    if (!groupId) return;

    useEffect(() => {
        setMessages([]);
        socket.emit('joinGroup', { groupId })
        socket.on('loadChats', (history) => {
            setMessages(history)
        })
        socket.on('totals', (sockets) => {
            console.log(sockets)
        })
        socket.on('recieveMessage', ({ msg, from }: { msg: string, from: string }) => {
            const data = {
                from: from,
                groupId,
                msg
            }
            setMessages(prev => [...prev, data])
        })
        return () => {
            socket.emit('leaveGroup', { groupId })
            socket.off('loadChats')
            socket.off('recieveMessage')
        }
    }, [groupId])


    useEffect(() => {
        if (endOfMessagesRef.current) endOfMessagesRef.current.scrollTop = endOfMessagesRef.current.scrollHeight;
    }, [messages])

    const messageGroup = async (e: FieldValues) => {
        socket.emit('sendMessage', { groupId, msg: e.message, from: authData?._id as string })
        reset();
    }


    return <>
        <div className="bg-white w-[80%] h-[calc(98vh-8vh)] sm:h-[calc(80vh-8vh)] lg:h-[calc(75vh-7vh)] relative">
            <MemoizedChatNavbar />
            <div className="w-full bg-white h-[calc(95vh-22vh)] sm:h-[calc(80vh-22vh)] lg:h-[calc(75vh-22vh)] overflow-y-auto relative scrollbar" ref={endOfMessagesRef}>
                <div className="w-[95%] mx-auto flex flex-col items-start pt-4 gap-2">
                    {
                        messages && messages.map((e: any, indx: number) => (
                            <ChatMessage text={e.msg} key={indx} align={authData?._id === e.from ? "start" : "end"} />
                        ))
                    }

                </div>
                <div />
            </div>
            <form onSubmit={handleSubmit(messageGroup)} className="ring rounded-md h-[5vh] w-[95%] mx-4 my-2 absolute bottom-0 right-0 flex items-center">
                <div>
                    <svg className="mx-2 size-7 text-black" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.869 15.219C11.0994 16.26 12.9016 16.26 14.132 15.219C14.5191 14.892 14.8176 14.4727 15 14C14.007 14.1555 13.0048 14.245 12 14.268C10.9952 14.245 9.99299 14.1555 9 14C9.18273 14.4728 9.48158 14.8921 9.869 15.219Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path fill="#000000" d="M14.3138 11.3027C14.481 11.6817 14.9238 11.8534 15.3027 11.6862C15.6817 11.519 15.8534 11.0762 15.6862 10.6973L14.3138 11.3027ZM12.3138 10.6973C12.1466 11.0762 12.3183 11.519 12.6973 11.6862C13.0762 11.8534 13.519 11.6817 13.6862 11.3027L12.3138 10.6973ZM10.3138 11.3027C10.481 11.6817 10.9238 11.8534 11.3027 11.6862C11.6817 11.519 11.8534 11.0762 11.6862 10.6973L10.3138 11.3027ZM8.31382 10.6973C8.14662 11.0762 8.31829 11.519 8.69726 11.6862C9.07623 11.8534 9.51899 11.6817 9.68618 11.3027L8.31382 10.6973ZM16.9497 7.05025L16.4194 7.58058L16.9497 7.05025ZM15.6862 10.6973C15.3915 10.0292 14.7302 9.59819 14 9.59819V11.0982C14.1359 11.0982 14.259 11.1784 14.3138 11.3027L15.6862 10.6973ZM14 9.59819C13.2698 9.59819 12.6085 10.0292 12.3138 10.6973L13.6862 11.3027C13.741 11.1784 13.8641 11.0982 14 11.0982V9.59819ZM11.6862 10.6973C11.3915 10.0292 10.7302 9.59819 10 9.59819V11.0982C10.1359 11.0982 10.259 11.1784 10.3138 11.3027L11.6862 10.6973ZM10 9.59819C9.26985 9.59819 8.60854 10.0292 8.31382 10.6973L9.68618 11.3027C9.74104 11.1784 9.86411 11.0982 10 11.0982V9.59819ZM18.25 12C18.25 15.4518 15.4518 18.25 12 18.25V19.75C16.2802 19.75 19.75 16.2802 19.75 12H18.25ZM12 18.25C8.54822 18.25 5.75 15.4518 5.75 12H4.25C4.25 16.2802 7.71979 19.75 12 19.75V18.25ZM5.75 12C5.75 8.54822 8.54822 5.75 12 5.75V4.25C7.71979 4.25 4.25 7.71979 4.25 12H5.75ZM12 5.75C13.6576 5.75 15.2473 6.40848 16.4194 7.58058L17.4801 6.51992C16.0267 5.06652 14.0554 4.25 12 4.25V5.75ZM16.4194 7.58058C17.5915 8.75268 18.25 10.3424 18.25 12H19.75C19.75 9.94457 18.9335 7.97333 17.4801 6.51992L16.4194 7.58058Z" />
                    </svg>
                </div>
                <div className="h-[80%] w-0.5 bg-gray-200"></div>
                <input {...register("message", { required: true })} type="text" placeholder="Type a message..." className="w-5/6 outline-none text-xs ml-4 px-2 placeholder:text-xs placeholder:italic" />
                <button type="submit">
                    <svg className="ml-8 size-6 text-white hover:text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#FF3951" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </form>
        </div>

    </>
}



function ChatNavbar() {

    const [loading, setLoading] = useState(false);
    const authData = useTSSelector(state => state.auth.authData)
    const { groupId } = useParams<{ groupId: string }>();
    const [chatName, setChatName] = useState("No Chat")
    const [chatAvatar, setChatAvatar] = useState("")

    const { data: oldData } = useQuery({
        queryKey: ['groups'],
        queryFn: viewGroups,
    });
    useEffect(() => {
        if (!oldData || !groupId) return;


        const group = oldData.data.data?.find((e: any) => e._id === groupId);
        if (group) {
            setLoading(true);
            group.members.forEach((x: any) => {
                if (authData?.username !== x.username) {
                    console.log(x)
                    setChatName(x.username)
                    setChatAvatar(x.avatar)
                    return;
                }
            });
        }

    }, [oldData, groupId]);



    return <>
        <div className="sticky top-0 w-full bg-white drop-shadow-md px-4 flex justify-between items-center">
            <div className="flex flex-col w-[95%] mx-auto justify-center">
                {
                    loading &&
                    <div className="flex gap-2 items-center py-1">
                        <div className="size-10 lg:size-12 rounded-full bg-white relative">
                            <img className="object-fit size-full rounded-full" src={chatAvatar} />
                            <div className="size-3 absolute bg-green-500 rounded-full right-0 bottom-0"></div>
                        </div>
                        <div className="font-sans flex flex-col tracking-tighter">
                            <span className="sm:text-sm lg:text-md font-bold text-black">{chatName}</span>
                            <span className="text-xs text-zinc-900 font-[450] tracking-tighter">Hello, welcome to EasyChat!</span>

                            <span className="sm:text-xs lg:text-sm text-green-500 font-semibold tracking-tighter">Status: TBD</span>

                        </div>
                    </div>
                }
            </div>
        </div>
    </>
}
const MemoizedChatNavbar = memo(ChatNavbar);

interface IChatMessage {
    text: string,
    align: "start" | "end"
}

function ChatMessage({ text, align }: IChatMessage) {
    return <div className={`text-white bg-primary text-xs p-2 rounded-md ${align === "end" && "self-end"}`}>{text}</div>
}
export default MainChat