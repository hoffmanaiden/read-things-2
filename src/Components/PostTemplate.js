import './Components.css'
import { Storage } from "@aws-amplify/storage"
import { useEffect, useState } from 'react'

export default function PostTemplate(props) {
  const [state, setState] = useState()
  let { post } = props
  // console.log(post)

  useEffect(() => {
    getImage(post.img)
  }, [])

  async function getImage(img) {
    let image = await Storage.get(img, {
      level: 'public'
    })
    setState(image)
  }


  if (post) {
    return (
      <div className="PostTemplate">
        {post ? <h3>{post.text}</h3> : null}
        {post ? <img src={state} /> : null}
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