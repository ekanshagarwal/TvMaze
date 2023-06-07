import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./detail.module.css";

const ShowDetailsScreen = () => {
  const { id } = useParams();
  const [show, setShow] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [Name, setName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        console.log(data);
        setShow(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const HTMLStringExtractor = (htmlString) => {
    // Create a temporary element
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;

    // Extract the text content
    const extractedText = tempElement.textContent || tempElement.innerText;

    return <div className={classes.summary}>{extractedText}</div>;
  };

  const handleBooking = () => {
    setIsFormVisible(true);
  };
  const cancelBooking = () => {
    setIsFormVisible(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = localStorage.getItem("myshows");
    let result = JSON.parse(data);
    console.log(result);
    if (result) {
      localStorage.setItem(
        "myshows",
        JSON.stringify([
          ...result,
          {
            show: show.name,
            personalDetail: { name: Name, phoneNumber: PhoneNumber },
          },
        ])
      );
    } else {
      localStorage.setItem(
        "myshows",
        JSON.stringify([
          {
            show: show.name,
            personalDetail: { name: Name, phoneNumber: PhoneNumber },
          },
        ])
      );
    }

    setIsFormVisible(false);
    setName("");
    setPhoneNumber("");
  };

  return (
    <>
      {!isFormVisible && (
        <div className={classes.details}>
          <div className={classes.left}>
            <img src={show.image?.medium} alt="Couldn't load image"></img>
          </div>
          <div className={classes.right}>
            <h1>{show.name}</h1>
            <h5>{show.language}</h5>
            {HTMLStringExtractor(show.summary)}
            <div>
              <span>Genre</span> : {show.genres?.join(",")}
            </div>
            <button className={classes.btn} onClick={handleBooking}>
              Book Ticket
            </button>
          </div>
        </div>
      )}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className={classes.form}>
          <h1 style={{ textAlign: "center" }}>{show.name}</h1>
          <label htmlFor="personalDetails">Personal Details</label>
          <div className={classes.formcontrol}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className={classes.formcontrol}>
            <label htmlFor="pno">Phone Number</label>
            <input
              type="number"
              name="pno"
              id="pno"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>
          </div>
          <div className={classes.button}>
            <button className={classes.btn} type="submit">
              Book Now
            </button>
            <button className={classes.btn} onClick={cancelBooking}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ShowDetailsScreen;
