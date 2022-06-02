import TopNav from 'components/TopNav';
import { ThemeProvider } from 'context/theme';
import '/public/css/style.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from 'context/auth';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster />
        <TopNav />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
