import "./review.scss";
import { useQuery } from "@tanstack/react-query";
import makeReq from "../../utils/makeReq";

const Review = ({ review }) => {
  const { isPending, data, error } = useQuery({
    queryKey: [review._id],
    queryFn: () =>
      makeReq.get(`/users/${review?.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="review">
      {isPending ? (
        "Loading..."
      ) : error ? (
        `Something went wrong --> ${error}`
      ) : (
        <div className="user">
          <img className="pp" src={data?.img || "/img/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{data?.username}</span>
            <div className="country">
              {/* <img
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              /> */}
              <span>{data?.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review?.star)
          .fill()
          .map((item, i) => (
            <img key={i} src="/img/star.png" alt="" />
          ))}
        <span>{review?.star}</span>
      </div>
      <p>{review?.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
