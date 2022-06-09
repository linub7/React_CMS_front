import AuthorLayout from 'components/author/layout/AuthorLayout';
import NewPostComponent from 'components/posts/NewPost';

const NewPost = () => {
  return (
    <AuthorLayout>
      <NewPostComponent author={true} />
    </AuthorLayout>
  );
};

export default NewPost;
