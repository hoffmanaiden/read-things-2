import { Auth } from 'aws-amplify'
import '../Auth.css'
import { Link } from "react-router-dom";
import wave2 from '../../images/wave2.svg'
import wave3 from '../../images/wave3.svg'
import { useWindowSize } from 'react-use';
import { useState, useContext } from 'react'
import {UserContext} from '../../App'
import { DataStore } from '@aws-amplify/datastore';
import { PublicUser } from '../../models';
import { useNavigate } from 'react-router-dom';



export default function SignUp() {
  const { width, height } = useWindowSize();
  const {state, dispatch} = useContext(UserContext)
  let navigate = useNavigate();



  async function signUserUp() {
    try {
      const { username, email, password } = state
      // Cognito Signup
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        }
      })
      // Data model PublicUser creation
      await DataStore.save(
        new PublicUser({
          "username": username,
          "Posts": [],
          "userImage": null
        })
      )
      dispatch({type: 'signUp'})
    } catch (err) {
      console.log(err)
      dispatch({type: 'error', value: err})
    }
  }



  async function confirmSignUp() {
    const { username, password,  authCode } = state
    try {
      let confirm = await Auth.confirmSignUp(username, authCode)
      if (confirm === "SUCCESS") {
        try{
          const fetchUser = await Auth.signIn(username, password)
          if(fetchUser){
            // props.setState({ ...props.state, user: fetchUser, signedIn: true})
            dispatch({type: 'confirmSignUp', value: fetchUser})
            // setState(initialState)
            navigate('/home')
          }
        }catch(err){
          console.log('Error fetching user after successful signup.', <br/>, err)
        }
      }else{console.log('Confirmation may not be a success', <br/>, confirm)}
      // updateFormState(() => ({ ...formState, formType: 'signIn' }))
    } catch (err) {
      console.log('Error while confirming sign up',<br/>, err)
    }
  }



  return (
    <div className="Auth">
      <div className="form-container">
        {state.signUpFormType === 'signUp' && (
          <>
            <h1>Create Account</h1>
            {state.error ? <div style={{color: 'red'}}>{state.error.name}</div> : null}
            <input name='username' onChange={e => dispatch({type: 'field', field: 'username', value: e.currentTarget.value})} placeholder="username" />
            <input name="password" onChange={e => dispatch({type: 'field', field: 'password', value: e.currentTarget.value})} placeholder="password" type="password" />
            <input name="confirmPassword" onChange={e => dispatch({type: 'field', field: 'confirmPassword', value: e.currentTarget.value})} placeholder="confirm password" type="password" />
            <input name="email" onChange={e => dispatch({type: 'field', field: 'email', value: e.currentTarget.value})} placeholder='email' />
            <button onClick={signUserUp}>Sign up</button>
            <div> - or - </div>
            <Link to='/login'><button>Log in</button></Link>
          </>
        )}
        {state.signUpFormType === 'confirmSignUp' && (
          <>
            <h1>Validate Email</h1>
            <input name='authCode' onChange={e => dispatch({type: 'field', field: 'authCode', value: e.currentTarget.value})} placeholder="verification code" />
            <button onClick={confirmSignUp}>validate email</button>
          </>
        )}
      </div>
      {/* <img className="waves" src={width > 750 ? wave2 : wave3} /> */}
    </div>
  )
}