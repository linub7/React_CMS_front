import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { toCapitalize } from 'utils';

const CommentsList = ({ comments, handleDeleteComment }) => {
  const router = useRouter();
  return (
    <List
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(item) => (
        <div key={item._id}>
          <List.Item
            style={{ cursor: 'pointer' }}
            key={item._id}
            actions={[
              <Tooltip
                placement="left"
                key={item._id}
                title="Edit"
                color={'#f1c40f'}
              >
                <EditOutlined style={{ color: '#f1c40f' }} onClick={() => {}} />
              </Tooltip>,
              <Tooltip
                placement="top"
                key={item._id + 'delete'}
                title="Delete"
                color={'#e74c3c'}
              >
                <DeleteOutlined
                  style={{ color: '#e74c3c' }}
                  onClick={() => handleDeleteComment(item._id)}
                />
              </Tooltip>,
            ]}
          >
            <List.Item.Meta
              title={toCapitalize(item?.content).substring(0, 30)}
            />
            <List.Item.Meta
              title={toCapitalize(item?.postedBy?.name).substring(0, 4)}
            />
          </List.Item>
          <div className="line"></div>
        </div>
      )}
    ></List>
  );
};

export default CommentsList;
