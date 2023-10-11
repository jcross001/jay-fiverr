import "./gigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import makeReq from "../../utils/makeReq";

const GigCard = ({ item }) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["gigUser"],
    queryFn: () =>
      makeReq.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isPending ? (
            "loading"
          ) : isError ? (
            `Something went wrong --> ${error}`
          ) : (
            <div className="user">
              <img src={data?.img || "/img/noavatar.jpg"} alt="" />
              <span>{data?.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
