import React, { useEffect, useState } from "react";

const MailDetail = ({ id }) => {
  const [maildetails, setMailDetail] = useState({});

  useEffect(() => {
    if (id) {
      getMailDetail(id);
    }
  }, [id]);

  
  const getMailDetail = async (id) => {
    const getdata = await fetch(
      `https://flipkart-email-mock.vercel.app/?id=${3}`
    );
    const getMailData = await getdata.json();

    setMailDetail({ ...getMailData });
  };

  return (
    <div
      style={{
        width: "70%",
        height: "auto",
        border:'1px solid #CFD2DC',
        backgroundColor: "#ffffff",
        padding: "20px",
        marginTop: "64px",
        borderRadius:"8px"
      }}
    >
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
