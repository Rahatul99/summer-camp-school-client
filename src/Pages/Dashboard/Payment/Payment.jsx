import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";
import CheckOutForm from "./checkOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const location = useLocation();
  const course = location.state;
  const price = parseFloat(course.price.toFixed(2));

  return (
    <div className="w-full">
      <SectionTitle title="Payment" />
      <Elements stripe={stripePromise}>
        <CheckOutForm price={price} course={course} />
      </Elements>
    </div>
  );
};

export default Payment;
























// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import SectionTitle from "../../../Components/SectionTitle";
// import CheckOutForm from "./checkOutForm";
// import useCart from "../../../Components/Hooks/useCart";


// const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

// const Payment = () => {
//     const [carts] = useCart();
//     const total = carts.reduce(( sum , item) => sum + item.price,0);
//     const price = parseFloat(total.toFixed(2));
//     return (
//         <div className="w-full">
//             <SectionTitle title="Payment" />
//             <Elements stripe={stripePromise}>
//                 <CheckOutForm price = {price} carts={carts} />
//             </Elements>
//         </div>
//     );
// };

// export default Payment;

