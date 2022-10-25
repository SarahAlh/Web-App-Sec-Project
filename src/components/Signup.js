import React, { useState } from "react";
import styled from "styled-components";
import Google from "./google.png";
import { auth, provider} from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Signup() {
  const [credentials, setCredentials] = useState ({
    email:"",
    name: "",
    password: "",
    picURL: "",
    email2: "",
    password2: "",
  });
  
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  const handleUserInputChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    setCredentials((prev) => {
      return {...prev, [name] : value};
    });
  };

  const handleSignUpRequest = (event) => {
      event.preventDefault();
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        updateProfile(user, {
          displayName: credentials.name,
          photoURL: credentials.picURL
      }).then(()=> {
          alert("Welcome " + credentials.name);
          console.log(user);
        }).catch((err) => {
          console.log("CAN NOT!!");
        })
  }).catch((err) => {
    alert(err);
  });
};

const handleLognUpRequest = (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, credentials.email2, credentials.password2)
  .then((userCredentials) => {
    const user = userCredentials.user;
}).catch((err) => {
alert(err);
});
};

  return (
    <LoginContainer>
      <ContentsWrapper>
      <p style={{ paddingRight: 20 }}> Sign In With Post-It</p>
      <div>
        <label>Email: </label>
        <input 
          type="email" 
          name="email2"
          value={credentials.email2}
          onChange={handleUserInputChange}
        /></div>
        <div>
        <label>Password: </label>
        <input 
          type="password" 
          name="password2"
          value={credentials.password2}
          onChange={handleUserInputChange}
        /></div>
        <button onClick={handleLognUpRequest}>
        <span>Log in</span>
        </button>
          <div>
          <label>Username: </label>
          <input 
          type="text" 
          name="name"
          value={credentials.name}
          onChange={handleUserInputChange}
        /></div>
        <div>
        <label>Email: </label>
        <input 
          type="email" 
          name="email"
          value={credentials.email}
          onChange={handleUserInputChange}
        /></div>
        <div>
        <label>Password: </label>
        <input 
          type="password" 
          name="password"
          value={credentials.password}
          onChange={handleUserInputChange}
        /></div>
          <div>
        <label>Profile Picture: </label>
        <input 
          type="picURL" 
          name="picURL"
          value={credentials.picURL}
          onChange={handleUserInputChange}
        /></div>
        <button onClick={handleSignUpRequest}>
        <span>Sign Up </span>
        </button>
        <p>  </p>
        <button onClick={signIn}>
          <img src={Google} alt="" />
          <span style={{ paddingRight: 20 }}>Sign in with Goggle</span>
        </button>
      </ContentsWrapper>
    </LoginContainer>
  );
}

export default Signup;
const LoginContainer = styled.div`
  font-family: "Times New Roman";
  background-color: grey;
  height: 100vh;
  display: grid;
  place-items: center;
  width: flex;
`;
const ContentsWrapper = styled.div`
  padding: 100px;
  text-align: left;
  background-color: #fff;
  border-radius: 20px;
  > img {
    object-fit: contain;
    height: 100px;
  }
  > p {
    text-align: center;
    color: #4a5568;
    font-size: 20px;
    padding: 20px;
  }
  > button {
    display: flex;
    align-items: center;
    margin: auto;
    color: #fff;
    background-color: grey;
    border: 1px solid #black;
    border-radius: 3px;
    font-weight: 700;
    font-size: 15px;
    padding: 1px;
    cursor: pointer;
  }
  > button > img {
    padding: 10px;
    background-color: #fff;
    object-fit: contain;
    height: 20px;
    margin-right: 20px;
  }
  > div > input{
    font-family: "Times New Roman";
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    border: 2px solid #DADCE0;
    border-radius: 7px;
    font-size: 20px;
    padding: 0 20px;
    outline: none;
    background: none;
    z-index: 1;
  }
  > h6 {
    color: #2d3748;
    padding: 20px;
  }
`;
