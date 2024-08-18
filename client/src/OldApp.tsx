import { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

function App() {
  const [messages, setMessages] = useState<Array<string>>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const roomRef = useRef<HTMLInputElement>(null)

  const [room, setRoom] = useState<string | null>(null)
  const [error, setError] = useState<string>("")
  
  useEffect(() => {
    setError("")
    if (room) {
      socket.on('msgRoom', (msg) => {
        setMessages(prev => [...prev, msg])
      })
    }
    return () => {
      socket.off('msgRoom');
    }
  }, [room])

  const submitMessage = () => {
    setError("")
    if (!room) return setError("Please enter a room ID first")
    if (inputRef.current) {
      socket.emit('msgRoom', { msg: inputRef.current?.value, room })
      inputRef.current.value = "";
    }
  }
  const enterRoom = () => {
    setError("")
    if (roomRef.current?.value) {
      const roomName = roomRef.current.value;
      setRoom(roomRef.current.value)
      socket.emit('joinRoom', roomName)
      roomRef.current.value = "";
    }
  }

  return (
    <div className="bg-zinc-900 h-screen w-full font-serif py-10 flex items-center flex-col">
      <h1 className="text-6xl font-extrabold text-sky-500">Chat App</h1>
      {room && <h1 className="text-3xl font-extrabold text-green-500">Room Name: {room}</h1>}
      {error && <h1 className="text-2xl font-extrabold text-red-600">{error}</h1>}
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center gap-2">
          <input type="text" ref={inputRef} className="w-96 p-2 my-4 h-10 rounded-xl" placeholder="Enter your message to broadcast" />
          <button onClick={submitMessage} className="bg-white text-sky-500 rounded-xl text-nowrap p-2">Submit Message</button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <input type="text" ref={roomRef} className="w-96 p-2 my-4 h-10 rounded-xl" placeholder="Enter your room name" />
          <button onClick={enterRoom} className="bg-white text-sky-500 rounded-xl text-nowrap p-2">Join Room</button>
        </div>
        {
          messages && messages.map((e, indx) => (
            <span className="text-sm text-white" key={indx}>{e}</span>
          ))
        }
      </div>
    </div>
  )
}

export default App
