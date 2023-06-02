import React from "react";
import spinner from "./assets/spinner.gif";


function Spinner() {
  console.log("kicked off spinner");
    return (
      <div>
        <img
          src={spinner}
          style={{ width: '100px', margin: 'auto', display: 'block' }}
          alt="Loading..."
        />
      </div>
    );
  };

  export default Spinner;