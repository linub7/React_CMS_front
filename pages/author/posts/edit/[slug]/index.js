import AuthorLayout from 'components/author/layout/AuthorLayout';
import EditPostComponent from 'components/posts/EditPostComponent';

const EditAuthorPost = () => {
  return (
    <AuthorLayout>
      <EditPostComponent author={true} />
    </AuthorLayout>
  );
};

export default EditAuthorPost;
