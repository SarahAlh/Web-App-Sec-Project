import React, { useEffect } from "react";
import { HiHeart, HiOutlineChatAlt2, HiDotsHorizontal, HiX, HiHeart as HiHeartFilled  } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { SetSelectedProfile } from "../features/appSlice";
import moment from "moment";
import './styles/post.css';
function Post({ post, user }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", post.id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [post.id]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", post.id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [post.id]
  );

  useEffect(
    () => setHasLiked(likes.findIndex((like) => like.id === user.uid) !== -1),
    [likes, user.uid]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", post.id, "likes", user.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", user.uid), {
        username: user?.displayName,
      });
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (comment !== "") {
      await addDoc(collection(db, "posts", post.id, "comments"), {
        username: user.displayName,
        comment: comment,
        profileImg: user.photoURL,
        timestamp: serverTimestamp(),
      });
    }
    setComment("");
  };

  const visitProfile = () => {
    dispatch(
      SetSelectedProfile({
        selectedProfile: {
          userProfile: post.data().profileImg,
          userId: post.data().userId,
          username: post.data().username,
        },
      })
    );
    navigate("/profile");
  };

  const deletePost = () => {
    deleteDoc(doc(db, "posts", post.id));
  };

  return (
    <div className="PostWrap">
      <div className="HeaderContainer" >
        <img src={post.data().profileImg} alt="" onClick={visitProfile} />
        <p onClick={visitProfile}>{post.data().username}</p>
        {!isOpen ? (
          <HiDotsHorizontal
            onClick={() => setIsOpen(!isOpen)}
            style={{ width: 24, color: "gray", cursor: "pointer" }}
          />
        ) : (
          <HiX
            onClick={() => setIsOpen(!isOpen)}
            style={{ width: 18, color: "black", cursor: "pointer" }}
          />
        )}
        {isOpen && (
          <div className="DotsOptions">
            <li onClick={visitProfile}>
              <div className="Icon" /> View profile
            </li>
            {post.data().userId === user.uid && (
              <li onClick={deletePost} style={{ color: "red" }}>
                <div/> Delete
              </li>
            )}
          </div>
        )}
      </div>
        <p style={{ display: "flex", gap: 10, marginTop: 5, padding: 10 }}>
        <span>{post.data().caption}</span>
      </p>
      <img className="PostCoverPhoto" alt="" src={post.data().image} />
      <div className="PostOptions">
        <div style={{ display: "flex", gap: 15 }}>
          {hasLiked ? (
            <HiHeartFilled
              className="Nav__Icon"
              onClick={likePost}
              style={{ paddingLeft: 10, color: "red" }}
            />
          ) : (
            <HiHeart
              className="Nav__Icon"
              onClick={likePost}
              style={{ paddingLeft: 10 }}
            />
          )}
        </div>
        </div>
      <div>
      <p style={{ paddingLeft: 10 }}>
        {likes.length > 0 && (
          <strong>
            {likes.length} {likes.length > 1 ? "Likes" : "Like"}
          </strong>
        )}
      </p>
      </div>
      {comments.length !== 0 && (
        <div className="CommentsContainer">
          {comments?.map((comment) => (
            <div className="CommentWrapper" key={comment.id}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <img src={comment.data().profileImg} alt="" />
                <h5>
                  <strong>{comment.data().username}</strong>
                </h5>
                <p>{comment.data().comment}</p>
              </div>

              {comment && (
                <p style={{ fontSize: 10, color: "gray" }}>
                  {moment(comment.data().timestamp?.toDate()).fromNow()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {post && (
        <div style={{ padding: 10, color: "gray", fontSize: 12 }}>
          <p> {moment(post.data().timestamp?.toDate()).fromNow()}</p>
        </div>
      )}
      <div className="AddCommentContainer">
        <div>
          <HiOutlineChatAlt2 style={{ height: 30 }} />
          <form onSubmit={addComment}>
            <input
              value={comment}
              type="text"
              placeholder="Add comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
        <h4 style={{ cursor: "pointer" }} onClick={addComment}>
          Post
        </h4>
      </div>
    </div>
  );
}

export default Post;