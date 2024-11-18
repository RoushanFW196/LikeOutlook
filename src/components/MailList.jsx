import React, { useContext, useEffect, useRef, useState } from "react";
import OneMailComponent from "./OneMailComponent";
import { MailContext } from "../context/mailcontext";
import { MailStatuscontext } from "../context/mailStatusContext";

const MailList = ({ showMailDetail }) => {
  const [allMail, setAllMail] = useState([]);
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("unread");
  const totalMailRef = useRef(0);

  const { MailDetails } = useContext(MailContext);
  const { mailStatus, setMailStatus } = useContext(MailStatuscontext);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await fetch(
          `https://flipkart-email-mock.vercel.app/?page=${page}`
        );
        const data = await response.json();
        const unreadMails = data.list.map((mail) => ({
          ...mail,
          unread: true,
        }));

        setMailStatus((prev) => ({
          ...prev,
          unread: data.list,
        }));

        if (activeFilter === "unread") {
          setAllMail(unreadMails);
        }

        totalMailRef.current = data.total;
      } catch (error) {
        console.error("Error fetching mails:", error);
      }
    };

    fetchMails();
  }, [page, setMailStatus]);

  useEffect(() => {
    if (activeFilter === "unread") {
      setAllMail(mailStatus.unread || []);
    } else if (activeFilter === "read") {
      setAllMail(mailStatus.read || []);
    } else if (activeFilter === "favorite") {
      setAllMail(mailStatus.favorite || []);
    }
  }, [activeFilter, mailStatus]);

  const handleMailStatus = (type) => {
    setActiveFilter(type);
  };

  const handlePagination = (step) => {
    setPage((prevPage) => prevPage + step);
  };

  const startRange = (page - 1) * 10 + 1;
  const endRange = Math.min(totalMailRef.current, page * 10);

  return (
    <div className={showMailDetail ? "w-2/5" : "w-full"}>
      <div className="flex justify-end items-center mr-8 gap-4">
        <span>{`${startRange}-${endRange} of ${totalMailRef.current}`}</span>

        <button
          onClick={() => handlePagination(-1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          onClick={() => handlePagination(1)}
          disabled={page * 10 >= totalMailRef.current}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="p-3">
        <span>Filter By:</span>
        {["unread", "read", "favorite"].map((filter) => (
          <span
            key={filter}
            onClick={() => handleMailStatus(filter)}
            className={`mx-[10px] cursor-pointer ${
              activeFilter === filter ? "activemailstatus" : ""
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </span>
        ))}
      </div>

      {allMail.map((mail) => (
        <OneMailComponent
          key={mail.id}
          item={mail}
          mailType={activeFilter}
          allFavorite={activeFilter === "favorite" && allMail.length > 0}
          markFavorite={
            MailDetails.mailItemDetails.id === mail.id &&
            MailDetails.markFavorite
          }
        />
      ))}
    </div>
  );
};

export default MailList;
