import { useContext, useEffect, useState } from 'react';
import { Subheading2 } from '../../../common/components/Text';
import { ServiceContext } from '../../../common/context/ServiceContext';
import type User from '../data/user_model';
import UserCard from './user_card';
import UserCardSelected from './user_card_selected';

const MAX_PLAYERS = 4;

interface IUserSelectionListProps {
    onSelect: (selected: string[]) => void
}

const UserSelectionList = (props: IUserSelectionListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const service = useContext(ServiceContext);

  useEffect(() => {
    if (!service) return;
    let cancelled = false;

    const poll = () => {
      if (cancelled) return;
      const u = service.userService.getUsers();
      if (u.length === 0) {
        setTimeout(poll, 200);
        return;
      }
      setUsers(u);
    };

    poll();
    return () => { cancelled = true; };
  }, [service]);

  const handleUserClick = (user: User) => {
    setSelectedIds((prev) => {
      if (prev.includes(user.id)) {
        return prev.filter((id) => id !== user.id);
      }
      if (prev.length >= MAX_PLAYERS) {
        return prev;
      }
      return [...prev, user.id];
    });
  };

  useEffect(() => {props.onSelect(selectedIds)}, [selectedIds])

  // Derived state — recomputed on every render, no sync issues
  const selectedUsers = selectedIds
    .map((id) => users.find((u) => u.id === id))
    .filter((u): u is User => u !== undefined);
  
  const unselectedUsers = users.filter((u) => !selectedIds.includes(u.id));

  return (
    <div className='flex-1 overflow-y-auto'>
      <nav className='flex justify-between'>
        <Subheading2>Players</Subheading2>
        <Subheading2>{String(selectedIds.length).padStart(2, '0')}/0{MAX_PLAYERS}</Subheading2>
      </nav>
      <div className='h-full flex flex-col gap-2 py-4'>
        {selectedUsers.map((u, i) => (
          <UserCardSelected key={u.id} index={i + 1} user={u} onClick={handleUserClick} />
        ))}
        {unselectedUsers.map((u) => (
          <UserCard key={u.id} user={u} onClick={handleUserClick} />
        ))}
      </div>
    </div>
  );
};

export default UserSelectionList;