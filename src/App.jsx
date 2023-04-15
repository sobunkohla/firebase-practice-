import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc , query, where, updateDoc} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  async function updatePost () {
    const hardCodedId = 'jkBEQhjx28j9khGMLysz';
    const postRef = doc(db , 'posts', hardCodedId);
    const post = await getPostById(hardCodedId);
    const newPost = {
      ...post, 
      title : "make $200M a month in pure personal profit "
    }
    updateDoc(postRef, newPost);
  }

  function createPost() {
    const post = {
      title: "finish money making project ",
      description: "do WebGreat",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

 async  function getAllPosts() {
 const {docs} = await getDocs(collection(db, "posts"));
 console.log(docs)
  }

  async function getPostById (id) {
;
    const postRef = doc(db , 'posts',id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      return postSnap.data();
    }

  }

  async function getPostsByUid () {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where ( "uid", "==", user.uid )
    )
    const {docs} = await getDocs(postCollectionRef);
    console.log(docs.map((post) => post.data()));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);
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
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
      {loading ? <h2>loading...</h2> : user.email}
      <button onClick={createPost}>create post</button>
      <button onClick={getAllPosts}>get all posts</button>
      <button onClick={getPostById}> get post by id</button>
      <button onClick={getPostsByUid}> get Posts By Uid</button>
      <button onClick={updatePost}>update post</button>
    </div>
  );
}

export default App;
