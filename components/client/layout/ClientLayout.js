import { useContext, useEffect, useState } from 'react';
import { Layout } from 'antd';
import { ThemeContext } from 'context/theme';
import { AuthContext } from 'context/auth';
import { useRouter } from 'next/router';
import axios from 'axios';
import LoadingToRedirect from 'components/shared/LoadingToRedirect';

const { Content } = Layout;

const ClientLayout = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    auth?.token
      ? getCurrentSubscriber()
      : setTimeout(() => {
          setLoading(false);
        }, 3000);
    return () => {
      setLoading(false);
    };
  }, [auth?.token]);

  const getCurrentSubscriber = async () => {
    try {
      const { data } = await axios.get('/current-subscriber');
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (loading) {
    return <LoadingToRedirect />;
  }
  return (
    <Layout>
      <Content
        style={{
          backgroundColor: `${theme === 'dark' ? '#000' : '#fff'}`,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default ClientLayout;
