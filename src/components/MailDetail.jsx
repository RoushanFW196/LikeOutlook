import React, { useContext, useEffect, useState } from "react";
import NameBox from "./NameBox";
import dayjs from "dayjs";
import { MailContext } from "../context/mailcontext";
import { MailStatuscontext } from "../context/mailStatusContext";

const MailDetail = ({ items, id }) => {
  const [maildetails, setMailDetail] = useState({});
  const date = dayjs(items.date).format("DD-MM-YYYY hh:mm a");

  const { setMailDetails } = useContext(MailContext);
  const { mailStatus, setMailStatus } = useContext(MailStatuscontext);
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
      mailItemDetails: { ...items, unread: false },
      showDetails: true,
      markFavorite: true,
    });

    let _favoritemail = [...mailStatus.favorite];
    _favoritemail.push({ ...items, unread: false });
    setMailStatus({ ...mailStatus, favorite: [..._favoritemail] });
  };

  return (
    <div className="w-[70%] h-auto border border-[#CFD2DC] bg-white p-5 mt-[106px] mb-[18px] rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-start gap-4">
          <NameBox name={items.from.name} />
          <div className="mt-[20px]">
            <h4 className="text-lg font-bold tracking-wider text-[#636363] capitalize">
              {items.from.name}
            </h4>
            <p className="text-sm">{date}</p>
          </div>
        </div>

        <button
          onClick={handleMarkFavorite}
          className="bg-[#E54065] px-2 py-1 cursor-pointer text-[white] rounded-lg"
        >
          Mark as favorite
        </button>
      </div>

      <div className="mx-5 my-3 p-3 ">
        <div dangerouslySetInnerHTML={{ __html: maildetails.body }}></div>
      </div>
    </div>
  );
};

export default MailDetail;
