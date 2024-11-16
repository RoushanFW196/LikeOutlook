import dayjs from "dayjs";
import React, { useContext } from "react";
import "../styles/onemailstyle.css";
import { MailContext } from "../context/mailcontext";
import NameBox from "./NameBox";

const OneMailComponent = ({ item, markFavorite }) => {
  const date = dayjs(item.date).format("DD-MM-YYYY hh:mm a");

  const { setMailDetails, MailDetails } = useContext(MailContext);

  const handleclick = () => {
    setMailDetails({ mailItemDetails: { ...item }, showDetails: true });
  };

  return (
    <div className="onemail-container" onClick={handleclick}>
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
        {markFavorite && (
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
