import React, { useState ,useContext} from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {

  const history=useHistory()
  const [email, setEmail] = useState();
  const [Password, setPassword] = useState('');
  const {firebase}=useContext(FirebaseContext)
  const [Errmessage,setErrmessage]=useState('')      

  const Handlesubmite = (event) => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email,Password).then(()=>{
        history.push("/")
    }).catch((error)=>{
      setErrmessage(error.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={Handlesubmite}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            type="email"
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input 
            
            className="input"
            value={Password}
            onChange={(e) => {setPassword(e.target.value)}}
            type="password"
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{ history.push("/signup")}}>Signup</a>
        { Errmessage.length>0 && <a style={{ color: 'red' }}  >{Errmessage}</a>}
      </div>
    </div>
  );
}

export default Login;
