import React, { useContext, useEffect, useState } from "react";
import MailList from "./MailList";
import MailDetail from "./MailDetail";
import { MailContext } from "../context/mailcontext";

const MailBody = () => {
  const [showMailDetail, setshowMailDetail] = useState(false);


  const {showMailDetails, setShowMailDetails } = useContext(MailContext);



     console.log('showMailDetails', showMailDetails)



  return (
    <div
      style={{
        width: "90vw",
        height: "auto",
        margin: "auto",
        border: "1px solid red",
        display: "flex",
        backgroundColor: "#F4F5F9",
        padding: "20px",
      }}
    >
      <MailList showMailDetail={showMailDetail} />
      {showMailDetail && <MailDetail id={3} />}
    </div>
  );
};

export default MailBody;
