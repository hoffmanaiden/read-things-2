
import {useContext, useState} from 'react'
import { Auth, Hub } from 'aws-amplify'
import { UserContext } from '../App';

export async function signOut(state, setState) {
  try {
      let response = await Auth.signOut();
      setState({...state, user: null, signedIn: false})
      return response
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

// export async function setAuthListener() {
//   Hub.listen('auth', (data) => {
//     switch (data.payload.event) {
//       case 'signOut':
//         console.log('data from Hub.listen: ', data);
//         break;
//       default:
//         break;
//     }
//   });
// }