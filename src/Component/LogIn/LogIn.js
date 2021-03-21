import { Button, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import firebaseConfig from "./firebase.config"
import firebase from "firebase/app";
import "firebase/auth";
import './LogIn.css'
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
    const provider = new firebase.auth.GoogleAuthProvider();



    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: ''
    })
    const [newUser, setNewUser] = useState(false);

    //google sign in firebase 
    const handleGoogleSingIN = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {

                const { displayName, email, photoUrl } = res.user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoUrl,
                };
                setUser(signInUser);
                setLoggedInUser(signInUser);
                history.replace(from);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message)
            })

    }

    const handleChange = (e) => {
        let isFiledValid = true;
        if (e.target.name === 'email') {
            isFiledValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            isFiledValid = e.target.value.length > 6;
        }
        if (isFiledValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            //console.log(newUserInfo);
            setUser(newUserInfo);
        }
    }
    //email and password sign up firebase
    const handleSubmit = (event) => {
        console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res);
                    const newUserInfo = { ...user };
                    newUserInfo.error = " ";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);

                })
                .catch(error => {
                    // Handle Errors here.
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    // ...
                });
        }

        if (!newUser && user.email && user.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = " ";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('Sign in user info', res.user);
                })
                .catch(function (error) {
                    // Handle Errors here.
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    // ...
                });
        }
        event.preventDefault();

    };
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user
            .updateProfile({
                displayName: name,

            })
            .then(function () {
                console.log("User name updated successfully")
            })
            .catch(function (error) {
                console.log(error)
            });

    }


    return (
        <div className="loginHeader">
            <h1>{newUser ? 'Create an account' : 'Sign in to your account'}</h1>
            
            
            <form onSubmit={handleSubmit}>
                {newUser && <TextField name="name" onChange={handleChange} id="standard-basic" label="Name" />}
                <br />
                <TextField name="email" onChange={handleChange} id="standard-basic" label="Email" required />
                <br />
                <TextField type="password" name="password" onChange={handleChange} id="standard-basic" label="Password" required />
                <br />
                {newUser && <TextField type="password" name="password" onChange={handleChange} id="standard-basic" label="Confirm Password" />}
                <br /> <br />
                <Button type="submit" variant="contained" color="primary" value=""> {newUser ? 'Create your account' : 'Log In'}</Button>
                {
                    !newUser ? <p>Don't have any account?<small style={{ fontSize:'20px', }}><span style={{ color:'red',cursor:'pointer' }} onClick={()=>setNewUser(!newUser)}>create an account</span></small></p>:<p>Already have an account?<span style={{ color:'red',cursor:'pointer' }}  onClick={()=>setNewUser(!newUser)}>Login</span></p>
                }
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully  </p>}
            <br /><br /><br />
            <Button onClick={handleGoogleSingIN} variant="contained" color="primary" disableElevation>
                Google Sign In
            </Button>
        </div>
    );
};

export default Login;