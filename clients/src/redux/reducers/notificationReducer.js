const notificationReducer = (notes = [], action) => {
  switch (action.type) {
    case "FETCHNOTES":
      return [...action.payload];
    default:
      return notes;
  }
};

export default notificationReducer;
