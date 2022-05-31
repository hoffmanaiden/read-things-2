import '../Auth.css'
import { Link } from "react-router-dom";
import wave2 from '../../images/wave2.svg'
import wave3 from '../../images/wave3.svg'
import {useWindowSize} from 'react-use';
import { useState, useEffect } from 'react'
// import { setAuthListener, checkUser, SignIn } from '../Auth';
import { useNavigate } from 'react-router-dom'
import { Auth, Hub } from 'aws-amplify'

export default function LogIn(props) {
  // const initialFormState = {
  //   username: '', password: ''
  // }

  const { state, setState, SignIn } = props
  const {width, height} = useWindowSize();
  const navigate = useNavigate();

  // async function SignIn(state, setState) {
  //   const { username, password } = state
  //   try{
  //     const user = await Auth.signIn(username, password)
  //     if(user){
  //       setState({...state, user, signedIn: true, username: '', password: ''})
  //       navigate('/home')
  //     }
  //   } catch(err){console.log(err)}

  // }

  function onChange(e) {
    e.persist()
    setState(() => ({ ...state, [e.target.name]: e.target.value }))
  }

  return (
    <div className="Auth">
      <div className="form-container">
        <h1>Welcome Back</h1>
        <input name="username" onChange={onChange} placeholder="username" />
        <input name="password" type="password" onChange={onChange} placeholder="password" />
        <button onClick={() => {
          SignIn()
        }}>Log in</button>
        <div> - or - </div>
        <Link to="/signup"><button>Sign up</button></Link>
      </div>
      <img className="waves" src={width > 750 ? wave2 : wave3} />
    </div>
  )
}