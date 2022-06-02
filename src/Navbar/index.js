
import {useContext} from 'react'
import navWave from '../images/wave-navbar.svg'
import thickNavWave from '../images/thick-wave-menui.svg'
import { useWindowSize } from 'react-use';
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { Auth, Hub } from 'aws-amplify'
import { UserContext} from '../App'

export default function Navbar() {

  const {state, dispatch} = useContext(UserContext)
  const { width, height } = useWindowSize();
  const navigate = useNavigate()

  // async function signOut(state, setState) {
  //   try {
  //       let response = await Auth.signOut();
  //       setState({...state, user: null, signedIn: false})
  //       navigate('/')
  //   } catch (error) {
  //       console.log('error signing out: ', error);
  //   }
  // }

  return (
    <div className='navbar'>
      <div className='navbarLinks'>
        <div className='navbarLeft'>
          <Link to='/'><div className='linkOption'>read things</div></Link>
        </div>
        <div className='navbarRight'>
          {state.user ? <div className="linkOption">
            <Link to={`/u/${state.user.username}`}>profile</Link>
          </div> : null}
          {/* {state.user ? <div className='linkOption' onClick={dispatch({type: 'logout'})}>
            <Link to='/'>sign out</Link>
          </div> : null} */}
          {/* {state.user ? <div className='linkOption'><Link to={`/u/${state.user.username}`}>profile</Link></div> : null}
          {state.user ? <div className='linkOption' onClick={() => {
            signOut(state, setState)
          }}>sign out</div> : null} */}
        </div>
      </div>



      <img src={width > 750 ? navWave : thickNavWave} />
    </div>
  )
}