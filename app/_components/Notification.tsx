"use client";

import { IoNotifications } from "react-icons/io5";

function Notification() {
  return (
    <button
      // FIXME
      onClick={() => console.log("notification")}
      className="primaryTransition"
    >
      <IoNotifications />
    </button>
  );
}

export default Notification;
