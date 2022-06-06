import TopNav from 'components/TopNav';
import { ThemeProvider } from 'context/theme';
import '/public/css/style.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from 'context/auth';
import { PostProvider } from 'context/post';
import { CategoryProvider } from 'context/category';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PostProvider>
          <CategoryProvider>
            <Toaster />
            <TopNav />
            <Component {...pageProps} />
          </CategoryProvider>
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
