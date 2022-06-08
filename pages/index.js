import { useContext } from 'react';
import { AuthContext } from 'context/auth';
import ClientLayout from 'components/client/layout/ClientLayout';

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <ClientLayout>
      <h1>Home</h1>
    </ClientLayout>
  );
};

export default Home;
