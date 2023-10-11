import "./gigs.scss";
import { useEffect, useRef, useState } from "react";
// import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import makeReq from "../../utils/makeReq";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      makeReq
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort((prevSort) => {
      if (prevSort === type) {
        return prevSort; // Avoid unnecessary state update
      }
      return type;
    });
    setOpen(false);
  };

  useEffect(() => {
    return async () => {
      return await refetch();
    };
  }, [sort]);

  const apply = async () => {
    await refetch();
  };
console.log(data);
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR &gt; GRAPHICS & DESIGN &gt;</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr&apos;s AI
          artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder="min" ref={minRef} />
            <input type="text" placeholder="max" ref={maxRef} />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">SortBy</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isPending
            ? "loading"
            : isError
            ? `Something went wrong ${error}`
            : data?.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
