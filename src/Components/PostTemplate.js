import './Components.css'
import { Storage } from "@aws-amplify/storage"
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'
import { DataStore } from '@aws-amplify/datastore'
import { PublicUser } from '../models'
import default_profile_pic from '../images/default_profile.webp'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

export default function PostTemplate(props) {
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
  switch (fileExtension){
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
        {post && image && extension === 'mp4'? 
          <video controls className="postVisual">
            <source src={image} type="video/mp4" />
          </video> : post && image ?
          <img className="postVisual" src={image} /> : null}
        <div className="like-bottom-line">
          <AiOutlineHeart/>
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