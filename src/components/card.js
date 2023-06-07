import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./card.module.css";

function Card(props) {
  return (
    <div className={classes.card}>
      <div className={classes.top}>
        <img
          src={`${props.show.show.image?.original}`}
          alt="Couldn't load image"
        ></img>
      </div>
      <div className={classes.middle}>
        <h2>{props.show.show.name}</h2>
        <p><span>Language</span> : {props.show.show.language}</p>
        <div>
        <span>Genre</span> : {props.show.show.genres.join(',')}
        </div>
      </div>
        <Link to={`/show/${props.show.show.id}`} className={classes.bottom}>Deatils</Link>
      
    </div>
  );
}

export default Card;
