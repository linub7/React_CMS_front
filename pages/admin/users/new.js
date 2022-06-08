import { useState } from 'react';
import generator from 'generate-password';
import AdminLayout from 'components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';
import { Button, Checkbox, Col, Input, Row, Select } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';

const NewUser = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState(
    generator.generate({ length: 6, numbers: true })
  );
  const [role, setRole] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/users', {
        name,
        role,
        email,
        website,
        password,
        checked,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success('User created successfully');
        if (checked) {
          toast.success(data?.message);
        }
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
            Add New User
          </h4>
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

          <div style={{ display: 'flex' }}>
            <Button
              size="large"
              type="default"
              style={{ margin: '10px 0px 10px 0px' }}
              onClick={() =>
                setPassword(generator.generate({ length: 6, numbers: true }))
              }
            >
              Generate Password
            </Button>
            <Input.Password
              style={{ margin: '10px 0px 10px 0px' }}
              size="large"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Select
            defaultValue="Subscriber"
            style={{ margin: '10px 0px 10px 0px', width: '100%' }}
            onChange={(e) => setRole(e)}
          >
            <Select.Option value="Subscriber">Subscriber</Select.Option>
            <Select.Option value="author">Author</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          >
            Send the new user and email about the account.
          </Checkbox>
          <Button
            disabled={!name || !email || !password}
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

export default NewUser;
