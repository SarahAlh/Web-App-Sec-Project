import React, { useState } from "react";
import styled from "styled-components";
import { updateProfile } from "firebase/auth";
import {auth} from "../firebase"
import { SelectProfile } from "../features/appSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const user = auth.currentUser;
  const profile = useSelector(SelectProfile);
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState ({
    email:user.email,
    name: user.displayName,
    picURL: user.photoURL,
  });

  const handleUserInputChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    setCredentials((prev) => {
      return {...prev, [name] : value};
    });
  };
  
  const handleUpdateRequest = (event) => {
    event.preventDefault();
      if (user) {
        updateProfile(user, {
          displayName: credentials.name,
          photoURL: credentials.picURL,
          email: credentials.email,
      })
      alert("Updated");
      navigate("/"); 
      window.location.reload(false);
    } else {
      alert("error");      
    }
  };
  return (
  <ProfileWrapper>
    <ContentsWrapper>
      <HeaderWrap>
        <img src={profile.userProfile} alt="Profile_photo" />
        <HeaderInfoWrap>
          <section>
            <h1>{profile.username}</h1>
            </section>
        </HeaderInfoWrap>
           </HeaderWrap>
      <p style={{ paddingRight: 20 }}> Edit Your Profile</p>
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
        <label>Profile Picture: </label>
        <input 
          type="picURL" 
          name="picURL"
          value={credentials.picURL}
          onChange={handleUserInputChange}
        /></div>
        <button onClick={handleUpdateRequest}>
        <span>Save Updates</span>
        </button>
    </ContentsWrapper>
    </ProfileWrapper>
  );
}

export default EditProfile;
const ProfileWrapper = styled.div`
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderWrap = styled.div`
display: flex;
gap: 140px;
align-items: center;
padding-bottom: 50px;
> img {
  border-radius: 50%;
  height: 150px;
  width: 150px;
  overflow: hidden;
  display: flex;
  border-radius: 50%;
  padding: 4px;
  justify-content: center;
  align-items: center;
  border: 2px solid grey;
}

`;
const HeaderInfoWrap = styled.div`
flex: 0.8;
  > section {
    display: flex;
    flex-direction: column;
    gap: 30px;
    @media (min-width: 750px) {
      display: flex;
      gap: 30px;
    }
  }
  > section > h1 {
    font-family: "Lucida Console", "Courier New", monospace;
    color: black;
    font-size: 30px;
    font-weight: 100;
  }
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
  > button {
    font-weight: 600;
    width: 60%;
    background-color: #B8B8B8;
    border: 2px solid black;
    padding: 10px;
    cursor: pointer;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
  }

> lable {
  align-items: right;
}
`;
