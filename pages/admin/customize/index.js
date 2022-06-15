import { Button, Col, Divider, Image, Input, Row } from 'antd';
import axios from 'axios';
import AdminLayout from 'components/admin/layout/AdminLayout';
import MediaTabs from 'components/admin/media/MediaTabs';
import { MediaContext } from 'context/media';
import useHome from 'hooks/useHome';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Customize = () => {
  const router = useRouter();

  // context
  const { media } = useContext(MediaContext);

  const [loading, setLoading] = useState(false);

  // hooks
  const {
    title,
    setTitle,
    subtitle,
    setSubtitle,
    fullWidthImage,
    setFullWidthImage,
  } = useHome();

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/page`, {
        page: 'home',
        title,
        subtitle,
        fullWidthImage: media?.selected?._id,
      });
      toast.success('Page created successfully');
      setTitle('');
      setSubtitle('');
      setFullWidthImage('');
      setLoading(false);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error('Error creating page');
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Divider>
            <h1>Customize Homepage</h1>
            <p>Set Full width image, title and subtitle</p>
          </Divider>
        </Col>

        <Col span={18}>
          <MediaTabs />

          <Input
            style={{ margin: '15px 0' }}
            size="large"
            placeholder="Give it a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            style={{ marginBottom: '15px' }}
            size="large"
            placeholder="Give it a Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <Button type="default" block loading={loading} onClick={handleSave}>
            Save
          </Button>
        </Col>
        <Col span={6}>
          <div style={{ margin: '40px 0px 0px 20px' }}>
            {media?.selected ? (
              <Image
                width="100%"
                src={media?.selected?.url}
                alt="selected image"
              />
            ) : fullWidthImage ? (
              <Image
                width="100%"
                src={fullWidthImage?.url}
                alt="full width image"
              />
            ) : (
              ''
            )}
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Customize;
