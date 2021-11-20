import React from "react";

import { Loader } from "../icons";

function Load() {
  return (
    <div className="h-40   flex items-center justify-center">
      <Loader className="text-blue-700 animate-spin w-12 h-12" />
    </div>
  );
}

export default Load;
