import "./mygigs.scss";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeReq from "../../utils/makeReq";
import getCurrentUser from "../../utils/getCurrentUser";

const MyGigs = () => {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isPending, data, error } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      makeReq.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });
console.log(data);
  const mutation = useMutation({
    mutationFn: (id) => {
      return makeReq.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("myGigs");
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isPending ? (
        "Loading..."
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((g) => (
                <tr key={g._id}>
                  <td>
                    <img
                      className="img"
                      src={g.cover}
                      alt=""
                    />
                  </td>
                  <td>{g.title}</td>
                  <td>{g.price}</td>
                  <td>{g.sales}</td>
                  <td>
                    <img
                      className="delete"
                      src="/img/delete.png"
                      alt=""
                      onClick={() => handleDelete(g._id)}
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

export default MyGigs;
