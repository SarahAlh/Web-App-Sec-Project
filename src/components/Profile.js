import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiCog, HiLogout } from "react-icons/hi";
import { useSelector } from "react-redux";
import { SelectProfile } from "../features/appSlice";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { auth } from "../firebase";

function Profile() {
  const navigate= useNavigate();
  const profile = useSelector(SelectProfile);
  const [posts, setPosts] = useState([]);
  const colRef = collection(db, "posts");
  const q = query(colRef, orderBy("timestamp", "desc"), where("userId", "==", `${profile.userId}`));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs)
    });
  }, [q]);
  
  const visitProfileEdit = () => {
    navigate("/EditProfile");
  };

  return (
    <ProfileWrapper>
      <HeaderWrap>
        <img src={profile.userProfile} alt="Profile_photo" />
        <HeaderInfoWrap>
          <section>
            <h1>{profile.username}</h1>
            <ButtonsContainer>
            <HiCog className="Profile__BUtton" variant="outlined" onClick={visitProfileEdit}/>
            <HiLogout className="Profile__BUtton" onClick={() => auth.signOut()} />
            </ButtonsContainer>
          </section>
        </HeaderInfoWrap>
      </HeaderWrap>
      <div   style={{ height: 40 }} /> YOU HAVE <strong>{posts?.length}</strong> {posts.length > 1 ? "POSTS" : "POST"} 
      <Gallery>
        {posts?.map((post, index) => (
        //<p style={{ display: "block", gap: 20, marginTop: 5, padding: 10, border:10 }}>
        <div className="PostWrap">
        <p style={{ fontSize: 13, color: "gray", padding: 15 }}>
                  {moment(post.data().timestamp?.toDate()).fromNow()}
                </p>
        <p style={{ display: "block", gap: 20, marginTop: 5, padding: 10, border:10}}> {post.data().caption}</p>

        <PostCoverPhoto img src={post.data().image} alt="" key={index} />
        </div>
          ))}
      </Gallery>
    </ProfileWrapper>
  );
}

export default Profile;
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
    font-family: ""Lucida Console", "Courier New", monospace";
    color: black;
    font-size: 30px;
    font-weight: 100;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
`;
const Gallery = styled.div`
  object-fit: contain;
  width: 500px;
  padding: 50px;
  > img {

  }
  > p {
  }
`;
const PostCoverPhoto = styled.img`
object-fit: contain;
width: 90%;
align-items: center;
padding: 20px;
margin-left: 20px;
`;


