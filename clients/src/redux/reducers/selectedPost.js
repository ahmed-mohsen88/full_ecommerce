const selectedPost = (selectedPost = [], action) => {
  switch (action.type) {
    case "SELECTEDPOST":
      return action.payload;
    case "RESET":
      return action.payload;
    default:
      return selectedPost;
  }
};

export const selectedPosts = (state) => state.selectedPost;

export default selectedPost;
