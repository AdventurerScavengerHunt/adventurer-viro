import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_HUNTS = 'GET_HUNTS';

/**
 * INITIAL STATE
 */
const hunts = [];

/**
 * ACTION CREATORS
 */
const getHunts = gotHunts => ({ type: GET_HUNTS, gotHunts });

/**
 * THUNK CREATORS
 */
export const fetchAllHunts = () => async dispatch => {
  try {
    const res = await axios.get(
      'https://adventurerapp.herokuapp.com/api/hunts'
    ); /* will need to update path once database is deployed! */
    dispatch(getHunts(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = hunts, action) {
  switch (action.type) {
    case GET_HUNTS:
      return action.gotHunts;
    default:
      return state;
  }
}
