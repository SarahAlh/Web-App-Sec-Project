import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetSelectedProfile } from "../features/appSlice";

function PersonalInfoCard({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const visitProfile = () => {
    dispatch(
      SetSelectedProfile({
        selectedProfile: {
          userProfile: user.photoURL,
          userId: user.uid,
          username: user.displayName,
          created_at: user.created_at,
        },
      })
    );
    navigate("/profile");
  };
  
  return (
    <CardWrapper>
      <UserInfoWrap>
        <img src={user?.photoURL} alt="" onClick={visitProfile} />
        <section>
          <h5 onClick={visitProfile}>
          <section>
          <h10><strong> Welcome</strong></h10>
          </section>
          <strong>{user?.displayName}</strong>
          </h5>
        </section>
      </UserInfoWrap>
    </CardWrapper>
  );
}

export default PersonalInfoCard;
const CardWrapper = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px 0;
  @media (min-width: 900px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  > h4 {
    cursor: pointer;
    color: #4299e1;
    font: 20px;
    display: none;
    @media (min-width: 1200px) {
      display: block;
    }
  }
`;
const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  > img {
    border-radius: 50%;
    height: 100px;
    width: 100px;
    overflow: hidden;
    display: flex;
    border-radius: 50%;
    padding: 4px;
    justify-content: center;
    align-items: center;
    border: 3px solid black;
    cursor: pointer;
  }
  > section {
    flex: 1;
  }
  > section > p {

    color: black;
    font-size: 20px;
  }
  > section > h5 {
    color: black;
    cursor: pointer;
  }
`;
