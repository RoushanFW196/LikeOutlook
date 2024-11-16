import React, { useContext, useEffect, useState } from "react";
import MailList from "./MailList";
import MailDetail from "./MailDetail";
import { MailContext } from "../context/mailcontext";

const MailBody = () => {
  const { MailDetails, setMailDetails } = useContext(MailContext);

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
      <MailList
        showMailDetail={MailDetails?.mailItemDetails?.id ? true : false}
      />
      {MailDetails?.showDetails && (
        <MailDetail
          items={MailDetails.mailItemDetails}
          id={MailDetails.mailItemDetails.id}
        />
      )}
    </div>
  );
};

export default MailBody;
