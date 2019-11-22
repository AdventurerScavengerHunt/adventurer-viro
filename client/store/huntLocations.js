import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_HUNT_LOCATIONS = 'GET_HUNT_LOCATIONS';
const UPDATE_VISITED_LOCATION = 'UPDATE_VISITED_LOCATION';
const DROP_HUNT_LOCATIONS = 'DROP_HUNT_LOCATIONS';

/**
 * INITIAL STATE
 */
const huntLocations = [];

/**
 * ACTION CREATORS
 */
const getHuntLocations = gotHuntLocations => ({
  type: GET_HUNT_LOCATIONS,
  gotHuntLocations,
});
const updateVisitedLocation = locationId => ({
  type: UPDATE_VISITED_LOCATION,
  locationId,
});
const dropHuntLocations = () => ({ type: DROP_HUNT_LOCATIONS });

/**
 * THUNK CREATORS
 */
// place all of the hunt's locations from server on state
export const fetchAllHuntLocations = userId => async dispatch => {
  try {
    const res = await axios.get(
      `https://adventurerapp.herokuapp.com/api/huntLocations/${userId}`
    ); /* will need to update path once database is deployed! */
    dispatch(getHuntLocations(res.data));
  } catch (err) {
    console.error(err);
  }
};

// create all of the hunt's locations on server and then place them on state
export const fetchCreatedHuntLocations = (userId, huntId) => async dispatch => {
  try {
    const res = await axios.post(
      `https://adventurerapp.herokuapp.com/api/huntLocations/${userId}/${huntId}`
    ); /* will need to update path once database is deployed! */
    dispatch(getHuntLocations(res.data));
  } catch (err) {
    console.error(err);
  }
};

// update a hunt's location's visited status to true on server and then update state
export const fetchVisitedHuntLocation = (
  userId,
  locationId
) => async dispatch => {
  try {
    await axios.put(
      `https://adventurerapp.herokuapp.com/api/huntLocations/${userId}/${locationId}/`
    ); /* will need to update path once database is deployed! */
    dispatch(updateVisitedLocation(locationId));
  } catch (err) {
    console.error(err);
  }
};

// drop hunt locations from the user and then update state
export const fetchDroppingHuntLocations = (
  userId,
  locationId
) => async dispatch => {
  try {
    await axios.delete(
      `https://adventurerapp.herokuapp.com/api/huntLocations/${userId}/${locationId}`
    ); /* will need to update path once database is deployed! */
    dispatch(dropHuntLocations());
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = huntLocations, action) {
  switch (action.type) {
    case GET_HUNT_LOCATIONS:
      return action.gotHuntLocations;
    case UPDATE_VISITED_LOCATION: {
      let currentLocations = [...state].slice(0); // Test if we need .slice(0) on this since spreading into new array should create copy
      let visitedLocationId = action.locationId;
      currentLocations = currentLocations.filter(location => {
        if (location.huntLocation.locationId === visitedLocationId) {
          location.huntLocation.visited = true;
          return location;
        }
      });
      return currentLocations;
    }
    case DROP_HUNT_LOCATIONS:
      return [];
    default:
      return state;
  }
}
