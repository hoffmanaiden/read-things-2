
export function reducer(state, action){

  switch(action.type){
    case 'login':
      return {
        ...state,
        isLoading: true
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
        user: action.value,
        signedIn: true
      }
    case 'signup':
      return{...state}
    case 'logout':
      return{...state}
    case 'error':
      return {
        ...state,
        error: action.value
      }
    case 'field':
      return {
        ...state,
        [action.field]: action.value
      }
    default:
      break;
  }
  return state;
}