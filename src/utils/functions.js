export const nameSort = (name) => {
  if (name.length > 10) {
    name = name.substr(0, 10) + "...";
  }
  return name;
};

export const extentionList = () => [
  { name: "zip" },
  { name: "jpg" },
  { name: "png" },
  { name: "txt" },
  { name: "pdf" },
];

export const extention = (name) => {
  let ex = name.split(".");
  // console.log(ex.pop().toLowerCase());
};
