import React from "react";
import { Carousel } from "react-bootstrap";
import OverlayText from "./OverLayText";

const CarouselBanner = ({ bannerImages }) => {
  return (
    <div className="carousel-banner" style={{ position: "relative" }}>
      <Carousel style={{ position: "relative" }}>
        {bannerImages.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-image-wrapper">
              <img
                className="d-block w-100 carousel-image"
                src={image.src}
                alt={`Slide ${index}`}
                style={{ height: "700px" }}
              />
            </div>
            {/* <OverlayText /> */}
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="overlay-text">
        <OverlayText />
      </div>
    </div>
  );
};

export default CarouselBanner;
