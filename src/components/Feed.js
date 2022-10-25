import React from "react";
import styled from "styled-components";
import PersonalInfoCard from "./PersonalInfoCard";
import { useSelector } from "react-redux";
import { selectPosts } from "../features/appSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Post from "./Post";
import PostBox from './PostBox';

function Feed() {
  const posts = useSelector(selectPosts);
  const [user] = useAuthState(auth);

  return (
    <FeedContainer>
          <Widgets>
          <PersonalInfoCard user={user} />
        </Widgets>
        <PostsContainer>
        <PostBox/>
          {posts?.map((post) => (
            <Post post={post} key={post.id} user={user} />
          ))}
        </PostsContainer>
    </FeedContainer>
  );
}

export default Feed;
const FeedContainer = styled.div`
  display: flex;
  border: 1px solid #f7fafc;
  margin-top: 20px;
`;
const PostsContainer = styled.div``;

const Widgets = styled.div`
  @media (min-width: 750px) {
    flex: 0.4;
  }
  padding: 0 20px;
`;

