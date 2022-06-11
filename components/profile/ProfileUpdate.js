import { Avatar, Button, Col, Input, Row, Select } from 'antd';
import MediaTabs from 'components/admin/media/MediaTabs';
import AuthorMediaTabs from 'components/author/media/AuthorMediaTabs';

const ProfileUpdate = ({
  title,
  media,
  image,
  name,
  setName,
  email,
  setEmail,
  website,
  setWebsite,
  password,
  setPassword,
  role,
  setRole,
  handleSubmit,
  loading,
  profile = false,
}) => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <h4 style={{ marginTop: '10px', marginBottom: '-10px' }}>
          Update {title}
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
        {role === 'admin' ? <MediaTabs /> : <AuthorMediaTabs />}
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
        {!profile && (
          <Select
            value={role}
            style={{ margin: '10px 0px 10px 0px', width: '100%' }}
            onChange={(e) => setRole(e)}
          >
            <Select.Option value="Subscriber">Subscriber</Select.Option>
            <Select.Option value="author">Author</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        )}
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
  );
};

export default ProfileUpdate;
