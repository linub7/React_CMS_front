import { useEffect, useState, useContext } from 'react';
import { Button, Col, Form, Input, List, Modal, Row, Tooltip } from 'antd';
import AdminLayout from 'components/admin/layout/AdminLayout';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useWindowWidth } from '@react-hook/window-size';
import CategoryUpdateModal from 'components/shared/CategoryUpdateModal';
import { toCapitalize } from 'utils';
import { CategoryContext } from 'context/category';

const Categories = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [updatingCategory, setUpdatingCategory] = useState({});

  const { categories, setCategories } = useContext(CategoryContext);

  const handleCloseModal = () => {
    setIsVisibleModal(false);
    setUpdatingCategory({});
  };

  const onlyWidth = useWindowWidth();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setCategories(data?.categories);
      // JSON.stringify(
      //   localStorage.setItem('categories', JSON.stringify(data?.categories))
      // );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategory = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/add-category', values);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success('Category added successfully');
        form.resetFields();
        setCategories([data?.category, ...categories]);
        // localStorage.setItem(
        //   'categories',
        //   JSON.stringify([data?.category, ...categories])
        // );
      }
      setLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.error?.toString() ===
          `E11000 duplicate key error collection: ReactCms.categories index: slug_1 dup key: { slug: "${values.name.toLowerCase()}" }`
          ? `Category: ${values.name} already exists`
          : error.response?.data?.error || 'Something went wrong'
      );
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const { data } = await axios.delete(`/categories/${categoryId}`);
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success('Category deleted successfully');
          setCategories(
            categories.filter((category) => category._id !== categoryId)
          );
          // localStorage.setItem(
          //   'categories',
          //   JSON.stringify(
          //     categories.filter((category) => category._id !== categoryId)
          //   )
          // );
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    }
  };

  const handleEditCategory = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/categories/${updatingCategory._id}`,
        values
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success('Category updated successfully');
        const index = categories.findIndex(
          (category) => category._id === updatingCategory._id
        );
        const newCategories = [...categories];
        newCategories[index] = data?.category;
        setCategories(newCategories);
        setIsVisibleModal(false);
        setUpdatingCategory({});
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const handleOpenModal = (category) => {
    setUpdatingCategory(category);
    setIsVisibleModal(true);
  };

  return (
    <AdminLayout>
      <Row>
        {/* first column */}
        <Col xs={22} sm={22} lg={10} offset={1}>
          <h1>Categories</h1>
          <p>Add new category</p>
          <Form
            className="login-form"
            form={form}
            initialValues={{
              remember: false,
            }}
            onFinish={handleAddCategory}
          >
            {/* Category */}
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Category!',
                },
              ]}
            >
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Give it a name"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Add Category
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/* second column */}
        <Col xs={22} sm={22} lg={10} offset={1}>
          <List
            itemLayout="horizontal"
            dataSource={categories}
            renderItem={(item) => (
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
                      onClick={() => handleOpenModal(item)}
                    />
                  </Tooltip>,
                  <Tooltip
                    placement={onlyWidth < 992 ? 'top' : 'right'}
                    key={item._id + 'delete'}
                    title="Delete"
                    color={'#e74c3c'}
                  >
                    <DeleteOutlined
                      style={{ color: '#e74c3c' }}
                      onClick={() => handleDeleteCategory(item._id)}
                    />
                  </Tooltip>,
                ]}
              >
                <List.Item.Meta title={toCapitalize(item?.name)} />
              </List.Item>
            )}
          ></List>
          <div className="line"></div>
        </Col>
        {/* Modal */}
        <CategoryUpdateModal
          form={form}
          handleCloseModal={handleCloseModal}
          handleEditCategory={handleEditCategory}
          isVisibleModal={isVisibleModal}
          loading={loading}
          updatingCategory={updatingCategory}
        />
      </Row>
    </AdminLayout>
  );
};

export default Categories;
