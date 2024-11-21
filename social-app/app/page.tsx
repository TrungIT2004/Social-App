import CreatePost from '@/components/createPost'
import SideMenu from '@/components/sidemenu'
import Contacts from '@/components/contact'
import MainMenu from '@/components/mainmenu'
import ShowPosts from '@/components/ShowPosts'
import { cookies } from 'next/headers'
import { getUserContext } from './getUserContext'
import { redirect } from 'next/navigation'
import { ProfileBadge } from '@/components/ProfileBadge'
import { headers } from 'next/headers';


export default async function Component() {
  const cookieStore = await cookies()
  const refreshToken: string = cookieStore.get('refreshToken')?.value || ''

  const headerList = await headers()
  const pathName = headerList.get('X-Current-Path')
  console.log('Path Name: ', pathName)

  const userContext = await getUserContext(refreshToken)

  if (!userContext?.accessToken) {
    redirect('/login')
  }

  console.log('Home Page')

  return (
    <div className='w-full flex flex-wrap flex-col'> 
      {/* <MainMenu userContext={userContext} /> */}

      <CreatePost userContext={userContext} />

      <div className="w-full flex justify-between">
        <SideMenu /> 
        <ShowPosts userContext={userContext} />
        <Contacts />
      </div>

    </div>
  )
}