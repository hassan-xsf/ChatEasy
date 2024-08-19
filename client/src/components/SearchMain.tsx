import Logo from './Logo'

function SearchMain() {
  return <>
    <div className="bg-white w-[80%] h-[calc(75vh-7vh)] relative">
      <div className="flex flex-col items-center h-full">
        <Logo size="medium" />
        <span className="text-sm self-start w-3/4 mx-auto font-light">Searched for: Test</span>
        <span className="text-xs self-start w-3/4 mx-auto font-light">10 Results found</span>
        <div className="bg-gray-100 rounded-md w-3/4 h-3/4 mt-2 grid grid-cols-2 grid-flow-col gap-2 grid-rows-7 p-1">
          <SearchBox />
          <SearchBox />
          <SearchBox />
          <SearchBox />
        </div>
      </div>
    </div>
  </>
}

function SearchBox() {
  return <>
    <div className="cursor-pointer bg-white hover:bg-gray-200 w-full flex rounded-md items-center justify-between px-3 py-1 gap-3">
      <div className="bg-black rounded-full font-sans text-xs size-4 text-white font-bold text-center">
        1
      </div>
      <div className="flex gap-2">
        <div className="size-8 rounded-full bg-white">
          <img className="object-fit size-full rounded-full" src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png" />
        </div>
        <div className="font-sans flex flex-col items-center justify-center tracking-tighter">
          <span className="text-sm font-semibold text-primary">@tommyjackson</span>
        </div>
      </div>
      <div className="bg-green-500 rounded-full text-md size-6 text-white font-bold text-center">
        +
      </div>
    </div>
  </>
}

export default SearchMain
