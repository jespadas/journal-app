import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_960_720.jpg)",
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">Entrada nueva</p>
        <p className="journal__entry-content">Entrada nueva contenido</p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
