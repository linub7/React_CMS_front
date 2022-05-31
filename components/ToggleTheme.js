import { useContext } from 'react';
import { ThemeContext } from 'context/theme';
import Head from 'next/head';

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <Head>
        <link rel="stylesheet" href={`/css/${theme}.css`} />
      </Head>
      {theme === 'light' ? (
        <span
          onClick={toggleTheme}
          style={{ fontSize: '24px', cursor: 'pointer' }}
        >
          🌞
        </span>
      ) : (
        <span
          onClick={toggleTheme}
          style={{ fontSize: '24px', cursor: 'pointer' }}
        >
          🌚
        </span>
      )}
    </>
  );
};

export default ToggleTheme;
