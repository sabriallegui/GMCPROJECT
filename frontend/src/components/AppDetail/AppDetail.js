import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Rating from "../Rating/Rating";
import { baseService } from "../../services/index";

import "./AppDetail.css";

const AppDetail = () => {
  const [app, setApp] = useState(null);
  const params = useParams();
  useEffect(() => {
    async function fetchApp() {
      try {
        const res = await baseService.get(`/application?id=${params.id}`);
        setApp(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchApp();
  }, [params.id]);


  if (!app) {
    return <div className="appLoading">
      <div className="loader"></div>
    </div>
  }
  return (
    <div className="appDetail">
      <div className="header">
        <div className="left">
          <img src={app.imgUrl} alt={app.name} />
          <div className="info">
            <div className="name">{app.name}</div>
            <div className="ownerName">{app.ownerName}</div>
            <Rating rating={app.rating} />
          </div>
        </div>
        <div className="right">
          <a className="download" href={app.downloadUrl} download>Download</a>
        </div>
      </div>
      <div className="body">
        <div className="title">Description</div>
        {app.description}
        <div className="title">Comments</div>
        No comments yet
      </div>
    </div >
  );
};

export default AppDetail;
