import React, { useContext, useState } from 'react';
import firebase from 'firebase/app'
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { FaGoogle } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';


    

const LogIn = () => {
    const [newUser, setNewUser] = useState(false);
      const [user,setUser] = useState({
        isSignedIn:false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error:'',
        success:false,
      })
    const [setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
      }
    


      
      const provider = new firebase.auth.GoogleAuthProvider();
      const handleSignIn = () =>{
        firebase.auth().signInWithPopup(provider)
        .then(result =>{
          const {displayName,email,photoURL} = result.user;
          const signInUser = {
            isSignedIn:true,
            name:displayName,
            email:email,
            photo:photoURL,
          }
          setLoggedInUser(signInUser)
          history.replace(from);
        })
        .catch(err =>{
          console.log(err)
          console.log(err.message)
        })
      }

      const handleSignOut = ()=>{
        firebase.auth().signOut()
        .then(result =>{
          const signedOutUser = {
            isSignedIn:false,
            name: '',
            email: '',
            photo: '',
          }
          setLoggedInUser(signedOutUser)
          console.log(result)
        })
        .catch(error=>{

        })
      }

      const handleBlur =(event)=>{
        console.log(event.target.name,event.target.value)
        let isFieldValid = true;
        if(event.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if(event.target.name === 'password'){
          const isPasswordValid = event.target.value.length > 6;
          const passwordHasNumber = /\d{1}/.test(event.target.value);
          isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[event.target.name] = event.target.value;
          setUser(newUserInfo);
        }
      }
      const handleSubmit = (event)=>{
        // console.log(user.email, user.password)
        if(newUser && user.email && user.password){
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(result=>{
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo); 
            UpdateUserName(user.name);
          })
          .catch(error=>{
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
        }

          if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
              const newUserInfo = {...user};
              newUserInfo.error = '';
              newUserInfo.success = true;
              setUser(newUserInfo);
              console.log('Sign in user info',result.user)
            })
            .catch((error) => {
              const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo);
            });
          }


        event.preventDefault();
      }

      const UpdateUserName = name =>{
        const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name,
        }).then(function() {
          console.log('User name updated successfully')
        }).catch(function(error) {
          console.log(error)
        });
      }
    

    return (
        <div className="App">
        {
          user.isSignedIn ? <button onClick={handleSignOut}><FaGoogle /> Google Sign Out</button>:<button onClick={handleSignIn}><FaGoogle /> Google Sign In</button>
        }
        <br></br>
        
        {/* <label htmlFor="newUser">New User Registration</label> */}
        
        <form onSubmit={handleSubmit}>
          <br></br>
          {
            newUser && <input type="text" name="name" style={{ padding:'7px 80px 7px 10px',marginBottom:'10px' }} onBlur={handleBlur} placeholder="Enter Your Name"/>
          }
          <br></br>
          <input type="text"  style={{ padding:'7px 80px 7px 10px',marginBottom:'10px' }} name="email" onBlur={handleBlur} placeholder="Your Email Address" required/>
          <br></br>
          <input type="password" style={{ padding:'7px 80px 7px 10px',marginBottom:'10px' }} name="password" onBlur={handleBlur} placeholder="Enter Your Password" required/>
          <br></br>
          {
              !newUser ?<input type="submit" style={{ padding:'7px 112px',marginBottom:'10px',backgroundColor:'tomato',border:'none' }} value="Log In"/>:<input type="submit" style={{ padding:'7px 68px',marginBottom:'10px',backgroundColor:'tomato',border:'none' }} value="Create An Account"/>
          }
          {
              !newUser ? <p>Don't have any account <span><a href="" onClick={()=>setNewUser(!newUser)}><input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/> create an account</a></span></p>:<p>Already have an account?<a  onClick={()=>setNewUser(!newUser)}><input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>Login</a></p>
          }
        </form>
      
      {
        user.success ? <p style={{ color:'green' }}>Your account {newUser ? 'created' : 'logged in'} successfully</p> : <p style={{ color:'red' }}>{user.error}</p>
      }
    </div>
    );
};

export default LogIn;