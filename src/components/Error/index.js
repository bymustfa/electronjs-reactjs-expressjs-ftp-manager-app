import React from "react";

import { Alert } from "../icons";

function Error({ onLick }) {
  return (
    <div className="h-40 flex flex-col justify-center">
      <div className="  flex items-center justify-center">
        <h2 className="text-red-500 text-2xl font-bold">Hata Oluştu</h2>
        <Alert className="text-red-500 ml-4 w-10 h-10" />
      </div>
      <div className="text-center p-4">
        <button
          className="hover:bg-blue-700 px-4 py-2 bg-blue-500 text-white w-26 rounded-md focus:outline-none"
          onClick={onLick}
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
}

export default Error;
