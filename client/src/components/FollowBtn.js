import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);

  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    if (load) return;

    setFollowed(true);
    setLoad(true);
    await dispatch(follow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false);
    setLoad(true);
    await dispatch(unfollow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  return (
    <>
      {followed ? (
        <button
          class="btn btn-primary rounded-circle icon-md ms-auto"
          onClick={handleUnFollow}
        >
          <i
            class="fas fa-user-check"
            style={{ fontSize: "1Opx", padding: "0px 0px 8px 2px" }}
          ></i>
        </button>
      ) : (
        <button
          className="btn btn-outline-info rounded-circle"
          onClick={handleFollow}
        >
          <i
            class="fas fa-user-plus"
            style={{ fontSize: "14px", padding: "0px 0px 8px 2px" }}
          ></i>
        </button>
      )}
    </>
  );
};

export default FollowBtn;
