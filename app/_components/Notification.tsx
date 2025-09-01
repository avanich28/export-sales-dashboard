"use client";

import { IoNotifications } from "react-icons/io5";

function Notification() {
  // FIXME
  return (
    <button
      onClick={() => console.log("notification")}
      className="primaryTransition"
    >
      <IoNotifications />
    </button>
  );
}

export default Notification;
