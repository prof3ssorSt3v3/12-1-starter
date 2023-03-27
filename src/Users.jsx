import UserItem from './UserItem';
import { Outlet, useParams } from 'react-router-dom';

export default function Users({ userState }) {
  const [users, setUsers] = userState;
  const { uid } = useParams();

  const userMatch = users.find((u) => u.uid === uid);

  return (
    <main>
      <h2>Users Page</h2>

      <section>
        <h3>User List</h3>
        <ul>
          {users.map((user) => (
            <UserItem key={user.uid} user={user} />
          ))}
        </ul>
      </section>

      <Outlet context={userMatch} />
    </main>
  );
}
