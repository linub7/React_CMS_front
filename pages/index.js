import LandingCategories from 'components/client/landing/LandingCategories';
import LandingFooter from 'components/client/landing/LandingFooter';
import LandingLatestPosts from 'components/client/landing/LandingLatestPosts';
import LandingRenderingCount from 'components/client/landing/LandingRenderingCount';
import ClientLayout from 'components/client/layout/ClientLayout';
import HeroSection from 'components/hero/HeroSection';
import { AuthContext } from 'context/auth';
import useNumbers from 'hooks/useNumbers';
import Head from 'next/head';
import { useContext } from 'react';

const Home = () => {
  const { auth } = useContext(AuthContext);

  const { usersCounts, postsCount, commentsCount, categoriesCount } =
    useNumbers();

  return (
    <ClientLayout>
      <Head>
        <title>Modern Content Management System</title>
        <meta
          name="description"
          content="Read latest blog posts on web development"
        />
      </Head>
      <HeroSection auth={auth} />
      <LandingRenderingCount
        categoriesCount={categoriesCount}
        commentsCount={commentsCount}
        usersCounts={usersCounts}
        postsCount={postsCount}
      />
      <LandingLatestPosts />
      <LandingCategories />
      <LandingFooter />
    </ClientLayout>
  );
};

export default Home;
