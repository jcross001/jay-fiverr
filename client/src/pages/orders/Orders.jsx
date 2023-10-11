import { useQuery } from "@tanstack/react-query";
import makeReq from "../../utils/makeReq";
import "./orders.scss";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      makeReq.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = `${sellerId}${buyerId}`;

    try {
      const res = await makeReq.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await makeReq.post("/conversations/", {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      {isPending ? (
        "Loading..."
      ) : isError ? (
        <div>{error}</div>
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="img" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    <img
                      className="message"
                      src="/img/message.png"
                      alt=""
                      onClick={() => handleContact(order)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
