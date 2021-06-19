import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";

import * as MESSAGE_SERVICE from "../../services/message.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

export default function InboxPage(props) {
  const [conversations, setConversations] = useState([]);
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  useEffect(() => {
    MESSAGE_SERVICE.SHOW_CONVERSATIONS(accessToken)
      .then((res) => {
        if (!res.conversations) {
          return props.history.push(PATHS.HOMEPAGE);
        }
        setConversations(res.conversations);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Inbox</h1>
      <div>
        {conversations.length === 0 ? (
          <div>
            <FiMail />
            <h4>Your inbox is empty</h4>
            <FiMail />
          </div>
        ) : (
          conversations.map((item) => {
            <div>Hi</div>;
          })
        )}
      </div>
      <Link to={`${PATHS.HOMEPAGE}`} className="btn orange">
        Go back to homepage
      </Link>
    </div>
  );
}
