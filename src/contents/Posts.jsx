import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts, fetchComments } from '../stores/business/postsBusiness';
import Table from '../components/Table';
import './Posts.scss';
import ReusableTable from '../components/ReusableTable/ReusableTable';

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
        <ReusableTable
          columns={[
            {
              Header: 'ID',
              accessor: 'id',
              headerStyle: { width: 80, minWidth: 80, maxWidth: 80 },
            },
            {
              Header: 'User Id',
              accessor: 'userId',
              headerStyle: { width: 80, minWidth: 80, maxWidth: 80 },
            },
            { Header: 'Title', accessor: 'title' },
          ]}
          data={postsData}
          onRowClick={onRowClick}
          selectedIndex={selectedRowIndex}
        />
      </div>
      <div className="comment-container">
        <Table
          columns={[
            { label: 'Comment ID', key: 'id' },
            // { label: 'User ID', key: 'userId' },
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
