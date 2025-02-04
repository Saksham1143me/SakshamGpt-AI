import { Link } from 'react-router-dom'
import './chatList.css'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../pages/loader'
import Spinner from '../spinner/spinner'
function ChatList () {
    const { isPending, error, data } = useQuery({
      queryKey: ['userChats'],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_API_URL}/api/userchats`,{credentials:"include"}).then((res) =>
          res.json(),
        ),
    })
    
  return (
    <div className='chatList'>
       <span className='title'>DASHBOARD</span>
       <Link to='/dashboard'>Create a new Chat</Link>
       <Link to='/'>Explore Saksham Gpt</Link>
       <Link to='/'>Contact</Link>
       <hr/>
       <span className='title'>RECENT CHATS</span>
        <div className="list">
          {isPending?<Spinner/>
          :error?"Something Went Wrong":
          data?.map((chat)=>(
            <Link to={`/dashboard/chats/${chat?._id}`} key={chat?._id}>{chat.title}</Link>
          ))
        }
        </div>
       <hr/>
       <div className="upgrade">
        <img src='/logo.png' alt='logo'></img>
        <div className="texts">
            <span>Upgrade to Saksham Gpt Pro</span>
            <span>Get unlimited access to all features</span>
        </div>
       </div>
    </div>
  )
}
export default ChatList