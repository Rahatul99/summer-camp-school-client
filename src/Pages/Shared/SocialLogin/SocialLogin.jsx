import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, photoURL: loggedInUser.photoURL }
                fetch('https://summer-camp-school-server-rahatul99.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
    }

    return (
        <div className="flex justify-center">
            <button
                onClick={handleGoogleLogIn}
                className="btn hover:bg-orange-600 border-none translate-x-2 transition duration-500 btn-circle text-center">
                <FaGoogle className="mr-1" />
            </button>
        </div>
    );
};

export default SocialLogin;