import { Button, Col, Divider, Row } from 'antd';
import Link from 'next/link';
import useCategory from 'hooks/useCategory';

const LandingCategories = () => {
  const { categories } = useCategory();
  return (
    <Row>
      <Col
        span={24}
        style={{ textAlign: 'center', marginTop: '80px', marginBottom: '80px' }}
      >
        <Divider>CATEGORIES</Divider>
        {categories?.map((category) => (
          <Link
            href={`/categories/${category.slug}`}
            passHref
            key={category._id}
          >
            <a>
              <Button style={{ margin: '2px', margin: '5px' }}>
                {category.name}
              </Button>
            </a>
          </Link>
        ))}
      </Col>
    </Row>
  );
};

export default LandingCategories;
