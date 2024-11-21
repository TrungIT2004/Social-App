import FriendSideMenu from "@/components/FriendSideMenu"

export default function FriendsLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <div className="w-full min-h-screen flex bg-gradient-to-b from-neutral-50 to-neutral-100 p-6">
            <FriendSideMenu /> 
            {children}
        </div>
    )
}