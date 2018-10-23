import * as types from '~/shared/actionTypes';

export function saveOffLine(args, callback) {
  return {
    type: types.SAVE_OFFLINE,
    meta: {
      offline: {
        effect: { url: 'https://kovtun-88fbe.firebaseio.com' },
        commit: { type: types.SAVE_PURCHASE, args, callback },
        rollback: { type: types.SAVE_PURCHASE, args, callback },
      },
    },
  };
}