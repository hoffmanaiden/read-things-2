
import { Auth } from 'aws-amplify'


export async function checkUser(state, dispatch) {
  try {
    // get user from localStorage
    const fetchUser = await Auth.currentAuthenticatedUser()
    // set the 'App' state
    dispatch({ type: 'setUser', value: fetchUser })
  } catch (err) {
    console.log(err)
  }
}

export async function signOut(state, dispatch) {
  try {
    let response = await Auth.signOut()
    dispatch({ type: 'logout' })
  } catch (err) { console.log(err) }
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