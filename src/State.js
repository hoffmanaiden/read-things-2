import { Auth, Hub } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { DataStore } from '@aws-amplify/datastore';

export function reducer(state, action){
  switch(action.type){
    case 'login':
      return {
        ...state
      }
    case 'signup':
      return{...state}
    case 'logout':
      return{...state}
    case 'error':
      return {...state}
    case 'field':
      return {...state}
    default:
      break;
  }
  return state;
}