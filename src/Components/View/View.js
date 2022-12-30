import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';

import './View.css';
function View() {

  const [UserDetails, setUserDetails] = useState([])
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const { userId } = postDetails
    firebase.firestore().collection('users').where('id', "==", userId).get().then((res) => {
      res.forEach(doc => {
        console.log("kook");
        console.log(doc);
        setUserDetails(doc.data())
      })
    })
  }, [])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price} </p>
          <span>{postDetails.category}</span>
          <p>{postDetails.name}</p>
          <span>{postDetails.date}</span>
        </div>
        {UserDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{UserDetails.username}</p>
          <p>{UserDetails.PhoneNO}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
