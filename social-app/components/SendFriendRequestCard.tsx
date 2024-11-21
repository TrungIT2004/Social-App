import { User, Users } from "lucide-react";
import { SendFriendRequestCardFooter } from "./SendFriendRequestCardFooter";

interface FriendRequestProps {
  name: string;
  mutualFriends: number;
  imageUrl?: string;
  userContext: object;
  requestid: string;
}

export const SendFriendRequest = ({name, mutualFriends, imageUrl, userContext, requestid}: FriendRequestProps) => {

  return (
    <div className="bg-white rounded-lg overflow-hidden w-full flex flex-col shadow-sm">
      <div className="relative w-full aspect-square bg-neutral-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <User className="h-16 w-16 text-neutral-400" />
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-900 text-left">{name}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1 mb-4">
          <Users className="h-4 w-4 mr-1" />
          <span>{mutualFriends} mutual friends</span>
        </div>
        
        <SendFriendRequestCardFooter userContext={userContext} requestid={requestid} />
      </div>
    </div>
  );
};