'use client'

import { useMutation } from "@tanstack/react-query"
import { useRouter } from 'next/navigation';
import { UserX } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function SendFriendRequestCardFooter({ userContext, requestid }: any) {
  const router = useRouter();
  console.log(requestid)

  const deleteFriendRequestMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3000/v1/friends/${requestid}`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${userContext?.accessToken}`,
          'X-User-ID': userContext?.userid
        },
        body: JSON.stringify({senderid: userContext?.userid})
      })

      const deletedFriendRequest= await res.json()
      return deletedFriendRequest
    },
    onSettled: () => {
      router.refresh()
    }
  }) 

    return (
        <div className="flex flex-col gap-2 mt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 flex items-center justify-center">
                <UserX className="h-4 w-4 mr-2" />
                Unfriend
              </button>
            </AlertDialogTrigger>
          
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove username from your friends list. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
            
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* OnClick here */}
                <AlertDialogAction disabled={deleteFriendRequestMutation.isPending} onPointerDown={ () => { deleteFriendRequestMutation.mutate() }}> 
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
    )
}