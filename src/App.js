import './App.css';
import { Auth, Hub } from 'aws-amplify'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { useState, useEffect, createContext, useMemo, useReducer } from 'react'
import LogIn from './Auth/LogIn';
import SignUp from './Auth/SignUp';
import Welcome from './Auth/Welcome';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Home/Profile'
import Cookies from 'js-cookie';
import {reducer} from './State'

export const UserContext = createContext(null)

const initialState = {
  user: null,
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  signedIn: false,
  error: null
}


function App() {

  // Reducer State, trying to replace state
  const [reducerState, dispatch] = useReducer(reducer, initialState)


  const [state, setState] = useState({
    user: null,
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    signedIn: false,
    error: null
  })

 const providerValue = useMemo(() => ({state, setState}), [state, setState])
  

  let navigate = useNavigate();


  async function SignIn(){
    let {username, password} = state
    try{
      const signInUser = await Auth.signIn(username, password)
      if(signInUser){
        setState({...state, user: signInUser, signedIn: true})
        navigate('/home')
      }
    }catch(err){console.log(err)}
  }


  return (
    <div className="App">
      <UserContext.Provider value={providerValue}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LogIn SignIn={SignIn} />} />
          <Route path="/signup" element={<SignUp state={state} setState={setState} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/u/:username" element={<Profile />} />
          <Route path="*" element={<Welcome />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;