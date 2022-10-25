import React, { useRef, useState } from "react";
import styled from "styled-components";
import {addDoc,doc,updateDoc,collection,serverTimestamp,} from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import './styles/post.css';

function PostBox() {
    const [user] = useAuthState(auth);
    const filePickerRef = useRef(null);
    const [caption, setCaption] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading] = useState(false);
    const [img, setImg] = useState("");
    const areAllFieldsFilled = (caption != "") || (img != "")
    
    const uploadPost = async () => {
        if (loading) return;
        const docRef = await addDoc(collection(db, "posts"), {
          username: user.displayName,
          userId: user.uid,
          caption: caption,
          profileImg: user.photoURL,
          timestamp: serverTimestamp(),
        });
        setCaption("");
        setImg("");
        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url").then(
          async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "posts", docRef.id), {
              image: downloadURL,
            });
          }
        );

        setSelectedFile(null);
        const file = document.querySelector('.file');
        file.value = '';
      };
      
      const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
    
        reader.onload = (readerEvent) => {
          setSelectedFile(readerEvent.target.result);
        };
      };

    return (   
      <ContentContainer>
        <HeaderContainer>
       </HeaderContainer>
          <lable><strong>{user.displayName}</strong>, what is in Your Mind?<a style={{color: '#e32'}}>*</a></lable>
            <textarea
            //disabled={selectedFile}
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}   
            style={{
              padding: 5,
              color: "black",
              textAlign: "left",
              border: "3px solid #dadada",
              fontSize: 20,
            }}
          />
        <p
            style={{
              padding: 5,
              fontSize: 15,
              color: "grey",
              textAlign: "center",
            }}>
          {selectedFile ? (
            <img
              src={selectedFile}
              alt=""
              style={{
                objectFit: "contain",
                cursor: "pointer",
                maxHeight: 200,
                width: "100%",
                borderRadius: 5,
              }}
            />
          ) : (
            <input
              hidden 
              onClick={() => filePickerRef.current.click()}
              style={{
                padding: 2,
                borderRadius: 9999,
                cursor: "pointer",
                height: 30,
              }}
            />
          )}</p>
          <input
            ref={filePickerRef}
            type="file"
            class="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={addImageToPost}
          />
            <button
              type="submit"
              disabled={!areAllFieldsFilled}
              onClick={uploadPost}>
              POST
            </button>
            </ContentContainer>
  )}

export default PostBox;
const ContentContainer = styled.div`
  background-color: white;
  margin-bottom: 10px;
  border: 2px solid grey;
  border-radius: 30px;
  width: flex;
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 20px;
  flex-direction: column;
  margin: 29px;
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
> textarea {
  font-family: "Times New Roman";
  min-width: 400px;
  border-radius: 9px;
  border: 2px solid grey;

}
> lable {
  align-items: right;
}
`;
const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;}
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
    border: 2px solid grey;
  }
 > p {
    flex: 1;
    font-size: 15px;
    cursor: pointer;
    font-weight: 200;
  }
  .DotsOptions{
  position: absolute;
  background-color: #fff;
  border: 0.5px solid grey;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  padding: 10px;
  right: 20px; 
  top: 50px;}
  .DotsOptions > li {
    display: flex;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    padding: 3px;
    cursor: pointer;
    `;