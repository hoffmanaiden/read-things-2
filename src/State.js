
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
        signedIn: true,
        password: '',
        username: ''
      }
    case 'signUp':
      return {
        ...state,
        signUpFormType: 'confirmSignUp'
      }
    case 'confirmSignUp':
      return{
        ...state,
        user: action.value,
        signUpFormType: 'signUp',
        authCode: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        error: null,
      }
    case 'setUser':
      return {
        ...state,
        user: action.value,
        signedIn: true
      }
    case 'logout':
      return{
        ...state,
        user: null,
        signedIn: false
      }
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