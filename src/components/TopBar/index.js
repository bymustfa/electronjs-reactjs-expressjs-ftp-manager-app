import React from "react";
import SystemButtons from "../SytemButtons";

function TopBar() {
  return (
    <div className="bg-gray-900 pr-2 shadow text-white  flex items-center justify-between   ">
      <div className="drag-area  w-full p-2">QNAP Yöneticisi</div>
      <SystemButtons />
    </div>
  );
}

export default TopBar;
