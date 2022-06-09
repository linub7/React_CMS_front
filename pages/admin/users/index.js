import { useState, useEffect, useContext } from 'react';
import AdminLayout from 'components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';
import axios from 'axios';
import UsersList from 'components/users/UsersList';
import { Col, Row } from 'antd';
import { AuthContext } from 'context/auth';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    getAllUsers();

    return () => {
      setUsers([]);
    };
  }, [auth?.token]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get('/users');
      setUsers(data?.users);
    } catch (error) {
      console.log(error);
      toast.error('OOPS! Something went wrong.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const { data } = await axios.delete(`/users/${userId}`);
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success(data?.message);
          setUsers(users.filter((user) => user._id !== data?.user._id));
        }
      } catch (error) {
        console.log(error);
        toast.error('OOPS! Something went wrong.');
      }
    }
  };

  console.log(users);

  return (
    <AdminLayout>
      <Row>
        <Col span={22} offset={1}>
          <h1 style={{ marginTop: '15px' }}>All Users: {users?.length}</h1>
          <div className="line"></div>
          <UsersList
            handleDeleteUser={handleDeleteUser}
            users={users}
            auth={auth}
          />
        </Col>
      </Row>

      {/* search input */}
    </AdminLayout>
  );
};

export default Users;
