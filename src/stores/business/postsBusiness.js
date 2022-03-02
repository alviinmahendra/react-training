import callRestApi from '../../libs/api';

const fetchPosts = () => async (dispatch, getState) => {
  const state = getState();
  const { appStore } = state;
  const { restApiBaseUrl } = appStore;
  console.log(getState);
  let data = [];

  try {
    const response = callRestApi('get', restApiBaseUrl, 'posts');
    data = response;
  } catch (err) {
    console.log(err);
    return [];
  }
  return data;
};

const fetchComments = () => {};

export { fetchPosts, fetchComments };
