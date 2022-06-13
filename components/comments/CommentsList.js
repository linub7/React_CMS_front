import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { List, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { toCapitalize } from 'utils';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

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
                title="View"
                color={'#40A9FF'}
              >
                <EyeOutlined
                  style={{ color: '#40A9FF' }}
                  onClick={() =>
                    router.push(`/posts/${item?.post?.slug}#${item?._id}`)
                  }
                />
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
              title={item?.content}
              description={`On ${item?.post?.title} | ${
                item?.postedBy?.name
              } | ${dayjs(item?.createdAt).format('L LT')}`}
            />
            {/* <List.Item.Meta
              title={toCapitalize(item?.postedBy?.name).substring(0, 4)}
            /> */}
          </List.Item>
          <div className="line"></div>
        </div>
      )}
    ></List>
  );
};

export default CommentsList;
