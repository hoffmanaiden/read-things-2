
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from "react"
import { Auth, Hub } from 'aws-amplify'
import { checkUser } from '../Auth/Auth'
import { UserContext } from '../App'
import PostTemplate from '../Components/PostTemplate'
import MakePost from '../Components/MakePost'
import { DataStore } from '@aws-amplify/datastore'
import { Post, PublicUser } from '../models'

export default function Home() {
  const navigate = useNavigate()

  const { state, dispatch } = useContext(UserContext)

  async function getPosts() {
    const models = await DataStore.query(Post);
    console.log(models);
    dispatch({type: 'setPosts', value: models})
  }

  useEffect(() => {
    checkUser(state, dispatch)
  }, [])

  useEffect(() => {
    getPosts()
  }, [])



  return (
    <div className="feedContainer">
      {/* <h1>Home</h1>
      {state.user ? <p>Hello {state.user.username}</p> : <p>Hello</p>} */}
      {state.user ? <MakePost currentUser={state.user.username}/> : <div>Loading...</div>}
      {state.posts ? state.posts.map((post) => (
        <PostTemplate post={post} key={post.id}/>
      )) : null}
    </div>
  )
} 