import { useParams } from 'react-router-dom'
import Logo from '../Logo'
import { searchUsers } from '../../api/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toggleFriend, viewFriends } from '../../api/friend';
import { createGroup } from '../../api/group';
import { AxiosError } from 'axios';
import { useTSSelector } from '../../hooks/useTSSelector';
import {toast} from 'sonner'

function SearchMain({ type = "search" }) {
  const { search } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ['search', search],
    queryFn: () => searchUsers({ search }),
    enabled: !!search && type === "search",
  });
  if (error) console.log(error)
  console.log(data?.data.data.users)

  const { isLoading: isLoadingFriends, data: friendsData, error: friendsError } = useQuery({
    queryKey: ['friends'],
    queryFn: () => viewFriends(),
    enabled: type !== "search",
  });
  if (error) console.log(error)
  if (friendsError) console.log(friendsError)


  return <>
    <div className="bg-white w-[80%] h-[calc(75vh-7vh)] relative">
      {
        !(type === 'search' && isLoading) && !(type === 'friends' && isLoadingFriends) &&
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
          <div className="rounded-md w-3/4 h-3/4 mt-2 grid grid-cols-2 grid-flow-col gap-2 grid-rows-5 md:grid-rows-7 p-1">
            {
              type == "search" ?
                data && data?.data.data.users.map((data: any, indx: number) => (
                  <SearchBox data={data} key={indx} count={indx + 1} search={type} />
                ))
                :
                friendsData && friendsData?.data.data.friends.map((data: any, indx: number) => (
                  <SearchBox data={data} key={indx} count={indx + 1} search={type} />
                ))
            }
          </div>
        </div>
      }
    </div>

  </>
}

interface ISearchbox {
  _id: string,
  count: number,
  gender: "male" | "female",
  isFriend: boolean,
  username: string,
  avatar: string
}
function SearchBox({ data, count, search }: { data: ISearchbox, count: number, search: string }) {
  const authData = useTSSelector(state => state.auth.authData)
  const query = useQueryClient();

  const handleFriendButton = async (id: string, isFriend: boolean, username: string) => {
    try {
      if (!authData) return;
      if (authData._id == id) return toast.error(`You can't add yourself as a friend` , {duration: 2000})
      await toggleFriend(id)
      query.invalidateQueries({ queryKey: ['groups'] })
      if(!isFriend) toast.success(`${username} is now your friend now!` , {duration: 2000})
      else toast.info(`${username} is no longer your friend!` , {duration: 2000})
      if (!isFriend) { //todo
        await createGroup({ name: username, members: [authData._id as string, id] })
          .catch((e) => console.log(e))
      }
      console.log(search)
      if (search === 'search') {
        query.invalidateQueries({ queryKey: ['search'] })
      }
      else {
        query.invalidateQueries({ queryKey: ['friends'] })
      }

    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error while handling button: " + error.response)
      }
    }


  }

  return <>
    <div className="cursor-pointer bg-primary w-full flex rounded-md items-center justify-between px-1 lg:px-3 py-1 gap-3">

      <div className="bg-black rounded-full font-sans text-[6px] sm:text-xs size-2 sm:size-4 text-white font-bold text-center">
        {count}
      </div>
      <div className="flex gap-2 lg:w-4/5 flex-col sm:flex-row items-center">
        <div className="size-5 sm:size-8 rounded-full bg-white">
          <img className="object-fit size-full rounded-full" src={data.avatar} />
        </div>
        <div className="font-sans flex flex-col items-center justify-center tracking-tighter">
          <span className="text-xs lg:text-sm font-semibold text-white line-clamp-1">@{data.username}</span>
        </div>
      </div>
      {data.isFriend ?
        <button onClick={() => handleFriendButton(data._id, data.isFriend, data.username)} className="bg-primary rounded-full text-md size-4 sm:size-7 text-black hover:text-red-700 font-bold text-center">
          <svg className="object-fit size-full rounded-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="cross-circle"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.71,12.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.42,9.71,15.71a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.58,12,8.29,9.71A1,1,0,0,1,9.71,8.29L12,10.58l2.29-2.29a1,1,0,0,1,1.42,1.42L13.42,12Z"></path></svg>
        </button>
        :
        <button onClick={() => handleFriendButton(data._id, data.isFriend, data.username)} className="bg-black rounded-full text-md size-4 sm:size-6 text-sky-400 font-bold text-center">
          <svg className="object-fit size-full rounded-full" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      }
    </div>

  </>
}

export default SearchMain
