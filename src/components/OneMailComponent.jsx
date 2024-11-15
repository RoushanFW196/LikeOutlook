import dayjs from "dayjs";
import React, { useContext } from "react";
import "../styles/onemailstyle.css";
import { MailContext } from "../context/mailcontext";

const OneMailComponent = ({ item }) => {
  const date = dayjs(item.date).format("DD-MM-YYYY hh:mm a");

  const { setShowMailDetails } = useContext(MailContext);
  console.log("mailcontext, ", mailcontext);
  const handleclick = () => {
    console.log("item", item);
    setShowMailDetails({ ...item });
  };

  return (
    <div className="onemail-container" onClick={handleclick}>
      <p>{item.from.name.toUpperCase()[0]}</p>
      <div>
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
        <p>{date}</p>
      </div>
    </div>
  );
};

export default OneMailComponent;
