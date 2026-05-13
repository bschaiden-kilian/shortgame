import Card from '../../../common/components/Card';
import { Body1} from '../../../common/components/Text';
import type User from '../data/user_model';

interface IUserCardProps {
    user : User
    onClick?: (user: User) => void
}

const UserCard = (props : IUserCardProps) => {
  return (
    <Card onClick={() => props.onClick ? props.onClick(props.user) : ''}>
        <Body1>{props.user.name}</Body1>
    </Card>
  )
}

export default UserCard; 