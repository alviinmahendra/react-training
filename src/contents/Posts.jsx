import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../stores/business/postsBusiness';
import Table from '../components/Table';
import './Posts.scss';

const Posts = () => {
  const dispatch = useDispatch();
  const [postsData, setPostsData] = useState([]);
  const [commentsData] = useState([]);
  const [selectedRowIndex] = useState(null);

  useEffect(() => {
    const init = async () => {
      const data = await dispatch(fetchPosts());
      setPostsData(data);
    };
    init();
  }, [dispatch]);

  const onRowClick = () => {
    console.log('onRowsClick');
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
