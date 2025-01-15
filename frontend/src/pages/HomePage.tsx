import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const HomePage = () => {
    const { role, user } = useSelector((state: RootState) => state.auth);

    return (
      <div>
        <p>Role: {role}</p>
        <p>Email: {user?.email}</p>
      </div>
    );
}
