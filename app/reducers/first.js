function first (state = { count: 1 }, action) {
  switch (action.type) {
    case 'CHANGE_STORE':
      return {
        count: 1,
      };
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
}

export default first;
