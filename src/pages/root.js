import { Outlet } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import classes from "./root.module.css";
function RootLayout() {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );
        const data = await response.json();
        console.log(data);
        setShows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className={classes.container}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a TV show name"
      />
      {shows.length > 0 ? 
      <div className={classes.wrapper}>
        <ul>
          {shows.map((show) => (
            <li key={show.show.id}>
              {/* <Link to={`/show/${show.show.id}`}>{show.show.name}</Link> */}
              <Card show={show}></Card>
            </li>
          ))}
        </ul>
      </div> : <h1 style={{color:'white'}}>Nothing to display</h1>}
    </div>
  );
}

export default RootLayout;
