import uuid from 'uuid';
import { SHOW_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SHOW_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
