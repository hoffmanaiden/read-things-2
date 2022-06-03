// import { signOut } from "../Auth/Auth"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from "react"
import { Auth, Hub } from 'aws-amplify'
import {checkUser} from '../Auth/Auth'


import { UserContext } from '../App'

export default function Home() {
  const navigate = useNavigate()

  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    checkUser(state, dispatch)
  }, [])

  return (
    <div>
      <h1>Home</h1>
      {state.user ? <p>Hello {state.user.username}</p> : <p>Hello</p>}
    </div>
  )
} 