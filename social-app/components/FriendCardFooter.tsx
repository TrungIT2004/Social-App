'use client'

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { UserX } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


export function FriendCardFooter({userid, username, profilepic, userContext}: any) {
    const router = useRouter()

    const unfriendMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch('http://localhost:3000/v1/friends/unfriend', {
                method: "PATCH",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${userContext?.accessToken}`,
                    'X-User-ID': userContext?.userid
                },
                body: JSON.stringify({user1id: userContext?.userid, user2id: userid})
            })

            return await res.json()
        },
        onSettled: () => {
            router.refresh()
        }
    })
    
    return (
        <div className="flex flex-col gap-2 mt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="w-full px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 flex items-center justify-center"
              >
                <UserX className="h-4 w-4 mr-2" />
                Unfriend
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove name from your friends list. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onPointerDown={ () => unfriendMutation.mutate() }>
                  Tiếp tục
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
    )
}