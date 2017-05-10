export default function createHalReducer(reducer) {
  const initialState = {
    isEnabled: false,
  }

  return function(state = initialState, action) {
    return reducer(state, action)
  }
}
