import { Button, Col, Input, Modal, Row } from 'antd';

const { TextArea } = Input;

const EditCommentModal = ({
  openModal,
  content,
  handleCloseModal,
  setContent,
  handleEditComment,
  loading,
  auth,
}) => {
  return (
    <Row>
      <Col span={24}>
        <Modal
          visible={openModal}
          title="Update Comment"
          onOk={handleCloseModal}
          onCancel={handleCloseModal}
          footer={null}
        >
          <TextArea
            placeholder="Edit Your Comment"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={200}
          />
          <Button
            loading={loading}
            type="primary"
            onClick={handleEditComment}
            style={{ marginTop: '5px' }}
            disabled={!auth?.token && auth?.user === null && !content.length}
          >
            Post
          </Button>
        </Modal>
      </Col>
    </Row>
  );
};

export default EditCommentModal;
