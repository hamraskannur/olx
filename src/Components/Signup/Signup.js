import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const history=useHistory()
  const [useName, setuseName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [PhoneNO, setPhoneNO] = useState('');
  const [Errmessage,setErrmessage]=useState('')


  const { firebase } = useContext(FirebaseContext)
  const Handlesubmite = (event) => {
    event.preventDefault();
   
    firebase.auth().createUserWithEmailAndPassword(Email,Password).then((result) => {
      result.user.updateProfile({displayName:useName}).then(()=>{
        firebase.firestore().collection("users").add({
          id:result.user.uid,
          username:useName,
          PhoneNO:PhoneNO
        }).then(()=>{
          history.push("/login")
        })
      }).catch((error)=>{
        setErrmessage(error.message)
      })
    }).catch((error)=>{
      setErrmessage(error.message)
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={Handlesubmite}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={useName}
            onChange={(e) => { setuseName(e.target.value) }}
            type="text"
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={Email}
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={PhoneNO}
            onChange={(e) => { setPhoneNO(e.target.value) }}

            type="number"
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={Password}
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{ history.push("/login")}}>Login</a>
        { Errmessage.length>0 && <a style={{ color: 'red' }}  >{Errmessage}</a>}

      </div>
    </div>
  );
}
