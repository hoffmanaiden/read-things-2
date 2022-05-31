import navWave from '../images/wave-navbar.svg'
import thickNavWave from '../images/thick-wave-menui.svg'
import { useWindowSize } from 'react-use';
import { Link } from 'react-router-dom'
// import { signOut } from '../Auth/Auth'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { Auth, Hub } from 'aws-amplify'

export default function Navbar(props) {

  const { state, setState } = props
  const { width, height } = useWindowSize();
  const navigate = useNavigate()

  async function signOut(state, setState) {
    try {
        let response = await Auth.signOut();
        setState({...state, user: null, signedIn: false})
        navigate('/')
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  return (
    <div className='navbar'>
      <div className='navbarLinks'>
        <div className='navbarLeft'>
          <Link to='/'><div className='linkOption'>read things</div></Link>
        </div>
        <div className='navbarRight'>
          {state.user ? <div className='linkOption'><Link to={`/u/${state.user.username}`}>profile</Link></div> : null}
          {state.user ? <div className='linkOption' onClick={() => {
            signOut(state, setState)
          }}>sign out</div> : null}
        </div>
      </div>



      <img src={width > 750 ? navWave : thickNavWave} />
    </div>
  )
}