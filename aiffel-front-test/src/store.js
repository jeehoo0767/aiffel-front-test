const reducer = (state, action) => {
  if (state === undefined) {
    return { number: 1 };
  } else if (action.type === 'PAGING') {
    return { ...state, number: action.number };
  }
};

export default reducer;
