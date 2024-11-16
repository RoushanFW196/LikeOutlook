import React, { useContext, useEffect, useRef, useState } from "react";
import OneMailComponent from "./OneMailComponent";
import { MailContext } from "../context/mailcontext";

const MailList = ({ showMailDetail }) => {
  const [AllMail, SetAllMail] = useState([]);
  const totalmailref = useRef(0);

  const { setMailDetails, MailDetails } = useContext(MailContext);

  useEffect(() => {
    getAllMails();
  }, []);
  const getAllMails = async () => {
    const data = await fetch("https://flipkart-email-mock.vercel.app/");
    const respdata = await data.json();

    SetAllMail([...respdata.list]);
    totalmailref.current = data.totaL;
  };

  return (
    <div style={{ width: showMailDetail ? "30%" : "100%" }}>
      <div style={{ padding: "10px " }}>
        <span>Filter By:</span>
        <span style={{ margin: "0px 10px" }}>Unread</span>
        <span
          style={{
            margin: "0px 10px",
            backgroundColor: "#CFD2DC",
            borderRadius: "15px",
            padding: "5px 15px ",
          }}
        >
          Read
        </span>
        <span style={{ margin: "0px 10px" }}>Favourite</span>
      </div>

      {AllMail.map((el) => (
        <OneMailComponent
          item={el}
          key={el.id}
          markFavorite={
            MailDetails.mailItemDetails.id === el.id && MailDetails.markFavorite
          }
        />
      ))}
    </div>
  );
};

export default MailList;
