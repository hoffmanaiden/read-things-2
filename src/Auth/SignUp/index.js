import { Auth } from 'aws-amplify'
import '../Auth.css'
import { Link } from "react-router-dom";
import wave2 from '../../images/wave2.svg'
import wave3 from '../../images/wave3.svg'
import { useWindowSize } from 'react-use';
import { useState } from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { PublicUser } from '../../models';


const initialState = {
  username: '',
  password: '',
  email: '',
  authCode: '',
  formType: 'signUp',
  error: null,
}

export default function SignUp(props) {
  const { width, height } = useWindowSize();
  const [state, setState] = useState(initialState);

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
      setState(() => ({ ...state, formType: 'confirmSignUp' }))
    } catch (err) {
      console.log(err)
      setState({...state, error: err})
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
            props.setState({ ...props.state, user: fetchUser, signedIn: true})
            setState(initialState)
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


  function onChange(e) {
    e.persist()
    setState(() => ({ ...state, [e.target.name]: e.target.value }))
  }

  return (
    <div className="Auth">
      <div className="form-container">
        {state.formType === 'signUp' && (
          <>
            <h1>Create Account</h1>
            {state.error ? <div style={{color: 'red'}}>{state.error.name}</div> : null}
            <input name='username' onChange={onChange} placeholder="username" />
            <input name="password" type="password" onChange={onChange} placeholder="password" />
            <input name="confirmPassword" type="password" onChange={onChange} placeholder="confirm password" />
            <input name="email" onChange={onChange} placeholder='email' />
            <button onClick={signUserUp}>Sign up</button>
            <div> - or - </div>
            <Link to='/login'><button>Log in</button></Link>
          </>
        )}
        {state.formType === 'confirmSignUp' && (
          <>
            <h1>Validate Email</h1>
            <input name='authCode' onChange={onChange} placeholder="verification code" />
            <button onClick={confirmSignUp}>validate email</button>
          </>
        )}
      </div>
      <img className="waves" src={width > 750 ? wave2 : wave3} />
    </div>
  )
}