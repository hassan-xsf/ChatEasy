import { useParams } from 'react-router-dom'
import Logo from './Logo'
import { searchUsers } from '../api/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toggleFriend } from '../api/friend';
import { AxiosError } from 'axios';

function SearchMain({ type = "search" }) {

  const { search } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ['search', search],
    queryFn: () => searchUsers({ search }),
    enabled: !!search && type === "search",
  });
  if (error) console.log(error)

  return <>
    {
      isLoading ||
      <div className="bg-white w-[80%] h-[calc(75vh-7vh)] relative">
        <div className="flex flex-col items-center h-full">
          <Logo size="medium" />
          {
            type == "search" ?
              <>
                <span className="text-sm self-start w-3/4 mx-auto font-light">Searched for: {search}</span>
                <span className="text-xs self-start w-3/4 mx-auto font-light">{data?.data.data.count || '0'} Total results found</span>
              </>
              :
              <span className="text-sm self-start w-3/4 mx-auto font-light">My Friends:</span>
          }
          <div className="rounded-md w-3/4 h-3/4 mt-2 grid grid-cols-2 grid-flow-col gap-2 grid-rows-7 p-1">
            {
              data && data?.data.data.users.map((data: any, indx: number) => (
                <SearchBox data={data} key={indx} count={indx + 1} search={search as string} />
              ))
            }
          </div>
        </div>
        
      </div>
    }
  </>
}

interface ISearchbox {
  _id: string,
  count: number,
  gender: "male" | "female",
  isFriend: boolean,
  username: string,
}
function SearchBox({ data, count, search }: { data: ISearchbox, count: number, search: string }) {
  const queryClient = useQueryClient();

  const handleFriendButton = async (id: string, isFriend: boolean , userName: string) => {
    try {
      await toggleFriend(id)
      queryClient.invalidateQueries({
        queryKey: ['search', search],
      });
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error while handling button: " + error.response)
      }
    }


  }

  return <>
    <div className="cursor-pointer bg-primary w-full flex rounded-md items-center justify-between px-3 py-1 gap-3">
      
      <div className="bg-black rounded-full font-sans text-xs size-4 text-white font-bold text-center">
        {count}
      </div>
      <div className="flex gap-2 w-4/5">
        <div className="size-8 rounded-full bg-white">
          <img className="object-fit size-full rounded-full" src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png" />
        </div>
        <div className="font-sans flex flex-col items-center justify-center tracking-tighter">
          <span className="text-sm font-semibold text-white line-clamp-1">@{data.username}</span>
        </div>
      </div>
      {data.isFriend ?
        <button onClick={() => handleFriendButton(data._id, data.isFriend , data.username)} className="bg-primary rounded-full text-md size-6 text-black hover:text-red-700 font-bold text-center">
          <svg className="object-fit size-full rounded-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="cross-circle"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.71,12.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.42,9.71,15.71a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.58,12,8.29,9.71A1,1,0,0,1,9.71,8.29L12,10.58l2.29-2.29a1,1,0,0,1,1.42,1.42L13.42,12Z"></path></svg>
        </button>
        :
        <button onClick={() => handleFriendButton(data._id, data.isFriend , data.username)} className="bg-primary hover:text-blue-400 rounded-full text-md size-6 text-sky-300 font-bold text-center">
          <svg className="object-fit size-full rounded-full" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="currentColor" />
          </svg>
        </button>
      }
    </div>
    
  </>
}

export default SearchMain
