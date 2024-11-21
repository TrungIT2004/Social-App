import { User } from "lucide-react"
import { toast } from "sonner"
import { FriendCardFooter } from "./FriendCardFooter"

interface FriendCardProps {
  userid: string;
  username: string;
  profilepic?: string;
  userContext: object;
}

export const FriendCard = ({
  userid,
  username,
  profilepic,
  userContext,
}: FriendCardProps) => {
  
  return (
    <div className="bg-white rounded-lg overflow-hidden w-full flex flex-col shadow-sm">
      <div className="relative w-full aspect-square bg-neutral-100">
        {profilepic ? (
          <img
            src={profilepic}
            alt={username}
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
        <h3 className="font-medium text-gray-900 text-left">{username}</h3>
        
        <FriendCardFooter userid={userid} username={username} profilepic={profilepic} userContext={userContext}  />
      </div>
    </div>
  );
};
