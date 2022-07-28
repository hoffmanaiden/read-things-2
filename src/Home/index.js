
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext, useLayoutEffect } from "react"
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


  async function loadPosts() {
    try {
      const models = await DataStore.query(Post);
      dispatch({ type: 'setPosts', value: models })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkUser(state, dispatch)
  }, [])


  useEffect(() => {
    loadPosts()
    const subscription = DataStore.observe(Post).subscribe(() => {
      loadPosts()
    })
    return () => subscription.unsubscribe()
  }, [])



  return (
    <div className="feedContainer">
      {/* <h1>Home</h1>
      {state.user ? <p>Hello {state.user.username}</p> : <p>Hello</p>} */}
      {state.user ? <MakePost currentUser={state.user.username} /> : null}
      {state.posts ? state.posts.map((post) => (
        <PostTemplate post={post} key={post.id} />
      )) : <p>No Posts to show</p>}
    </div>
  )
} 