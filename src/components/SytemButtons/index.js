import React from "react";

function SystemButtons() {
  return (
    <div className="flex items-center space-x-1 ">
      <button
        className="hover:bg-green-900 duration-200  bg-green-500 p-2 rounded-full cursor-pointer focus:outline-none"
        onClick={() => window.ipcRenderer.send("minimizeApp", true)}
      />
      <button
        className="hover:bg-yellow-900 duration-200  bg-yellow-500 p-2 rounded-full cursor-pointer focus:outline-none"
        onClick={() => window.ipcRenderer.send("maximizeApp", true)}
      />
      <button
        className="hover:bg-red-900 duration-200  bg-red-500 p-2 rounded-full cursor-pointer focus:outline-none"
        onClick={() => window.ipcRenderer.send("closeApp", true)}
      />
    </div>
  );
}
export default SystemButtons;
