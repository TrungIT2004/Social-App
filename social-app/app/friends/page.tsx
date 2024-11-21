// 'use client'

// import { useQuery } from "@tanstack/react-query"
// import { FriendRequest } from "@/components/FriendRequestCard"
// import FriendSidebar from "@/components/FriendSideMenu";
// import FriendSideMenu from "@/components/FriendSideMenu";

// // Mock data - replace with actual API calls
// const mockFriendRequests = [
//   {
//     id: "1",
//     name: "Alex Johnson",
//     mutualFriends: 12,
//     imageUrl: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     id: "2",
//     name: "Sarah Wilson",
//     mutualFriends: 8,
//     imageUrl: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: "3",
//     name: "Michael Brown",
//     mutualFriends: 15,
//     imageUrl: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: "4",
//     name: "Emma Davis",
//     mutualFriends: 6,
//     imageUrl: "https://i.pravatar.cc/150?img=4",
//   },
// ];

// const FriendRequests = () => {
//   const { data: requests, isLoading } = useQuery({
//     queryKey: ["friendRequests"],
//     queryFn: () => Promise.resolve(mockFriendRequests),
//   });

//   const handleAccept = async (id: string) => {
//     console.log("Accepting friend request:", id);
//     // Implement actual accept logic here
//     await new Promise((resolve) => setTimeout(resolve, 500));
//   };

//   const handleDecline = async (id: string) => {
//     console.log("Declining friend request:", id);
//     // Implement actual decline logic here
//     await new Promise((resolve) => setTimeout(resolve, 500));
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-pulse text-neutral-500">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-semibold text-neutral-800">Friend Requests</h1>
//           <p className="text-neutral-500 mt-2">
//             {requests?.length || 0} pending requests
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {requests?.map((request) => (
//             <FriendRequest
//               key={request.id}
//               {...request}
//               onAccept={handleAccept}
//               onDecline={handleDecline}
//             />
//           ))}
//         </div>

//         {requests?.length === 0 && (
//           <div className="text-center py-12 text-neutral-500">
//             No pending friend requests
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FriendRequests;