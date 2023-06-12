import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckOutForm = ({ price, carts }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        console.log(price);
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error);
            setCardError(error.message)
        }
        else {
            setCardError('')
            // console.log(paymentMethod);
        }


        setProcessing(true)


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError)
            console.log(confirmError);
        }
        console.log('paymentIntent', paymentIntent);

        setProcessing(false)

        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id)
            //save payment information to db
            const payment = {
                email: user?.email, transactionId: paymentIntent.id, price, quantity: carts?.length,
                classesName: carts?.map(item => item.courseName),
                classId: carts?.map(item => item._id),

                date: new Date(),
                status: 'pending',
                instructor: carts?.map(item => item.instructor),
                courseId: carts?.map(item => item.courseId),
                availableSeats: carts?.map(item => parseInt(item.availableSeats) - 1)
            }



            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertResult) {
                        console.log(res.data.insertResult);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Payment success',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
        }
    }

    return (

        <>
            <form className="w-2/3 mx-auto" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-md p-6 bg-white">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                        className="border border-gray-300 p-2 rounded-md mb-4"
                    />
                    <div className="text-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-semibold py-3 px-6 rounded btn btn-wide"
                            type="submit"
                            disabled={!stripe || !clientSecret || processing}
                        >
                            Pay
                        </button>
                    </div>
                </div>
            </form>
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}

            {transactionId && (
                <p className="bg-green-500 p-4 mt-4 text-white">
                    Transaction complete with transactionId: {transactionId}
                </p>
            )}
        </>


    );
};

export default CheckOutForm;