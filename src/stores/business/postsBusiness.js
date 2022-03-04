import callRestApi from '../../libs/api';

const fetchPosts = () => async (dispatch, getState) => {
  const state = getState();
  const { appStore } = state;
  const { restApiBaseUrl } = appStore;
  let data = [];

  try {
    const response = await callRestApi('get', restApiBaseUrl, 'posts');
    data = response;
  } catch (err) {
    console.log(err);
    return [];
  }
  return data;
};

const fetchComments = (postId) => async (dispatch, getState) => {
  const state = getState();
  const { appStore } = state;
  const { restApiBaseUrl } = appStore;
  let data = [];

  try {
    const response = await callRestApi('get', restApiBaseUrl, `posts/${postId}/comments`);

    data = response;
  } catch (err) {
    console.log(err);

    return [];
  }

  return data;
};

export { fetchPosts, fetchComments };
