import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/loading.gif";
import { getSuggestions } from "../../redux/actions/suggestionsAction";
import { getPosts } from "../../redux/actions/postAction";

const LeftSideBar = () => {
  const [posts, setPosts] = useState([]);

  const { profile, auth } = useSelector((state) => state);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === auth._id) {
        setPosts(data.posts);
      }
    });
  }, [profile.posts, auth._id]);

  console.log(profile, "sdefdd");

  return (
    <>
      <div class="card mt-3">
        <div class="card-header">
          <div class="text-center">
            <div class="avatar avatar-sm">
              <img
                src={auth.user.avatar}
                alt="user"
                style={{ width: "120px" }}
                class="rounded-circle"
              />
            </div>
            <h5 class="card-title mt-1">{auth.user.username}</h5>
            <p class="card-text">@{auth.user.fullname}</p>
          </div>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <div class="col text-center border-right">
              <p class="font-weight-bold mb-0 small">9</p>
              <p class="text-muted mb-0 small">Posts</p>
            </div>
            <div class="col text-center border-right">
              <p class="font-weight-bold mb-0 small">
                {auth.user.followers.length}
              </p>
              <p class="text-muted mb-0 small">Followers</p>
            </div>
            <div class="col text-center">
              <p class="font-weight-bold mb-0 small">
                {auth.user.following.length}
              </p>
              <p class="text-muted mb-0 small">Following</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
