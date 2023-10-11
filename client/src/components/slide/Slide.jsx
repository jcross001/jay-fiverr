import { useEffect, useState } from "react";
import "./slide.scss";
import Slider from "infinite-react-carousel";


const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  const [sliderVisible, setSliderVisible] = useState(false);

  useEffect(() => {
    setSliderVisible(true);
  }, []);

  return (
    <div className="slide">
      <div className="container">
        {sliderVisible && (
          <Slider
            slidesToShow={slidesToShow}
            arrowsScroll={arrowsScroll}
          >{children}</Slider>
        )}
      </div>
    </div>
  );
};

export default Slide;