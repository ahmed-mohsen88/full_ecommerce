const comments = (comment = [], action) => {
  switch (action.type) {
    case "ADDCOMMENT":
      return action.payload;
    case "RESETCOMMENT":
      return action.payload;
    default:
      return comment;
  }
};
export default comments;
