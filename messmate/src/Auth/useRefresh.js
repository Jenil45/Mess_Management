import useAuth from "./useAuth"
import axios from '../Api/axios.js'

const useRefresh = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {

        // refresh backend side
        const response = await axios.get("/auth/refresh" , {
            withCredntials:true
        })
        console.log(response);
        setAuth(prev => {
                return {...prev ,"email":response.data.email , "role":response.data.role, "accessToken":response.data.accessToken}
            });
    }
    return refresh;
}

export default useRefresh;