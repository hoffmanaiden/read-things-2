// import { signOut } from "../Auth/Auth"
import {useNavigate} from 'react-router-dom'
import { useEffect, useState, useContext } from "react"
import { Auth, Hub } from 'aws-amplify'

import {setAuthListener, useCheckUser, signUp, confirmSignUp, signIn, signOut} from '../Auth/Auth'

import { UserContext } from '../App'

export default function Home(){
  const navigate = useNavigate()

  const {state, dispatch} = useContext(UserContext)

  

  // async function getUser(){
  //   try{
  //     // get user from localStorage
  //     const fetchUser = await Auth.currentAuthenticatedUser()
  //     // set the 'App' state
  //     setState({...state, user: fetchUser, signedIn: true})
  //   }catch(err){console.log(err)}
  // }

  // useEffect(() => {
  //   getUser()
  // }, [])


  // console.log(state)
  return(
    <div>
      <h1>Home</h1>
      {state.user ? <p>Hello {state.user.username}</p> : <p>Hello</p>}
    </div>
  )
} 