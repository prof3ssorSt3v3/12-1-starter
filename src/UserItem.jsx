import { NavLink } from 'react-router-dom';

export default function UserItem({ user }) {
  return (
    <li>
      <p>
        <NavLink to={`/users/${user.uid}`}>{user.full_name}</NavLink>
      </p>
    </li>
  );
}
