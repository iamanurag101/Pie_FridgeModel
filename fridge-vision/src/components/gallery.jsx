import { Image } from "./image";
import React from "react";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>
          Explore our gallery to discover the innovative features and sleek design of our Smart Fridge.
          </p>
        </div>
        <div className="row">
  <div className="portfolio-items" style={{ display: 'flex', flexWrap: 'wrap' }}>
    {props.data
      ? props.data.map((d, i) => (
        <div
          key={`${d.title}-${i}`}
          className="col-sm-6 col-md-4 col-lg-4"
          style={{ flex: '0 0 33.33%', maxWidth: '33.33%' }}
        >
          <Image
            title={d.title}
            largeImage={d.largeImage}
            smallImage={d.smallImage}
          />
        </div>
      ))
      : "Loading..."}
  </div>
</div>

      </div>
    </div>
  );
};
