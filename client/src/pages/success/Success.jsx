import "./success.scss";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import makeReq from "../../utils/makeReq";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
   const makeRequest = async () => {
    try {
      await makeReq.put("/orders", {payment_intent});
      setTimeout(() => {
        navigate("/orders");
      }, 5000);
    } catch (err) {
      console.log(err);
    }
   };
   makeRequest();
  }, [])

  return (
    <div className="success">
      Payment successful. You are being redirected to the orders page. Please do
      not close this page.
    </div>
  );
};

export default Success;
