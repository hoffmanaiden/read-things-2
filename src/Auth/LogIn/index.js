import {useContext} from 'react'
import {UserContext} from '../../App'
import '../Auth.css'
import { Link } from "react-router-dom";
import wave2 from '../../images/wave2.svg'
import wave3 from '../../images/wave3.svg'
import {useWindowSize} from 'react-use';
import { Auth, Hub } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'

export default function LogIn() {
  const {state, dispatch} = useContext(UserContext)
  const {width, height} = useWindowSize();
  let navigate = useNavigate();



  const onSubmit = async e => {
    e.preventDefault();
    dispatch({type: 'login' })
    try{
      const user = await Auth.signIn(state.username, state.password);
      dispatch({type: 'success', value: user })
      navigate('/home')
    }catch(err){
      dispatch({type: 'error', value: err })
    }
  }

  

  return (
    <div className="Auth">
      <div className="form-container">
        <h1>Welcome Back</h1>
        <input name="username" onChange={e => dispatch({type: 'field', field: 'username', value: e.currentTarget.value }) } placeholder="username" />
        <input name="password" onChange={e => dispatch({type: 'field', field: 'password', value: e.currentTarget.value })} placeholder="password" type="password" />
        <button onClick={onSubmit}>Log in</button>
        <div> - or - </div>
        <Link to="/signup"><button>Sign up</button></Link>
      </div>
      <img className="waves" src={width > 750 ? wave2 : wave3} />
    </div>
  )
}