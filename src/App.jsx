import React, { useState, useEffect } from "react";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";


function App() {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
useEffect(() =>{
onAuthStateChanged(auth, (user) => {
  setLoading(false)
  console.log(user);
  if(user) {
    setUser(user);
  }
})
}, [])
  function register() {
    createUserWithEmailAndPassword(auth, "sobu@email.com", "test123")
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "sobu@email.com", "test123")
      .then(({user}) => {
        console.log(user);
        setUser(user)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
  signOut(auth)
  setUser({})
  
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
      <h2>loading...</h2>
    </div>
  );
}

export default App;
