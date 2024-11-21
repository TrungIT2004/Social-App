import { getUserContext } from "@/app/getUserContext";
import { FriendCard } from "@/components/FriendCard"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Friend {
  id: string;
  name: string;
  imageUrl?: string;
}

const Friends = async () => {
  const cookieStore = await cookies()
  const refreshToken: string = cookieStore.get('refreshToken')?.value || ''
  
  const userContext = await getUserContext(refreshToken)

  if (!userContext?.accessToken) {
    redirect('/login')
  }

  const res = await fetch('http://localhost:3000/v1/friends/list', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${userContext?.accessToken}`,
      'X-User-ID': userContext?.userid
    }
  })

  const friendList = await res.json()

  console.log('Friends Requests')

  return (
    <div className="max-w-[1200px] bg-neutral-100 p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900">Friends</h1>
          <p className="text-neutral-500 mt-1">
            {friendList?.length || 0} friends
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friendList?.map((friend: any) => (
            <FriendCard
              key={friend.id}
              {...friend}
              userContext={userContext}
            />
          ))}
        </div>

        {friendList?.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            No friends yet
          </div>
        )}
    </div>
  );
};

export default Friends;
