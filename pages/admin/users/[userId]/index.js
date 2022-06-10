import { useState, useEffect, useContext } from 'react';
import AdminLayout from 'components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';
import { Button, Col, Input, Row, Select, Avatar } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthContext } from 'context/auth';
import { MediaContext } from 'context/media';
import MediaTabs from 'components/admin/media/MediaTabs';

const UpdateUser = () => {
  const router = useRouter();
  const {
    query: { userId },
  } = router;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState('');

  const { auth, setAuth } = useContext(AuthContext);
  const { media, setMedia } = useContext(MediaContext);

  useEffect(() => {
    auth?.token && getUser();
  }, [userId, auth?.token]);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/users/${userId}`);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setName(data?.user?.name);
        setEmail(data?.user?.email);
        setWebsite(data?.user?.website);
        setRole(data?.user?.role);
        setImage(data?.user?.image);
      }
    } catch (error) {
      console.log(error);
      router.push('/admin/users');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/users/${userId}`,
        {
          name,
          role,
          email,
          website,
          password,
          image: media?.selected?._id
            ? media?.selected?._id
            : image?._id
            ? image?._id
            : undefined,
        },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      console.log('update user', data);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.user });
        toast.success('User updated successfully');
        setTimeout(() => {
          router.push('/admin/users');
        }, 1000);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={12} offset={6}>
          <h4 style={{ marginTop: '10px', marginBottom: '-10px' }}>
            Update User
          </h4>
          <div className="line"></div>

          <br />
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            {media?.selected ? (
              <>
                <div style={{ marginBottom: '15px' }}></div>
                <Avatar src={media?.selected?.url} size={100} />
              </>
            ) : image ? (
              <>
                <div style={{ marginBottom: '15px' }}></div>
                <Avatar src={image?.url} size={100} />
              </>
            ) : (
              ''
            )}
          </div>
          <MediaTabs />
          <Input
            style={{ margin: '20px 0px 10px 0px' }}
            size="large"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            style={{ margin: '10px 0px 10px 0px' }}
            size="large"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            style={{ margin: '10px 0px 10px 0px' }}
            size="large"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <Input.Password
            style={{ margin: '10px 0px 10px 0px' }}
            size="large"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Select
            value={role}
            style={{ margin: '10px 0px 10px 0px', width: '100%' }}
            onChange={(e) => setRole(e)}
          >
            <Select.Option value="Subscriber">Subscriber</Select.Option>
            <Select.Option value="author">Author</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
          <Button
            disabled={!name || !email || !role}
            size="large"
            onClick={handleSubmit}
            type="default"
            loading={loading}
            block
            style={{ margin: '10px 0px 10px 0px' }}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default UpdateUser;
