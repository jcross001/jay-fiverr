import "./gig.scss";
import { useEffect, useState } from "react";
import Slider from "infinite-react-carousel";
import makeReq from "../../utils/makeReq";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";

const Gig = () => {
  const [sliderVisible, setSliderVisible] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setSliderVisible(true);
  }, []);

  const { isPending, data, error } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      makeReq.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const {
    isPending: isLoadingUser,
    data: dataUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeReq.get(`/users/${data?.userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!data?.userId,
  });

  console.log(data);
  return (
    <div className="gig">
      {isPending ? (
        "Loading..."
      ) : error ? (
        `Something went wrong --> ${error}`
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadCrumbs">
              FIVERR &gt; GRAPHICS & DESIGN &gt;
            </span>
            <h1>{data?.title}</h1>
            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              `Something went wrong --> ${errorUser}`
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser?.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser?.username}</span>
                {!isNaN(data?.totalStars / data?.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data?.totalStars / data?.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img key={i} src="/img/star.png" alt="" />
                      ))}
                    <span>
                      {Math.round(data?.totalStars / data?.starNumber)}
                    </span>
                  </div>
                )}
              </div>
            )}
            {sliderVisible && (
              <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                {data?.images?.map((img) => (
                  <img key={img} src={img} alt="" />
                ))}
              </Slider>
            )}
            <h2>About This Gig</h2>
            <p>{data?.desc}</p>
            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              `Something went wrong --> ${errorUser}`
            ) : (
              <div className="seller">
                <h2>About the Seller</h2>
                <div className="user">
                  <img src={dataUser?.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser?.username}</span>
                    {!isNaN(data?.totalStars / data?.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data?.totalStars / data?.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img key={i} src="/img/star.png" alt="" />
                          ))}
                        <span>
                          {Math.round(data?.totalStars / data?.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser?.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser?.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data?.shortTitle}</h3>
              <h2>$ {data?.price}</h2>
            </div>
            <p>{data?.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data?.deliveryDate} days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data?.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data?.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
