import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {allUsersRoute} from "../Utils/APIRoutes";
import "../Styles/Chat.css"
import Contacts from "../Components/Contacts"

function Chat() {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

 
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("chat-app-current-user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("chat-app-current-user")) );
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setavatar");
        }
      }
    })();
  }, [currentUser])

  return (
    <div className="container">
          <Contacts contacts={contacts}  />
    </div>
  )
}

export default Chat