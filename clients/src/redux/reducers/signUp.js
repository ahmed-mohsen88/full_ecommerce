const user = (users = {}, action) => {
  switch (action.type) {
    case "signIn":
      return action.payload;
    case "logout":
      return {};
    default:
      return users;
  }
};
export default user;
