import { useContext } from 'react';
import { AuthContext } from 'context/auth';

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
