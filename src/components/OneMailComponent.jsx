import dayjs from "dayjs";
import React, { useContext } from "react";
import "../styles/onemailstyle.css";
import { MailContext } from "../context/mailcontext";
import NameBox from "./NameBox";
import { MailStatuscontext } from "../context/mailStatusContext";

const OneMailComponent = ({ item, markFavorite, mailType, allfavorite }) => {
  const date = dayjs(item.date).format("DD-MM-YYYY hh:mm a");
  const { setMailDetails, MailDetails } = useContext(MailContext);
  const { mailStatus, setMailStatus } = useContext(MailStatuscontext);
  const handleclick = () => {
    let _item={...item, unread:false};
    setMailDetails({ mailItemDetails: { ..._item }, showDetails: true });
    let _readmail = mailStatus.read;
    _readmail.push(_item);
    let _unreadmail = mailStatus.unread;

    _unreadmail = _unreadmail.filter((el) => el.id != _item.id);

    setMailStatus({
      ...mailStatus,
      read: [..._readmail],
      unread: [..._unreadmail],
    });
  };



  return (
    <div
      className="onemail-container"
      onClick={handleclick}
      style={{
        backgroundColor:
          item?.id === MailDetails?.mailItemDetails?.id ? "#F2F2F2" : "#CFD2DC",
      }}
    >
      <NameBox name={item.from.name} />
      <div style={{ paddingBottom: "13px" }}>
        <p>
          From:{item.from.name} {"<" + item.from.email + ">"} <br />
          Subject:{item.subject}
        </p>
        <p
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: "250px",
          }}
        >
          {item.short_description}
        </p>
        <span>{date}</span>{" "}
        {(allfavorite || markFavorite) && (
          <span
            style={{
              color: "#E54065",
              marginLeft: "20px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Favorite
          </span>
        )}
      </div>
    </div>
  );
};

export default OneMailComponent;
