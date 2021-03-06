import { useState, useEffect, useContext } from 'react';
import AdminLayout from 'components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthContext } from 'context/auth';
import { MediaContext } from 'context/media';
import ProfileUpdate from 'components/profile/ProfileUpdate';

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
      const { data } = await axios.put(`/users/${userId}`, {
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
      });
      console.log('update user', data);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success('User updated successfully');
        setTimeout(() => {
          router.push('/admin/users');
        }, 1000);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <ProfileUpdate
        title={'User'}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        loading={loading}
        handleSubmit={handleSubmit}
        website={website}
        setWebsite={setWebsite}
        image={image}
        media={media}
      />
    </AdminLayout>
  );
};

export default UpdateUser;
