import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../Components/Hooks/useCart";
import SectionTitle from "../../../Components/SectionTitle";
import CheckOutForm from "./checkOutForm";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const [carts] = useCart();
    const total = carts.reduce(( sum , item) => sum + item.price,0);
    const price = parseFloat(total.toFixed(2));
    return (
        <div className="w-full">
            <SectionTitle title="Payment" />
            <Elements stripe={stripePromise}>
                <CheckOutForm price = {price} cart={carts} />
            </Elements>
        </div>
    );
};

export default Payment;