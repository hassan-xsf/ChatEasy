import Logo from '../Logo'

function DefaultMain() {
  return <>
    <div className="bg-white w-[80%] h-[calc(75vh-7vh)] relative">
      <div className="flex flex-col items-center justify-center h-96 text-xs lg:text-sm">
        <Logo size="medium" />
        <span>Click on a chat to view user messages.</span>
        <span>Search and add a friend to start chatting</span>
      </div>
    </div>
  </>
}

export default DefaultMain
