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
    let _item = { ...item, unread: false };
    setMailDetails({ mailItemDetails: { ..._item }, showDetails: true });
    let _readmail = mailStatus.read;
    _readmail.push(_item);

    setMailStatus({
      ...mailStatus,
      read: [..._readmail],
    });
  };

  return (
    <div
      className={`onemail-container bg-${
        item?.id === MailDetails?.mailItemDetails?.id ? "#F2F2F2" : "#CFD2DC"
      }`}
      onClick={handleclick}
    >
      <NameBox name={item.from.name} />
      <div className="py-4">
        <p className="text-sm my-1">
          From: &nbsp;&nbsp;
          <span className="font-medium decoration-indigo-500/30">
            {" "}
            {item.from.name} {"<" + item.from.email + ">"}
          </span>{" "}
          <br />
          Subject:&nbsp;&nbsp;
          <span className="font-medium decoration-indigo-500/30">
            {" "}
            {item.subject}
          </span>
        </p>
        <p className="truncate max-w-64 decoration-gray-500/30 py-2 font-medium">
          {item.short_description}
        </p>
        <span className="font-medium">{date}</span>{" "}
        {(allfavorite || markFavorite) && (
          <span className="text-[#E54065] ml-12 text-sm font-bold">
            Favorite
          </span>
        )}
      </div>
    </div>
  );
};

export default OneMailComponent;
