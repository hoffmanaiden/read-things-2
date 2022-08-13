import './Components.css'
import { Storage } from "@aws-amplify/storage"
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'
import { DataStore } from '@aws-amplify/datastore'
import { Like, PublicUser } from '../models'
import default_profile_pic from '../images/default_profile.webp'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

export default function PostTemplate(props) {

  // const { currentUser } = props
  const [image, setImage] = useState()
  const [user, setUser] = useState({
    username: '',
    userImage: null
  })
  let { post } = props
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    getImage(post.img)
    getUser(post.publicuserID)
  }, [])

  async function getImage(img) {
    let awaitImage = await Storage.get(img, {
      level: 'public'
    })
    setImage(awaitImage)
  }

  // gets the currently signed in public user
  async function getPublicUserID() {
    const publicUser = await DataStore.query(PublicUser, u => u.username("eq", state.currentUser.username));
    return publicUser[0].id
  }

  async function likeOrUnlikePost() {
    console.log("post liked", post)

    // 1. Check if a Like exists, DataStore.query(Like, state.currentPublicUser.id && post.id)
    // if true? Update the Like to have opposite value of current "True"
    // if false? create a new Like

    // get public user ID
    let publicUserId = await getPublicUserID()

    await DataStore.save(
      new Like({
        "True": true,
        "PublicUser": publicUserId,
        "Post": post.id
      })
    )
  }

  async function getUser(fetchId) {
    const awaitUser = await DataStore.query(PublicUser, u => u.id("eq", fetchId))
    // const awaitUser = await DataStore.query(PublicUser)
    // console.log(awaitUser)
    setUser({
      ...user,
      username: awaitUser[0].username,
      userImage: awaitUser[0].userImage
    })
  }


  let fileExtension = post.img.substr(post.img.lastIndexOf('.') + 1)

  let extension = 'img'
  switch (fileExtension) {
    case "mp4":
      extension = 'mp4';
      break;
    default:
      extension = 'img';
      break;
  }

  if (post) {
    return (
      <div className="PostTemplate">
        <div className="who-top-line">
          <img className="postProfileImg" src={user.userImage ? user.userImage : default_profile_pic} />
          <div className="postUsername">@{user.username}</div>
        </div>

        {post ? <div className="postText">{post.text}</div> : null}
        {post && image && extension === 'mp4' ?
          <video autoPlay muted loop controls className="postVisual">
            <source src={image} type="video/mp4" />
          </video> : post && image ?
            <img className="postVisual" src={image} /> : null}
        <div className="like-bottom-line">
          <AiOutlineHeart onClick={likeOrUnlikePost} />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        No posts yet...
      </div>
    )
  }

}