import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LoadingToRedirect = ({ path = '/' }) => {
  const router = useRouter();

  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <p>Redirecting in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
