import { useContext } from 'react';
import { Layout } from 'antd';
import { ThemeContext } from 'context/theme';

const { Content } = Layout;

const ClientLayout = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Layout>
      <Content
        style={{
          padding: '10px',
          backgroundColor: `${theme === 'dark' ? '#000' : '#fff'}`,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default ClientLayout;
