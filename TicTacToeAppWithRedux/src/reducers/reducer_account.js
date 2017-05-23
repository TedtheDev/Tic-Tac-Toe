import { CREATING_PLAYER, CREATED_PLAYER_SUCCESS, CREATED_PLAYER_ERROR } from '../actions/index'

const INITIAL_STATE = { isCreating: false, created: false, player: {}, errorMessage: '' };

export default function(state = INITIAL_STATE, action) {
  let newState;
  switch(action.type) {
    case CREATING_PLAYER:
      newState = {
        isCreating: action.payload.isCreating,
        created: action.payload.created,
        player: action.payload.player,
        errorMessage: action.payload.errorMessage
      };
      return { ...state, ...newState};
    case CREATED_PLAYER_ERROR:
      newState = {
        isCreating: action.payload.isCreating,
        created: action.payload.created,
        player: action.payload.player,
        errorMessage: action.payload.errorMessage
      };
      return { ...state, ...newState };
    case CREATED_PLAYER_SUCCESS:
      newState = {
        isCreating: action.payload.isCreating,
        created: action.payload.created,
        player: action.payload.player,
        errorMessage: action.payload.errorMessage
      }
      return { ...state, ...newState }
    default:
      return state
  }
}
