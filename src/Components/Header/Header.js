import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext, FirebaseContext } from '../../store/Context';
function Header() {
  const { user } = useContext(authContext)
 const {firebase} =useContext(FirebaseContext)
  const history = useHistory()
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        {user ? 
        <div className="loginPage">
          <span  >{user.displayName}</span>
          <hr />
        </div> :
          <div onClick={() => { history.push("/login") }} className="loginPage">
            <span  >Login</span>
            <hr />
          </div>}
          {user ? 
         <span onClick={()=>{
          firebase.auth().signOut()
          history.push("/login") 
         }}>logout</span>:null}

        <div onClick={() => { history.push("/Create") }}  className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
