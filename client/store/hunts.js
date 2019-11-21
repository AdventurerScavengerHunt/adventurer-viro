import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_HUNTS = 'GET_HUNTS'

/**
 * INITIAL STATE
 */
const hunts = []

/**
 * ACTION CREATORS
 */
const getHunts = (hunts) => ({type: GET_HUNTS, hunts})

/**
 * THUNK CREATORS
 */
export const fetchAllHunts = () => async dispatch => {
  try {
    const res = await axios.get('/api/hunts') /* will need to update path once database is deployed! */
    dispatch(getHunts(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = hunts, action) {
  switch (action.type) {
    case GET_HUNTS:
      return action.hunts
    default:
      return state
  }
}
