import '../Auth.css'
import { Link } from "react-router-dom";
import wave2 from '../../images/wave2.svg'
import wave3 from '../../images/wave3.svg'
import {useWindowSize} from 'react-use';
import {useContext} from 'react'
import {UserContext} from '../../App'

export default function Welcome() {
  const {width, height} = useWindowSize();
  return (
    <div className="Auth">
      <div className="form-container">
        <h1>Welcome to Read Things</h1>
        <Link to="login"><button>Log in</button></Link>
        <Link to="signup"><button>Sign up</button></Link>
        <Link to="home"><button>See Posts</button></Link>
      </div>
      {/* <img className="waves" src={width > 750 ? wave2 : wave3} /> */}
    </div>
  )
}