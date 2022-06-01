import {useContext} from 'react'
import {UserContext} from '../../App'
import '../Auth.css'
import { Link } from "react-router-dom";
import wave2 from '../../images/wave2.svg'
import wave3 from '../../images/wave3.svg'
import {useWindowSize} from 'react-use';
import { Auth, Hub } from 'aws-amplify'

export default function LogIn(props) {

  const { SignIn } = props
  const {state, setState} = useContext(UserContext)
  const {width, height} = useWindowSize();


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