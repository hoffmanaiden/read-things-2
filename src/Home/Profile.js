import { useEffect, useState, useContext } from "react"
import { UserContext} from '../App'

export default function Profile(){

  const {state, setState} = useContext(UserContext)

  return(
    <div>
      <h1>Your profile page!</h1>
      <p>{state.user.username}</p>
    </div>
  )
}