import { Progress } from 'antd';
import Link from 'next/link';
import CountTo from 'react-count-to';

const RenderProgress = ({ count, path = '/', name }) => {
  return (
    <Link href={path} passHref>
      <a>
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#666',
            '50%': '#fff',
            '100%': '#111',
          }}
          percent={100}
          format={() => <CountTo to={count} speed={count * 100} />}
        />
        <p style={{ marginTop: '18px', color: '#666' }}>{name.toUpperCase()}</p>
      </a>
    </Link>
  );
};

export default RenderProgress;
