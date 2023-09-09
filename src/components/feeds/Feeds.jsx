import { AddPost } from "../Add post/AddPost";
import "./feeds.css";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../AuthenticationContext";
import { users } from "../../../public/json files/users";
import { Post } from "../Post/Post";

export const Feeds = () => {
  const { user, getUserInfo } = useContext(Auth);
  const { userId } = user;

  const [friendsPosts, setFriendsPosts] = useState([]);

  const addPost = (p) => {
    setFriendsPosts([p, ...friendsPosts]);
  };

  const removePost = (postId, userId) => {
    let updatedFriendsPosts = friendsPosts.filter(
      (p) => p.post.postId !== postId || p.userId !== userId
    );

    setFriendsPosts(updatedFriendsPosts);
  };

  useEffect(() => {
    let friendsId,
      friendsPosts = [];
    const userInfo = getUserInfo(userId);
    friendsId = userInfo.friendWith;
    if (friendsId.length !== 0) {
      users.forEach((u) => {
        if (friendsId.indexOf(u.userId) !== -1) {
          friendsPosts.push({
            userId: u.userId,
            userInfo: u.userInfo,
            post: u.posts[0],
          });
        }
      });
    }
    setFriendsPosts(friendsPosts);
  }, [userId, getUserInfo]);

  return (
    <div className="feeds">
      <AddPost addPost={addPost} />
      {friendsPosts.length > 0 &&
        friendsPosts.map((fp, i) => (
          <Post key={i} postInfo={fp} removePost={removePost} />
        ))}
    </div>
  );
};
