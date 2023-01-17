import React from "react";

function Loader({ show }: { show: boolean }) {
  return (
    <div className="loader">
      {show ? <div className="loader__container"> </div> : null}
    </div>
  );
}

export default Loader;
