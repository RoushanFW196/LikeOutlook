import React, { useContext, useEffect, useState } from "react";
import NameBox from "./NameBox";
import dayjs from "dayjs";
import { MailContext } from "../context/mailcontext";

const MailDetail = ({ items, id }) => {
  const [maildetails, setMailDetail] = useState({});
  const date = dayjs(items.date).format("DD-MM-YYYY hh:mm a");

  const { setMailDetails } = useContext(MailContext);

  useEffect(() => {
    if (id) {
      getMailDetail(id);
    }
  }, [id]);

  const getMailDetail = async (id) => {
    const getdata = await fetch(
      `https://flipkart-email-mock.vercel.app/?id=${id}`
    );
    const getMailData = await getdata.json();
    setMailDetail({ ...getMailData });
  };

  const handleMarkFavorite = () => {
    setMailDetails({
      mailItemDetails: { ...items },
      showDetails: true,
      markFavorite: true,
    });
  };

  return (
    <div
      style={{
        width: "70%",
        height: "auto",
        border: "1px solid #CFD2DC",
        backgroundColor: "#ffffff",
        padding: "20px",
        marginTop: "64px",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "15px",
          }}
        >
          <NameBox name={items.from.name} />
          <div style={{ lineHeight: "0.5" }}>
            <h3>{items.from.name}</h3>
            <p style={{ fontSize: "13px" }}>{date}</p>
          </div>
        </div>

        <button
          onClick={handleMarkFavorite}
          style={{
            backgroundColor: "#E54065",
            padding: "10px 20px",
            color: "white",
            padding: "5px 20px",
            borderRadius: "15px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Mark as favorite
        </button>
      </div>

      <div
        style={{
          margin: "10px 20px",
          padding: "10px",
          backgroundColor: "F2F2F2",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: maildetails.body }}></div>
      </div>
    </div>
  );
};

export default MailDetail;
