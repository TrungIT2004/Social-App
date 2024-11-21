import { getUserContext } from "@/app/getUserContext";
import { FriendRequest } from "@/components/FriendRequestCard"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const FriendRequests = async () => {
  const cookieStore = await cookies()
  const refreshToken: string = cookieStore.get('refreshToken')?.value || ''
  
  const userContext = await getUserContext(refreshToken)

  if (!userContext?.accessToken) {
    redirect('/login')
  }

  const res = await fetch('http://localhost:3000/v1/friends/get-receiver-requests', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${userContext?.accessToken}`,
      'X-User-ID': userContext?.userid
    }
  })

  const friendRequestList = await res.json()

  console.log('Friends Requests')

  return (
      <div className="w-[800px]">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900">Friend Requests</h1>
          <p className="text-neutral-500 mt-1">
            {friendRequestList?.length || 0} pending requests
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friendRequestList?.map((request: any) => (
            <FriendRequest
              key={request._id}
              name={request.senderName}
              mutualFriends={Number(0)}
              imageUrl={request.senderProfilePic}
              userContext={userContext}
              requestid={request._id}
              senderid={request.senderid}
            />
          ))}
        </div>

        {friendRequestList?.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            No pending friend requests
          </div>
        )}
      </div>
  );
};

export default FriendRequests;