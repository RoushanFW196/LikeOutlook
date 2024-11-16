import React, { useContext, useEffect, useRef, useState } from "react";
import OneMailComponent from "./OneMailComponent";
import { MailContext } from "../context/mailcontext";
import { MailStatuscontext } from "../context/mailStatusContext";

const MailList = ({ showMailDetail }) => {
  const [AllMail, SetAllMail] = useState([]);
  const [page, setPage] = useState(1);
  const [isActive, setIsActive] = useState({
    unread: true,
    read: false,
    favorite: false,
  });

  const totalmailref = useRef(0);

  const { setMailDetails, MailDetails } = useContext(MailContext);
  const { mailStatus, setMailStatus } = useContext(MailStatuscontext);

  useEffect(() => {
    if (isActive.unread) {
      getAllMails();
    } else if (isActive.read) {
      let readMails = [...mailStatus.read];
      SetAllMail([...readMails]);
    } else if (isActive.favorite) {
      let favoriteMails = [...mailStatus.favorite];

      SetAllMail([...favoriteMails]);
    }
  }, [isActive, page]);

  const getAllMails = async () => {
    const data = await fetch(
      `https://flipkart-email-mock.vercel.app/?page=${page}`
    );
    const respdata = await data.json();
    let unreadmail = respdata.list.map((el) => ({ ...el, unread: true }));

    SetAllMail([...unreadmail]);
    totalmailref.current = respdata.total;
    setMailStatus({ ...mailStatus, unread: [...respdata.list] });
  };

  console.log("allmail", AllMail);
  const handleMailStatus = (type) => {
    setIsActive({ ...isActive, [type]: true });
    if (type === "read") {
      setIsActive({ ...isActive, unread: false, read: true, favorite: false });
    } else if (type === "unread") {
      setIsActive({ ...isActive, unread: true, read: false, favorite: false });
    } else if (type === "favorite") {
      setIsActive({ ...isActive, unread: false, read: false, favorite: true });
    }
  };

  const handlepagination = (key) => {
    setPage((prevpage) => prevpage + key);
  };

  console.log("totalmailref", totalmailref);
  return (
    <div style={{ width: showMailDetail ? "30%" : "100%" }}>
      <div
        style={{
          justifyContent: "flex-end",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginRight: "12px",
        }}
      >
        <span>
          {10 * page - 10 + 1 + "-" + Math.min(totalmailref.current, 10 * page)}{" "}
          of {totalmailref.current}
        </span>

        <button onClick={() => handlepagination(-1)} disabled={page === 1}>
          prev
        </button>
        <button
          onClick={() => handlepagination(+1)}
          disabled={page * 10 > totalmailref.current}
        >
          next
        </button>
      </div>
      <div style={{ padding: "10px " }}>
        <span>Filter By:</span>

        <span
          onClick={() => handleMailStatus("unread")}
          style={{ margin: "0px 10px" }}
          className={isActive.unread ? "activemailstatus" : ""}
        >
          Unread
        </span>
        <span
          onClick={() => handleMailStatus("read")}
          style={{
            margin: "0px 10px",
          }}
          className={isActive.read ? "activemailstatus" : ""}
        >
          Read
        </span>
        <span
          onClick={() => handleMailStatus("favorite")}
          style={{ margin: "0px 10px" }}
          className={isActive.favorite ? "activemailstatus" : ""}
        >
          Favourite
        </span>
      </div>

      {AllMail.map((el) => (
        <OneMailComponent
          item={el}
          key={el.id}
          mailType={
            isActive.read ? "read" : isActive.favorite ? "favorite" : "unread"
          }
          allfavorite={isActive.favorite && AllMail.length > 0}
          markFavorite={
            MailDetails.mailItemDetails.id === el.id && MailDetails.markFavorite
          }
        />
      ))}
    </div>
  );
};

export default MailList;
