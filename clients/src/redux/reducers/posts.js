const reducer = (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "create":
      return [...posts, action.payload];
    case "Update":
      return [...posts, action.payload];
    case "FILTER":
      return action.payload;
    default:
      return posts;
  }
};
export default reducer;
