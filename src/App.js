import React, { useEffect, useState } from "react";
import { FolderIcon } from "@heroicons/react/solid";

import TopBar from "./components/TopBar";
import Load from "./components/Load";
import Error from "./components/Error";

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [files, setFiles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setEror] = useState(false);
  const [path, setPath] = useState([]);

  useEffect(() => {
    getFiles();
  }, []);

  function getFiles() {
    setEror(false);
    setLoader(true);
    fetch(
      API_URL + "ftp" + (path.length > 0 ? "?path=" + JSON.stringify(path) : "")
    )
      .then((response) => response.json())
      .then((datas) => {
        setFiles(datas.list);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setFiles([]);
        setEror(true);
      });
  }

  function handlePathSet(dt) {
    console.log(dt);
    if (dt) {
      setPath([dt]);
    } else {
      setPath([]);
    }
    getFiles();
  }

  return (
    <div className="bg-white h-screen  ">
      <TopBar />
      <div className="p-3  ">
        <ul className="flex text-xs space-x-4">
          <button onClick={() => handlePathSet()}>
            <li className="hover:text-gray-500 cursor-pointer">Dosyalar</li>
          </button>

          {path.map((p) => {
            return (
              p !== "." && (
                <button key={p} className="relative ">
                  <li className="hover:text-gray-500 cursor-pointer left-arrow">
                    {p}
                  </li>
                </button>
              )
            );
          })}
        </ul>
      </div>
      {loader && <Load />}
      {error && <Error onLick={() => getFiles()} />}
      <ul className="flex flex-wrap">
        {files.map((file) => (
          <div className="hover:bg-gray-200 duration-100 border w-2/12 text-center h-28   flex flex-col items-center justify-center relative file-item">
            <input
              type="checkbox"
              name="checkFile"
              className="absolute right-1 top-1 z-99 checkFile"
            />
            <button
              key={file.uniqueID}
              onClick={() => {
                console.log(file.name);
              }}
              className="p-2 w-full h-full"
            >
              <li
                title={file.name}
                className="flex flex-col items-center justify-center"
              >
                <FolderIcon className="text-yellow-500 h-12 w-12" />
                <span className="text-xs">{file.shortName}</span>
              </li>
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
