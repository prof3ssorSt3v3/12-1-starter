import { useParams, useOutletContext } from 'react-router-dom';

export default function UserDetails() {
  const { uid } = useParams();
  const user = useOutletContext();

  return (
    <section>
      <h3>User Details</h3>
      <p>{uid}</p>
      <p>{user.full_name}</p>
      <p>{user.email}</p>
    </section>
  );
}
