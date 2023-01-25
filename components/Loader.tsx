import React from "react";

function Loader({ show }: { show: boolean }) {
  console.log(show);
  return <div>{show ? <div className="loader"> </div> : null}</div>;
}

export default Loader;
