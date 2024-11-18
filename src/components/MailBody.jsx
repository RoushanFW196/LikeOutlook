import React, { useContext, useEffect, useState } from "react";
import MailList from "./MailList";
import MailDetail from "./MailDetail";
import { MailContext } from "../context/mailcontext";

const MailBody = () => {
  const { MailDetails, setMailDetails } = useContext(MailContext);

  return (
    <div className="w-10/12 md:w-auto h-auto min-h-screen mx-10 my-10 flex bg-[#eeeff3] p-10">
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
