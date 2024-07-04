import React from "react";
import CarouselBanner from "./CarouselBanner";
import Dishes from "./Diches";
import { getBannerImages } from "./BannerImages";
import img1 from "../image/caroseul/IMG-20240615-WA0007.jpg";
import img2 from "../image/caroseul/IMG-20240615-WA0016.jpg";
import img3 from "../image/caroseul/IMG-20240615-WA0017.jpg";
import img4 from "../image/caroseul/IMG-20240615-WA0020.jpg";

const DishesWithCarousel = ({ handleAddToCart }) => {
  // Generate the banner images array
  const bannerImages = getBannerImages(img1, img2, img3, img4);

  return (
    <>
      <CarouselBanner bannerImages={bannerImages} />
      <Dishes handleAddToCart={handleAddToCart} />
    </>
  );
};

export default DishesWithCarousel;
