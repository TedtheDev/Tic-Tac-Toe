import { CREATING_PLAYER } from '../actions/index'

const INITIAL_STATE = { isCreating: false, created: false };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CREATING_PLAYER:
      const newState = { isCreating: true, created: false}
      return { ... state, newState}
    default:
      return state
  }
}
