import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';

const CategoryUpdateModal = ({
  updatingCategory,
  isVisibleModal,
  handleCloseModal,
  handleEditCategory,
  loading,
  editForm,
}) => {
  return (
    <Modal
      title="Update | Slug will be fixed"
      visible={isVisibleModal}
      onCancel={handleCloseModal}
      footer={null}
    >
      <Form
        fields={[
          {
            name: ['name'],
            value: updatingCategory?.name,
          },
        ]}
        onFinish={handleEditCategory}
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
            Edit Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryUpdateModal;
