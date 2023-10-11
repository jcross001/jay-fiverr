import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import makeReq from "../../utils/makeReq";
import "./message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      makeReq.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data);

  const mutation = useMutation({
    mutationFn: (message) => {
      return makeReq.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value
    });
    e.target[0].value = "";
  }

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">
            MESSAGES
          </Link>{" "}
          {">"} JOHN DOE {">"}
        </span>
        {isPending ? (
          "Loading..."
        ) : isError ? (
          <div>{error}</div>
        ) : (
          <div className="messages">
            {data?.map((m) => (
              <div key={m._id} className={m.userId === currentUser._id ? "item owner" : "item"}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            name=""
            placeholder="Write a message"
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
