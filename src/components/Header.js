import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { HomeIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { SetSelectedProfile } from "../features/appSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const modalContentRef = useRef();
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const handler = (event) => {
      if (!modalContentRef.current.contains(event.target)) {
        setIsOpen(false);
      } };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const visitProfile = () => {
    dispatch(
      SetSelectedProfile({
        selectedProfile: {
          userProfile: user.photoURL,
          userId: user.uid,
          username: user.displayName,
        }, })
    );
    navigate("/profile");
    setIsOpen(false);
  };

  return (
    <HeaderContainer>
      <ContentsWrap>
        <NavOptionsContainer>
           <HomeIcon className="Nav__Icon"  onClick={() => navigate("/")} />
          {user ? (
            <UserAvatarContainer>
              <img
                src={user?.photoURL}
                alt=""
                className="Nav__Icon" 
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <UserAvatarPopupContainer ref={modalContentRef}>
                  <section onClick={visitProfile}>
                 <p>Profile</p>
                  </section>
                  <div>
                  <p onClick={() => auth.signOut()}>Logout</p>
                </div>   
                </UserAvatarPopupContainer>
              )}
            </UserAvatarContainer>
          ) : (
            <p>
              <strong>Sign in</strong>
            </p>
          )}
        </NavOptionsContainer>
        <div>
          <button onClick={() => 
            auth.signOut() }>Sign Out</button>
        </div>   
      </ContentsWrap>
    </HeaderContainer>
  );
}

export default Header;
const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #eeee;
  padding: 10px 20px;
  border-bottom: 1px solid grey;

`;
const ContentsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 750px) {
    width: 75%;
    margin: auto;
  }
`;

const NavOptionsContainer = styled.div`
  display: flex;
  gap: 15px;
`;
const UserAvatarContainer = styled.div`
  position: relative;
  > img {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    overflow: hidden;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 9999px;
    cursor: pointer;
  }
`;
const UserAvatarPopupContainer = styled.div`
  position: absolute;
  z-index: 2;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 150px;
  top: 45px;
  right: 10px;
  border-radius: 0.25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  > section {
    display: flex;
    padding: 20px;
    gap: 10px;
    cursor: pointer;
  }
  > div {
    margin-top: 30px;
    border-top: 1px solid gray;
  }
  > div > p {
    padding: 10px 20px;
    cursor: pointer;
  }
`;
