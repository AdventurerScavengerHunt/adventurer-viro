import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_HUNT_LOCATIONS = 'GET_HUNT_LOCATIONS'
const UPDATE_VISITED_LOCATION = 'UPDATE_VISITED_LOCATION'
const DROP_HUNT_LOCATIONS = 'DROP_HUNT_LOCATIONS'

/**
 * INITIAL STATE
 */
const huntLocations = []

/**
 * ACTION CREATORS
 */
const getHuntLocations = (locations) => ({type: GET_HUNT_LOCATIONS, locations})
const updateVisitedLocation = (huntLocationId) => ({type: UPDATE_VISITED_LOCATION, huntLocationId})
const dropHuntLocations = () => ({type: DROP_HUNT_LOCATIONS})

/**
 * THUNK CREATORS
 */
// place all of the hunt's locations from server on state
export const fetchAllHuntLocations = (userId) => async dispatch => {
  try {
    const res = await axios.get(`/api/huntLocations/${userId}`) /* will need to update path once database is deployed! */
    dispatch(getHuntLocations(res.data))
  } catch (err) {
    console.error(err)
  }
}

// create all of the hunt's locations on server and then place them on state
export const fetchCreatedHuntLocations = (userId, huntId) => async dispatch => {
  try {
    const res = await axios.post(`/api/huntLocations/${userId}/${huntId}`) /* will need to update path once database is deployed! */
    dispatch(getHuntLocations(res.data))
  } catch (err) {
    console.error(err)
  }
}

// update a hunt's location's visited status to true on server and then update state
export const fetchVisitedHuntLocation = (userId, locationId) => async dispatch => {
  try {
    await axios.put(`/api/huntLocations/${userId}/${locationId}/`) /* will need to update path once database is deployed! */
    dispatch(updateVisitedLocation(locationId))
  } catch (err) {
    console.error(err)
  }
}

// drop hunt locations from the user and then update state
export const fetchDroppingHuntLocations = (userId, locationId) => async dispatch => {
  try {
    await axios.delete(`/api/huntLocations/${userId}/${locationId}`) /* will need to update path once database is deployed! */
    dispatch(dropHuntLocations())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = huntLocations, action) {
  switch (action.type) {
    case GET_HUNT_LOCATIONS:
      return action.locations
    case UPDATE_VISITED_LOCATION: {
      let currentLocations = [...state].slice(0)
      let visitedLocationId = action.huntLocationId
      currentLocations = currentLocations.filter(location => {
        if (location.huntLocation.locationId === visitedLocationId) {
          location.huntLocation.visited = true
          return location
        }
      })
      return currentLocations
    }
    case DROP_HUNT_LOCATIONS:
      return []
    default:
      return state
  }
}
