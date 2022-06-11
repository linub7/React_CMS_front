import { useState, useEffect, useContext } from 'react';
import AdminLayout from 'components/admin/layout/AdminLayout';
import ProfileUpdate from 'components/profile/ProfileUpdate';
import { AuthContext } from 'context/auth';
import { MediaContext } from 'context/media';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'axios';

const AdminProfile = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState({});
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState('');

  const { auth, setAuth } = useContext(AuthContext);
  const { media, setMedia } = useContext(MediaContext);

  useEffect(() => {
    auth?.token && getUser();
  }, [auth?.user?._id, auth?.token]);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/me`);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setName(data?.user?.name);
        setEmail(data?.user?.email);
        setWebsite(data?.user?.website);
        setRole(data?.user?.role);
        setImage(data?.user?.image);
        setId(data?.user?._id);
      }
    } catch (error) {
      console.log(error);
      router.push('/admin/users');
    }
  };

  console.log({ name, email, website, role, image, id });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(`/edit/me`, {
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
        setAuth({ ...auth, user: data?.user });
        setMedia({ ...media, selected: data?.user?.image });
        toast.success('User updated successfully');
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
        title={'Profile'}
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
        profile={true}
      />
    </AdminLayout>
  );
};

export default AdminProfile;