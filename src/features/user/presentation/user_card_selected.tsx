import type User from '../data/user_model';

interface IUserCardProps {
  user: User
  index: number
  onClick?: (user: User) => void
}

const UserCardSelected = (props: IUserCardProps) => {
  return (
    <div onClick={() => props.onClick != undefined ? props.onClick(props.user) : ''} className='w-full h-fit p-4 flex items-center gap-4 bg-mist-900 rounded-lg border-2 border-emerald-500'>
      <span className='w-6 h-6 flex justify-center items-center rounded-full text-mist-900 bg-emerald-500 font-mono font-black text-xs'>{props.index}</span>
      <p className='text-sm font-light'>{props.user.name}</p>
    </div>
  )
}

export default UserCardSelected; 