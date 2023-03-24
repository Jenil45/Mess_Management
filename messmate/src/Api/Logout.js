import axios from "./axios.js";
import useAuth from "../Auth/useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/auth/logout', {
                withCredentials: true
            });
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout