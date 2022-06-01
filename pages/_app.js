import TopNav from 'components/TopNav';
import { ThemeProvider } from 'context/theme';
import '/public/css/style.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Toaster />
      <TopNav />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
