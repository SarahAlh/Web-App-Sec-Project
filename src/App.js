import Header from "./components/Header";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React from 'react'
import {
  selectAddPostIsOpen,
  SetPosts,
} from "./features/appSlice";
import { useTransition, animated } from "react-spring";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Signup from "./components/Signup";
import EditProfile from "./components/EditProfile";

function App() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const addPostIsOpen = useSelector(selectAddPostIsOpen);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        dispatch(
          SetPosts({
            posts: snapshot.docs,
          })
        );
      }
    );
    return () => {
      unsubscribe();
    };
  });


  return (
    <AppContainer>
      {!user ? (
        <Signup />
      ) : (
        <>
          <Header />
          <BodyWrapper>
            <Routes>
              <Route exact path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editprofile" element={<EditProfile />} />
            </Routes>
          </BodyWrapper>

        </>
      )}
    </AppContainer>
  );
}

export default App;
const AppContainer = styled.div`
  background-color: #fff;
`;
const BodyWrapper = styled.div`
  width: 100%;
  @media (min-width: 750px) {
    width: 75%;
    margin: auto;
  }
`;
