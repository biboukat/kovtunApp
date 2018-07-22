function first (state = { bla: 'defaultState' }, action) {
  switch (action.type) {
    case 'CHANGE_STORE':
      return {
        bla: 'blahChanged',
      };
    default:
      return state;
  }
}

export default first;
