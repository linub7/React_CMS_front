import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { toCapitalize } from 'utils';

const PostsList = ({ posts, handleDeletePost, author = false }) => {
  const router = useRouter();
  console.log(posts);
  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
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
                <EditOutlined
                  style={{ color: '#f1c40f' }}
                  onClick={() =>
                    author
                      ? router.push(`/author/posts/edit/${item.slug}`)
                      : router.push(`/admin/posts/edit/${item.slug}`)
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
                  onClick={() => handleDeletePost(item._id)}
                />
              </Tooltip>,
            ]}
          >
            <List.Item.Meta title={toCapitalize(item?.title)} />
            <List.Item.Meta title={item?.postedBy?.name} />
          </List.Item>
          <div className="line"></div>
        </div>
      )}
    ></List>
  );
};

export default PostsList;
