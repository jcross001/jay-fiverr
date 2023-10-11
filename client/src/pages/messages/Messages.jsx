import "./messages.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import moment from "moment";
import makeReq from "../../utils/makeReq";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      makeReq.get("/conversations").then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return makeReq.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("conversations");
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isPending ? (
        "Loading..."
      ) : isError ? (
        <div>{error}</div>
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((c) => (
                <tr
                  key={c.id}
                  className={
                    (currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)
                      ? "active"
                      : undefined
                  }
                >
                  <td>{currentUser.isSeller ? c?.buyerId : c?.sellerId}</td>
                  <td>
                    <Link to={`/message/${c?.id}`} className="link">
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c?.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
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

export default Messages;
