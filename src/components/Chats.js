import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Button } from "@material-ui/core";
const Chats = () => {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { user } = useAuth();
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userphoto.jpg", { type: "images/jpg" });
  };
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      if (!user || user === null) {
        history.push("/");
        return;
      }
      axios
        .get("https://api.chatengine.io/users/me", {
          headers: {
            "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);
          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);
            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
                },
              })
              .then((data) => {
                setLoading(false);
                console.log(data);
              })
              .catch((error) => console.log(error));
          });
        });
    }
  }, [user, history]);
  if (!user || loading) return "Loading...";
  return (
    <div>
      <nav>
        <ul>
          <li style={{ marginTop: 4, fontWeight: 600, fontSize: "1.2rem" }}>
            FireChat
          </li>
          <li style={{ marginLeft: "auto", marginRight: 20 }}>
            <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
          </li>
        </ul>
      </nav>
      <ChatEngine
        height="calc(100vh - 75px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};
export default Chats;
