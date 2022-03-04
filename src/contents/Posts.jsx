import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts, fetchComments } from '../stores/business/postsBusiness';
import Table from '../components/Table';
import './Posts.scss';

const Posts = () => {
  const dispatch = useDispatch();
  const [postsData, setPostsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  useEffect(() => {
    const init = async () => {
      const data = await dispatch(fetchPosts());

      setPostsData(data);
    };

    init();
  }, [dispatch]);

  const onRowClick = async (index) => {
    setSelectedRowIndex(index);

    const postId = postsData[index].id;

    const data = await dispatch(fetchComments(postId));

    setCommentsData(data);
  };

  return (
    <div className="container">
      <div className="post-container">
        <Table
          columns={[
            { label: 'User ID', key: 'userId' },
            { label: 'Post ID', key: 'id' },
            { label: 'Title', key: 'title' },
          ]}
          data={postsData}
          selectedIndex={selectedRowIndex}
          onRowClick={onRowClick}
        />
      </div>
      <div className="comment-container">
        <Table
          columns={[
            { label: 'Comment ID', key: 'id' },
            { label: 'User ID', key: 'userId' },
            { label: 'Email', key: 'email' },
            { label: 'Comment', key: 'body' },
          ]}
          data={commentsData}
        />
      </div>
    </div>
  );
};

Posts.propTypes = {};

Posts.defaultProps = {};

export default Posts;
