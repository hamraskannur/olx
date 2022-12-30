import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { authContext, FirebaseContext } from '../../store/Context';
import {useHistory} from "react-router-dom"

const Create = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(authContext)
  const history=useHistory()
  const [name, setName] = useState();
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('');
  const [image, setimage] = useState('');
  const date = new Date()

  const handleSubmit = () =>{

    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        firebase.firestore().collection('products').add({
          name, 
          category,
          price,
          url,
          userId:user.uid,
          date:date.toDateString()
        }).then(()=>{
          history.push('/')
        })
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" value={price}
            onChange={(e) => setPrice(e.target.value)} type="number" id="fname" name="Price" />
          <br />
          <br />
          {image ? <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img> : ""}
          <br />
          <input onChange={(e) => setimage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
