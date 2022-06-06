import './Components.css'
import { useEffect, useState, useContext } from "react"
import { Storage } from '@aws-amplify/storage'
import { UserContext } from '../App'
import { checkUser } from '../Auth/Auth'
import { PublicUser, Post } from '../models'
import { DataStore } from '@aws-amplify/datastore'
import { input } from 'aws-amplify'

export default function MakePost(props) {

  const { currentUser } = props
  const { state, dispatch } = useContext(UserContext)
  const [localState, setLocalState] = useState({
    postText: ''
  })
  const [selectedFile, setSelectedFile] = useState()

  async function getPublicUserID() {
    const publicUser = await DataStore.query(PublicUser, u => u.username("eq", currentUser));
    return publicUser[0].id
  }

  async function submitPost() {
    // get public user ID
    let publicUserId = await getPublicUserID()

    // submit chosen file
    let imageRef = await Storage.put(selectedFile.name, selectedFile, {
      contentType: selectedFile.type
    })

    // submit Post object
    let finalSubmission = await DataStore.save(
      new Post({
        "text": localState.postText,
        "publicuserID": publicUserId,
        "img": imageRef.key
      })
    )
    console.log(finalSubmission)

    setLocalState({
      postText: ''
    })
    setSelectedFile(null)
    input.type.file.value = null
  }

  useEffect(() => {
    checkUser(state, dispatch)
    getPublicUserID()
  }, [])


  function onChange(e) {
    e.persist()
    setLocalState(() => ({ ...localState, [e.target.name]: e.target.value }))
  }
  function handleFile(e){
    setSelectedFile(e.target.files[0])
    // e.target.value = null
    // Reset 'Choose File' after post creation
  }


  return (
    <div className="MakePost">
      <input
        type="text"
        name="postText"
        value={localState.postText}
        onChange={onChange}
        placeholder='Make post?'
      />
      <input
        type="file"
        className="file"
        onChange={handleFile}
      />
      <button onClick={submitPost}>Post</button>
    </div>
  )
}