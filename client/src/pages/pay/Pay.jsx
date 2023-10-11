import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./pay.scss";
import makeReq from "../../utils/makeReq";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

// eslint-disable-next-line no-undef
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await makeReq.post(`/orders/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
