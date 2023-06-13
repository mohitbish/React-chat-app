import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "../Styles/ChatContainer.css"
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";


export default function ChatContainer({ currentChat }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    
    useEffect(() => {
        (async () => {
            const data = await JSON.parse(
                localStorage.getItem("chat-app-current-user")
            );
        })();
    }, [currentChat])


    useEffect(() => {
        const getCurrentChat = async () => {
        if (currentChat) {
            await JSON.parse(
            localStorage.getItem("chat-app-current-user")
            )._id;
        }
        };
        getCurrentChat();
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const handleSendMsg = async (msg) => {
    
    };

    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
        handleSendMsg(msg);
        setMsg("");
        }
    };
    

  return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img
                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                        alt=""
                    />
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <Logout />
        </div>
        <div className="chat-messages">
            {messages.map((message) => {
            return (
                <div ref={scrollRef} key={uuidv4()}>
                <div
                    className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                    }`}
                >
                    <div className="content ">
                    <p>{message.message}</p>
                    </div>
                </div>
                </div>
            );
            })}
        </div>
        <div className="chat-input">
            <div className="button-container">
                <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className="input-container" onSubmit={(event) => sendChat(event)}>
                <input
                type="text"
                placeholder="type your message here"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
                />
                <button type="submit">
                <IoMdSend />
                </button>
            </form>
        </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 20% 60% 20%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
`;

    