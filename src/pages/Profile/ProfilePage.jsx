/* eslint-disable react/prop-types */
import "./profilepage.css";
import { useLocation } from "react-router";
import { SideBar } from "../../components/Side Bar/SideBar";
import { NavBar } from "../../components/Nav bar/NavBar";
import { users } from "../../../public/json files/users";
import { Post } from "../../components/Post/Post";
import { AddPost } from "../../components/Add post/AddPost";
import { Auth } from "../../components/AuthenticationContext";
import { useContext, useState, useEffect } from "react";
import { MemoizedProfileHeader } from "./ProfileHeader";
import { RightSide } from "./RightSide";

export const ProfilePage = () => {
  const { state } = useLocation();
  const { userId } = state;

  const { user } = useContext(Auth);

  const [posts, setposts] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});

  // This function to test if this profile is mine to be able to manage it
  const isMyProfile = () => {
    if (user.userId === userId) return true;
    return false;
  };

  useEffect(() => {
    let p = [],
      profileInfo;
    users.forEach((u) => {
      if (u.userId === userId) {
        p = u.posts;
        profileInfo = u.userInfo;
      }
    });
    let posts = [];
    p.forEach((p) => {
      posts.push({
        userId: userId,
        userInfo: profileInfo,
        post: p,
      });
    });
    setposts(posts);
    setProfileInfo(profileInfo);
  }, [userId]);

  const addPost = (p) => [setposts([p, ...posts])];

  const removePost = (postId, userId) => {
    let updatedFriendsPosts = posts.filter(
      (p) => p.post.postId !== postId || p.userId !== userId
    );

    setposts(updatedFriendsPosts);
  };

  return (
    <div className="profile-page">
      <NavBar />
      <SideBar />
      <div className="profile-page-content">
        <MemoizedProfileHeader userInfo={profileInfo}></MemoizedProfileHeader>
        <div className="profile-content">
          <div className="posts">
            {isMyProfile() && <AddPost addPost={addPost} />}
            {posts.length > 0 &&
              posts.map((p, i) => (
                <Post key={i} postInfo={p} removePost={removePost}></Post>
              ))}
          </div>
          <RightSide
            userId={userId}
            userInfo={profileInfo}
            userFriends={profileInfo.friendWith}
          />
        </div>
      </div>
    </div>
  );
};
