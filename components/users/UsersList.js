import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useWindowWidth } from '@react-hook/window-size';
import { Avatar, List, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { toCapitalize } from 'utils';

const UsersList = ({ users, handleDeleteUser, auth }) => {
  const onlyWidth = useWindowWidth();
  const router = useRouter();
  return (
    <List
      itemLayout="horizontal"
      dataSource={users}
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
                    auth?.user._id === item._id
                      ? router.push(`/admin/profile`)
                      : router.push(`/admin/users/${item._id}`)
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
                  onClick={() => handleDeleteUser(item._id)}
                />
              </Tooltip>,
            ]}
          >
            <Avatar src={item?.image?.url} style={{ marginRight: '5px' }}>
              {toCapitalize(item?.name[0])}
            </Avatar>
            {onlyWidth > 475 ? (
              <List.Item.Meta title={toCapitalize(item?.name)} />
            ) : (
              <List.Item.Meta
                title={toCapitalize(item?.name.substring(0, 5))}
              />
            )}
            {onlyWidth > 1065 && (
              <List.Item.Meta title={item?.email.substring(0, 20)} />
            )}
            {onlyWidth > 475 ? (
              <List.Item.Meta title={toCapitalize(item?.role)} />
            ) : (
              <List.Item.Meta
                title={toCapitalize(item?.role.substring(0, 2))}
              />
            )}
            <List.Item.Meta title={`${item?.posts?.length || 0} Posts`} />
          </List.Item>
          <div className="line"></div>
        </div>
      )}
    ></List>
  );
};

export default UsersList;
