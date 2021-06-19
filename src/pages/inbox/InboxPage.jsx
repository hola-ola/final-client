import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import * as CONSTS from "../../utils/consts";

export default function InboxPage() {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }
    axios
      .get(`${CONSTS.SERVER_URL}/conversations`, {
        headers: { authorization: accessToken },
      })
      .then((response) => {
        console.log("CONVERSATIONS:", response);
        setConversations(response.data);
      });
  }, []);

  return <div>Inbox</div>;
}
