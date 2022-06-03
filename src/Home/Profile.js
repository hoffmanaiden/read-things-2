import { useEffect, useState, useContext } from "react"
import { UserContext} from '../App'
import { Auth, Hub } from 'aws-amplify'
import {checkUser} from '../Auth/Auth'

export default function Profile(){

  const {state, dispatch} = useContext(UserContext)


  useEffect(() => {
    checkUser(state, dispatch)
  }, [])

  return(
    <div>
      <h1>Your profile page!</h1>
      {state.user ? <p>{state.user.username}</p> : null }
    </div>
  )
}